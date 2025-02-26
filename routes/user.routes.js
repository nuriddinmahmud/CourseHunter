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
  myInfo
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
 *                 enum: ["Admin", "User", "Ceo"]
 *                 example: "User"
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
UserRouter.patch("/promoteToAdmin/:id", verifyToken, selfPolice(["Admin"]), promoteToAdmin);

/**
 * @swagger
 * /users/myEducationalCentres:
 *   get:
 *     summary: "Get CEO's Educational Centres"
 *     tags: [Users]
 *     description: "Retrieves all educational centres created by the logged-in CEO"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Educational centres retrieved successfully"
 *       403:
 *         description: "Unauthorized user type"
 *       400:
 *         description: "Error while retrieving data"
 */
UserRouter.get("/myCentres", verifyToken, myEducationalCentres);

/**
 * @swagger
 * /users/myInfo:
 *   get:
 *     summary: "Get logged-in user info"
 *     tags: [Users]
 *     description: "Retrieves the information of the currently logged-in user"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "User information retrieved successfully"
 *       400:
 *         description: "Unauthorized user type"
 *       404:
 *         description: "User not found"
 */
UserRouter.get("/myInfo", verifyToken, myInfo);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: "Get all users"
 *     tags: [Users]
 *     description: "Retrieves all users (Only for admin)"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "Users retrieved successfully"
 *       403:
 *         description: "Unauthorized access"
 */
UserRouter.get("/", verifyToken, checkRole(["Admin", "Ceo", "User"]), findAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: "Get user by ID"
 *     tags: [Users]
 *     description: "Retrieves a user by their ID"
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         schema:
 *           type: number
 *           example: "123"
 *     responses:
 *       200:
 *         description: "User retrieved successfully"
 *       404:
 *         description: "User not found"
 */
UserRouter.get("/:id", verifyToken, checkRole(["Admin", "User", "Ceo"]), findOne);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: "Update user information"
 *     tags: [Users]
 *     description: "Updates user data (Admin only)"
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of the user to update"
 *         required: true
 *         schema:
 *           type: string
 *           example: "123"
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
 *                 format: email
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               password:
 *                 type: string
 *                 example: "new_secure_password"
 *               role:
 *                 type: string
 *                 enum: ["User", "Admin"]
 *                 example: "User"
 *               avatar:
 *                 type: string
 *                 example: "https://example.com/avatar.jpg"
 *               status:
 *                 type: string
 *                 enum: ["active", "inactive"]
 *                 example: "active"
 *     responses:
 *       200:
 *         description: "User updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *                     role:
 *                       type: string
 *                       example: "User"
 *                     avatar:
 *                       type: string
 *                       example: "https://example.com/avatar.jpg"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: "Bad request"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error_message:
 *                   type: string
 *                   example: "Invalid request data"
 *       404:
 *         description: "User not found"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found ❗️"
 *       422:
 *         description: "Validation error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error message"
 */
UserRouter.patch("/:id", verifyToken, selfPolice(["Admin"]), update);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: "Delete user"
 *     tags: [Users]
 *     description: "Deletes a user by ID (Admin only)"
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         schema:
 *           type: string
 *           example: "123"
 *     responses:
 *       200:
 *         description: "User deleted successfully"
 *       404:
 *         description: "User not found"
 */
UserRouter.delete("/:id", verifyToken, selfPolice(["Admin"]), remove);

export default UserRouter;
