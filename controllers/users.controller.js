import User from "../models/users.model.js";
import {
  usersValidation,
  usersValidationUpdate,
} from "../validations/users.validation.js";
import nodemailer from "nodemailer";
import { totp } from "otplib";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Op, where } from "sequelize";

//Registering
async function register(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

//Verifying arrived otp
async function verifyOtp(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Login
async function login(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

//refreshToken
async function refreshToken(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Get All Users
async function getAll(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Get one User
async function getOne(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Update users
async function update(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Delete Users
async function remove(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export {
  register,
  verifyOtp,
  login,
  refreshToken,
  getAll,
  getOne,
  update,
  remove,
};