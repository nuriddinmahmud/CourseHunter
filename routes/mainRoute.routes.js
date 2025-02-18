import { Router } from "express";
import educationalCenterRouter from "./educationalCenter.routes.js";
import ResourceCategoryRouter from  "./resourceCategory.routes.js";
import commentRouter from           "./comments.routes.js";
import BranchRouter from            "./branches.routes.js";
import regionRouter from            "./region.routes.js";
import likesRouter from             "./likes.routes.js";
import FieldRouter from             "./field.routes.js";
import UserRouter from              "./user.routes.js";

const mainRouter = Router();

mainRouter.use("/educationalCenter", educationalCenterRouter)
mainRouter.use("/category", ResourceCategoryRouter)
mainRouter.use("/comments", commentRouter)
mainRouter.use("/regions", regionRouter)
mainRouter.use("/branch", BranchRouter)
mainRouter.use("/field", FieldRouter )
mainRouter.use("/likes", likesRouter)
mainRouter.use("/users", UserRouter)

export default mainRouter;
