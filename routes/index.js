import { Router } from "express";
import educationalCenterRouter from "./educationalCenter.routes.js";
import ResourceCategoryRouter from "./resourceCategory.routes.js";
import commentRouter from "./comments.routes.js";
import BranchRouter from "./branches.routes.js";
import regionRouter from "./region.routes.js";
import likesRouter from "./likes.routes.js";
import FieldRouter from "./field.routes.js";
import UserRouter from "./user.routes.js";
import courseRoute from "./courses.routes.js";
import receptionRoute from "./reception.routes.js";
import resourceRoute from "./resource.routes.js";
import CollabFieldRoute from "./collabField.routes.js";
import uploadImageRoute from "./upload-image.routes.js";

const mainRouter = Router();

mainRouter.use("/educationalCenter", educationalCenterRouter);
mainRouter.use("/resourceCategory", ResourceCategoryRouter);
mainRouter.use("/comments", commentRouter);
mainRouter.use("/regions", regionRouter);
mainRouter.use("/branches", BranchRouter);
mainRouter.use("/field", FieldRouter);
mainRouter.use("/likes", likesRouter);
mainRouter.use("/users", UserRouter);
mainRouter.use("/courses", courseRoute);
mainRouter.use("/receptions", receptionRoute);
mainRouter.use("/resources", resourceRoute);
mainRouter.use("/collabFields", CollabFieldRoute);
mainRouter.use("/upload-image", uploadImageRoute);

export default mainRouter;
