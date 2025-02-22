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
import path from 'path';
import EducationalCentre from "../models/educationalCenter.model.js";

dotenv.config();
const TOTP_KEY = process.env.SECRET_KEY;

function FormatphoneNumber(phone) {
  try {
      if(!/^\d{12}$/.test(phone)) {
          throw new Error("Phone number is wrong ❗");
      }
      let raqamdavlatqodi = phone.slice(0, 3);
      let asosiyqismi = phone.slice(3, 5);
      let birinchiqismi = phone.slice(5, 8);
      let ikkinchiqismi = phone.slice(8, 10);
      let oxirgiqismi = phone.slice(10, 12);

      return `+${raqamdavlatqodi} (${asosiyqismi}) ${birinchiqismi}-${ikkinchiqismi}-${oxirgiqismi}`;

  } catch(e) {
      console.log(e.message);
  }
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

totp.options = { step: 1800, digits: 6 };


const deleteOldImage = (imgPath) => { 
  if (imgPath) { 
    const fullPath = path.join("uploads", imgPath); 
    if (fs.existsSync(fullPath)) { 
      fs.unlinkSync(fullPath); 
    } 
  } 
};


async function register(req, res) {
  try {
    const body = req.body;

    let formattedPhoneNumber = FormatphoneNumber(body.phone);
    if(!formattedPhoneNumber) {
      return res.status(422).send({message: "Wrong phone number, You should enter the phone number in this view: 998507525150"}); 
    }

    body.phone = formattedPhoneNumber;

    let findUser = await Users.findOne({where: { email: body.email }});
    if(findUser) {
      return res.status(405).send({message: "This account already exists ❗"});
    }

    const { error, value } = usersValidation(body);
    if (error) {
      return res.status(422).send({ message: error.details[0].message });
    }

    value.password = await bcrypt.hash(body.password, 10);
    const registered = await Users.create(value);

    let otp = totp.generate(`${TOTP_KEY}${body.email}`);
    await transporter.sendMail({
      to: body.email,
      subject: "One-time password",
      html: `This is an OTP to activate your account: <h1>${otp}</h1>`,
    });

    res.status(200).send({message: "Registered successfully ✅. We sent OTP to your email for activation", data: registered});
  } catch (error) {
    res.status(400).send({ error_message: error.message});
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

    if (findUser.status === "Inactive") {
      await Users.update({ status: "Active" }, { where: { email } });
    }

    res
      .status(200)
      .send({ message: "Your account has been activated successfully" });
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}


async function login(req, res) {
  try {
    const { email, password } = req.body;
    let user = await Users.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(422).send({ message: "Invalid email or password ❗" });
    }

    if (user.status === "Inactive") {
      return res.status(403).send({ message: "Account not activated, You should activate your account ❗" });
    }

    let accessToken = await accessTokenGenereate({ id: user.id, email: user.email, role: user.role });
    res.status(200).send({ message: "Logged in successfully", access_token: accessToken });
  } catch (error) {
    res.status(400).send({ error_message: error.message });
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


async function promoteToAdmin(req, res) {
  try {
      const role = "Admin"
      let { id } = req.params;
      await Users.update({ role }, { where: { id } })
      res.status(200).send({ message: "Updated successfully" })
  } catch (error) {
      res.status(400).send({error_message: error.message});
  }
}


async function myInfo(req, res) {
  try {
    let { role } = req.user;
    if (!Array.isArray(role)) {
      role = [role]; 
    }

    let foundRole = role.find(r => ["Admin", "Ceo", "User"].includes(r));
    if(!foundRole) {
      return res.status(400).send({message: 'Unauthorization user type ❗'});
    }

    const user = await Users.findOne({where: {role: {[Op.in]: [foundRole]}}, attributes: ["id", "firstName", "lastName", "email", "role", "avatar", "status", "createdAt", "updatedAt"]});
    if(!user) {
      return res.status(404).send({message: "User not found ❗"});
    }

    res.status(200).send({data: user});
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}


async function findAll(req, res) {
  try {
    let { role } = req.user;

    if (!Array.isArray(role)) {
      role = [role]; 
    }

    if(role.includes("Admin")) {
      let findAllUsers = await Users.findAll({
        attributes: ["id", "firstName", "lastName", "email", "role", "avatar", "status", "createdAt", "updatedAt"]
      });
      return res.status(200).send({data: findAllUsers});
    }

    let foundRole = role.filter(r => ["Ceo", "User"].includes(r));
    if(!foundRole) {
      return res.status(403).send({message: " Unauthorization user type ❗"});
    }

    let findAllUsers = await Users.findAll({where: {role: {[Op.in]: [foundRole]}}, attributes: ["id", "firstName", "lastName", "email", "role", "avatar", "status", "createdAt", "updatedAt"]});
    if(!findAllUsers.length) {
      return res.status(200).send({message: "Users are empty"});
    }

    res.status(200).send({ data: findAllUsers });
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}


async function findOne(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.user;

    if (!Array.isArray(role)) {
      role = [role]; 
    }

    let foundRole = role.find(r => ["Admin", "User", "Ceo"].includes(r));
    if(!foundRole) {
      return res.status(403).send({ message: "Unauthorized user type ❗" });
    }

    let findOneUser = await Users.findOne(id, {where: {role: {[Op.in]: [foundRole]}}, attributes: ["id", "firstName", "lastName", "email", "role", "avatar", "status", "createdAt", "updatedAt"]});
    if(!findOneUser) {
      return res.status(404).send({message: "User not found ❗"});
    }

    res.status(200).send({ data: findOneUser });
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}


async function update(req, res) {
  try {
    let { id } = req.params;
    const { error, value } = usersValidationUpdate(req.body);
    if (error) {
      return res.status(422).send({ message: error.details[0].message });
    }

    if (value.password) {
      value.password = await bcrypt.hash(value.password, 10);
    }

    const updatedUser = await Users.update(value, {where: {id}});
    if (!updatedUser.length) {
      res.status(404).send({ message: "User not found ❗️" });
      return;
    }

    let result = await Users.findByPk(id, {attributes: ["id", "firstName", "lastName", "email", "phone", "role", "avatar", "status"]});
    res.status(200).send({message: "User updated successfully", data: result});
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}


async function remove(req, res) {
  try {
    let { id } = req.params;
    let find = await Users.findByPk(id);

    if(find.avatar) {
      deleteOldImage(find.avatar);
    }

    let deletedUser = await Users.destroy({ where: { id, role: {[Op.in]: ["ceo", "user"]}}});

    if (!deletedUser) {
      return res.status(404).send({ message: " User not found ❗" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}


async function myEducationalCentres(req, res) {
  try {
    let { role, id } = req.user;
    if(!role.includes("Ceo")) {
      return res.status(403).send({message: "Unauthorization User type ❗"});
    }

    const allCentres = await EducationalCentre.findAll({where: {userID: id}, attributes: ["id", "name", "image", "address", "userID", "regionID", "phone"]});
    if(!allCentres.length) {
      return res.status(200).send({message: "You have not created any Educational Centres yet"});
    }
    res.status(200).send({data: allCentres});
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
}

export { register, verifyOtp, login, myInfo, findOne, findAll, update, remove, promoteToAdmin, myEducationalCentres };
