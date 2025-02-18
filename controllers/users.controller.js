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
export async function register(req, res) {
  try {
    
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

//Verifying arrived otp
export async function verifyOtp(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Login
export async function login(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

//refreshToken
export async function refreshToken(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Get All Users
export async function getAll(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Get one User
export async function getOne(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Update users
export async function update(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

// Delete Users
export async function remove(req, res) {
  try {
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
