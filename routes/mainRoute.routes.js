import { Router } from "express";
import regionRouter from "./region.routes.js";
import likesRouter from "./likes.routes.js";
import commentRouter from "./comments.routes.js";
import educationalCenterRouter from "./educationalCenter.routes.js";
import FieldRouter from "./field.routes.js";
import ResourceCategoryRouter from "./resourceCategory.routes.js";
import BranchRouter from "./branches.routes.js";
import courseRoute from "./courses.routes.js";
import resourceRoute from "./resource.routes.js";
import CollabFieldRoute from "./collabField.routes.js";
import receptionRoute from "./reception.routes.js";
import UserRouter from "./user.routes.js";

const mainRouter = Router();

mainRouter.use("/regions", regionRouter);
mainRouter.use("/likes", likesRouter);
mainRouter.use("/comments", commentRouter);
mainRouter.use("/educationalCenter", educationalCenterRouter);
mainRouter.use("/field", FieldRouter);
mainRouter.use("/category", ResourceCategoryRouter);
mainRouter.use("/branch", BranchRouter);
mainRouter.use("/collab", CollabFieldRoute);
mainRouter.use("/courses", courseRoute);
mainRouter.use("/resources", resourceRoute);
mainRouter.use("/receptions", receptionRoute);
mainRouter.use("/users", UserRouter);

export default mainRouter;
