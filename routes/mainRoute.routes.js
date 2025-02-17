import { Router } from "express";
import regionRouter from "./region.routes.js";
import likesRouter from "./likes.routes.js";
import commentRouter from "./comments.routes.js";
import educationalCenterRouter from "./educationalCenter.routes.js";

const mainRouter = Router()

mainRouter.use("/regions", regionRouter)
mainRouter.use("/likes", likesRouter)
mainRouter.use("/comments", commentRouter)
mainRouter.use("/educationalCenter", educationalCenterRouter)

export default mainRouter;
