import Users from "../models/users.model.js";
import {
  usersValidation,
  usersValidationUpdate,
} from "../validations/users.validation.js";
import nodemailer from "nodemailer";
import { totp } from "otplib";
import bcrypt from "bcrypt";
import fs from "fs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import EducationalCentre from "../models/educationalCenter.model.js";
import path from 'path';
import { fileURLToPath } from "url";

dotenv.config();
const TOTP_KEY = process.env.SECRET_KEY;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

totp.options = { step: 1800, digits: 6 };

async function register(req, res) {
  try {
    const body = req.body;
    let findUser = await Users.findOne({where: { email: body.email }});
    if(findUser) {
      return res.status(405).send({message: 'This account already exists ❗'});
    }

    const { error, value } = usersValidation(body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    value.password = await bcrypt.hash(body.password, 10);
    const registered = await Users.create(value);

    let otp = totp.generate(`${TOTP_KEY}${body.email}`);
    await transporter.sendMail({
      to: body.email,
      subject: "One-time password",
      html: `This is an OTP to activate your account: <h1>${otp}</h1>`,
    });

    res.status(200).send({message: "Registered successfully ✅. We sent OTP to your email for activation.", data: registered});
  } catch (error) {
    res.status(500).send({ error_message: error.message });
  }
}

async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;
    const findUser = await Users.findOne({ where: { email } });
    if (!findUser) {
      return res.status(405).send({ message: "Email is incorrect ❗" });
    }

    let checkOtp = totp.verify({ token: otp, secret: `${TOTP_KEY}${email}` });
    if (!checkOtp) {
      return res.status(403).send({ message: "OTP is incorrect ❗" });
    }

    if (findUser.status === "inactive") {
      await Users.update({ status: "active" }, { where: { email } });
    }

    res
      .status(200)
      .send({ message: "Your account has been activated successfully" });
  } catch (error) {
    res.status(500).send({ error_message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    let user = await Users.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(404).send({ message: "Invalid email or password ❗" });
    }

    if (user.status === "inactive") {
      return res.status(403).send({ message: "Account not activated ❗" });
    }

    let accessToken = await accessTokenGenereate({ id: user.id, email: user.email, role: user.role });
    res.status(200).send({ message: "Logged in successfully", access_token: accessToken });
  } catch (error) {
    res.status(500).send({ error_message: error.message });
  }
}

async function accessTokenGenereate(payload) {
  try {
    let accessSecret = process.env.ACCESS_KEY || "accessKey";
    return jwt.sign(payload, accessSecret);
  } catch (error) {
    console.log(error.message);
  }
}

async function findAll(req, res) {
  try {
    console.log(1);

    let { role } = req.user;
    let findAllUsers = [];

    if (role === "admin") {
      findAllUsers = await Users.findAll({where: { role: { [Op.in]: ["user", "ceo"] }}, attributes: ["id", "firstName", "lastName", "email", "password", "phone", "role", "avatar", "status"] });
    }

    else if(role === "user") { 
      findAllUsers = await Users.findOne({where: { role: {[Op.in]: ["user"]}}, attributes: ["id", "firstName", "lastName", "email", "password", "phone", "role", "avatar", "status"] });
    }

    else if (role === "ceo") {
      const educationalCentre = await EducationalCentre.findOne({
        where: { userID: req.user.id }
      });

      if (!educationalCentre) {
        return res.status(404).send({ message: 'Educational Centre not found ❗' });
      }

      findAllUsers = await Users.findAll({where: { role: { [Op.in]: ["user"] }, educationalCentreID: educationalCentre.id}, include: [{model: EducationalCentre, attributes: ["id", "name", "image", "address", "userID", "regionID", "phone"]}]});
    }
    else {
      return res.status(403).send({message: 'Unauthorization user type ❗'});
    }

    res.status(200).send({ data: findAllUsers });
  } catch (error) {
    res.status(500).send({ error_message: error.message });
  }
}

async function findOne(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.user;

    let user = [];

    if (role === "admin") {
      user = await Users.findOne({ where: { id, role: {[Op.in]: ["ceo", "user"]}}, attributes: ["id", "firstName", "lastName", "email", "password", "phone", "role", "avatar", "status"] });
      if (!user) {
        return res.status(404).send({ message: "User or Ceo not found ❗"});
      }
    }
    
    else if (role === "user") {
      user = await Users.findOne({ where: { id, role: {[Op.in]: ["user"]}}, attributes: ["id", "firstName", "lastName", "email", "password", "phone", "role", "avatar", "status"] });
      if (!user) {
        return res.status(404).send({ message: "User not found ❗" });
      }
    }

    else if(role === "ceo") {
      let educationalCentre = await EducationalCentre.findOne({where: {userID: req.user.id}});
      if(!educationalCentre) {
        return res.status(404).send({message: 'Educational Centre not found ❗'});
      }
      user = await Users.findOne({where: {id, role: {[Op.in]: ["user"]}}, educationalCentreID: educationalCentre.id });
    }

    else {
      return res.status(403).send({ message: "Unauthorized user type ❗" });
    }

    res.status(200).send({ data: user });
  } catch (error) {
    res.status(500).send({ error_message: error.message });
  }
}

async function update(req, res) {
  try {
    let { id } = req.params;
    let body = req.body;
    const { error, value } = usersValidationUpdate(body);
    if (error) {
      if (body.avatar) {
        fs.unlink(body.avatar.path, (e) => {
          console.log(e ? e.message : "image deleted");
        });
      }
      return res.status(400).send({ message: error.details[0].message });
    }

    if (value.password) {
      value.password = await bcrypt.hash(value.password, 10);
    }

    let updatedUser = await Users.update(value, {
      where: { id },
      returning: true,
    });
    if (!updatedUser.length) {
      return res.status(400).send({ message: "User not found ❗️" });
    }

    let result = await Users.findByPk(id, {attributes: ["id", "firstName", "lastName", "email", "password", "phone", "role", "avatar", "status"]});
    res.status(200).send({data: result});
  } catch (error) {
    res.status(500).send({ error_message: error.message });
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function remove(req, res) {
  try {
    let { id } = req.params;
    let find = await Users.findByPk(id);

    let imagePath = path.join(__dirname, '../uploads', find.avatar);
    let deletedUser = await Users.destroy({ where: { id, role: {[Op.in]: ["ceo", "user"]}}});

    fs.unlink(imagePath, (e) => {
      console.log(e ? e.message : 'image deleted');
    });

    if (!deletedUser) {
      return res.status(404).send({ message: " User not found ❗" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ error_message: error.message });
  }
}

export { register, verifyOtp, login, findOne, findAll, update, remove };
