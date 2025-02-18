import express from "express";
import {
  register,
  verifyOtp,
  login,
  refreshToken,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/users.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import verifyToken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const UserRouter = express.Router();

// UserRouter.post("/register", upload.single("avatar"), register);
// UserRouter.post("/verify-otp", verifyOtp);
// UserRouter.post("/login", login);
// UserRouter.get("/refresh-token", refreshToken);
// UserRouter.get("/", verifyToken, checkRole(["admin"]), getAll);
// UserRouter.get("/:id", verifyToken, checkRole(["teacher"]), getOne);
// UserRouter.patch("/:id", verifyToken, checkRole(["teacher"]), upload.single("avatar"), update);
// UserRouter.delete("/:id", verifyToken, checkRole(["admin"]), remove);

export default UserRouter;