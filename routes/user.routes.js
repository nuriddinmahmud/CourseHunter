import express from "express";
import {
  register,
  verifyOtp,
  login,
  findAll,
  update,
  remove,
  findOne,
} from "../controllers/users.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";
import selfPolice from '../middleware/selfPolice.js';
const UserRouter = express.Router();

UserRouter.post("/register", register);
UserRouter.post("/verify-otp", verifyOtp);
UserRouter.post("/login", login);
UserRouter.get("/", verifyToken, checkRole(["admin", "ceo", "user"]), findAll);
UserRouter.get("/:id", verifyToken, checkRole(["admin", "ceo", "user"]), findOne);
UserRouter.patch("/:id", verifyToken, selfPolice(["admin"]), update);
UserRouter.delete("/:id", verifyToken, selfPolice(["admin"]), remove);

export default UserRouter;
