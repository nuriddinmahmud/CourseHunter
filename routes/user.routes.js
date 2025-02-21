import express from "express";
import {
  register,
  verifyOtp,
  login,
  findAll,
  update,
  remove,
 promoteToAdmin,
 findOne,
  myEducationalCentres,
} from "../controllers/users.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";
import selfPolice from "../middleware/selfPolice.js";

const UserRouter = express.Router();


/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: "User registration"
 *     tags: [Users]
 *     description: "Registers a new user and sends OTP"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               phone:
 *                 type: string
 *                 example: "998901234567"
 *               password:
 *                 type: string
 *                 example: "StrongPass123"
 *               role:
 *                 type: string
 *                 enum: ["admin", "user", "ceo"]
 *                 example: "user"
 *               avatar:
 *                 type: string
 *                 example: "avatar.jpg"
 *     responses:
 *       200:
 *         description: "User registered successfully"
 *       422:
 *         description: "Validation error"
 *       405:
 *         description: "User already exists"
 */
UserRouter.post("/register", register);

/**
 * @swagger
 * /users/verify-otp:
 *   post:
 *     summary: "Verify OTP"
 *     tags: [Users]
 *     description: "Verifies OTP for user activation"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: "OTP verified successfully"
 *       403:
 *         description: "Invalid OTP"
 */
UserRouter.post("/verify-otp", verifyOtp);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: "User login"
 *     tags: [Users]
 *     description: "Logs in a user and returns an access token"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "StrongPass123"
 *     responses:
 *       200:
 *         description: "User logged in successfully"
 *       422:
 *         description: "Invalid email or password"
 */
UserRouter.post("/login", login);

/**
 * @swagger
 * /users/promoteToAdmin/{id}:
 *   patch:
 *     summary: "Promote user to admin"
 *     tags: [Users]
 *     description: "Admin can promote a user to admin role"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "User ID"
 *         schema:
 *           type: string
 *           example: "123"
 *     responses:
 *       200:
 *         description: "User promoted to admin"
 *       403:
 *         description: "Unauthorized access"
 */
UserRouter.patch("/promoteToAdmin/:id", verifyToken, selfPolice(["admin"]), promoteToAdmin);

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: "Get all users"
 *     tags: [Users]
 *     description: "Retrieves all users (Only for admin)"
 *     responses:
 *       200:
 *         description: "Users retrieved successfully"
 *       403:
 *         description: "Unauthorized access"
 */
UserRouter.get("/", verifyToken, checkRole(["admin", "user"]), findAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: "Get user by ID"
 *     tags: [Users]
 *     description: "Retrieves a user by their ID"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "User ID"
 *         schema:
 *           type: string
 *           example: "123"
 *     responses:
 *       200:
 *         description: "User retrieved successfully"
 *       404:
 *         description: "User not found"
 */
UserRouter.get("/:id", verifyToken, checkRole(["admin", "user"]), findOne);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: "Update user"
 *     tags: [Users]
 *     description: "Updates user data (Admin only)"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "User ID"
 *         schema:
 *           type: string
 *           example: "123"
 *     responses:
 *       200:
 *         description: "User updated successfully"
 *       404:
 *         description: "User not found"
 */
UserRouter.patch("/:id", verifyToken, selfPolice(["admin"]), update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: "Delete user"
 *     tags: [Users]
 *     description: "Deletes a user by ID (Admin only)"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "User ID"
 *         schema:
 *           type: string
 *           example: "123"
 *     responses:
 *       200:
 *         description: "User deleted successfully"
 *       404:
 *         description: "User not found"
 */
UserRouter.delete("/:id", verifyToken, selfPolice(["admin"]), remove);

export default UserRouter;
