import { Router } from "express";
import { register,verifyOtp,login, refreshToken, getAll,getOne,update,remove } from "../controllers/users.controller.js";

const UserRouter = Router()

UserRouter.get("/register" , upload.single('avatar'), register )
UserRouter.get("/verify-otp", verifyOtp )
UserRouter.get("/login", login )
UserRouter.get("/refresh-token", refreshToken )
UserRouter.get("/", verifyToken, checkRole(['admin']),getAll)
UserRouter.get("/:id",verifyToken, checkRole(['teacher']), getOne)
UserRouter.patch("/:id", verifyToken, checkRole(['teacher']), upload.single('avatar'),update)
UserRouter.delete("/:id",verifyToken, checkRole(['admin']), remove)

export default UserRouter;