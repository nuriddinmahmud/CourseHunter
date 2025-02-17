import { Router } from "express";
import regionRouter from "./region.routes.js";
import likesRouter from "./likes.routes.js";
import commentRouter from "./comments.routes.js";
import educationalCenterRouter from "./educationalCenter.routes.js";
import FieldRouter from "./field.routes.js";
import ResourceCategoryRouter from "./resourceCategory.routes.js";
import BranchRouter from "./branches.routes.js";


const mainRouter = Router()

mainRouter.use("/regions", regionRouter)
mainRouter.use("/likes", likesRouter)
mainRouter.use("/comments", commentRouter)
mainRouter.use("/educationalCenter", educationalCenterRouter)
mainRouter.use("/field", FieldRouter )
mainRouter.use("/category", ResourceCategoryRouter)
mainRouter.use("/branch", BranchRouter)

export default mainRouter;
