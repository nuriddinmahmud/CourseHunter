import express from "express";
import {
  register,
  verifyOtp,
  login,
  findAll,
  update,
  remove,
  findOne,
  refreshToken,
} from "../controllers/users.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const UserRouter = express.Router();

UserRouter.post("/register", register);
UserRouter.post("/verify-otp", verifyOtp);
UserRouter.post("/login", login);
UserRouter.get('/refresh-token', verifyToken, refreshToken);
UserRouter.get("/", verifyToken, checkRole(["admin", "user", "ceo"]), findAll);
UserRouter.get("/:id", verifyToken, checkRole(["admin"]), findOne);
UserRouter.patch("/:id", verifyToken, checkRole(["admin"]), update);
UserRouter.delete("/:id", verifyToken, checkRole(["admin"]), remove);

export default UserRouter;
