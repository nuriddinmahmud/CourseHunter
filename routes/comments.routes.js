import { Router } from "express";
import { create, getAll, getBySearch, getOne, getPaginatedComments, remove, sortByCreatedDate, sortByStar, update } from "../controllers/comment.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import selfPolice from "../middleware/selfPolice.js";

const commentRouter = Router()

commentRouter.get("/with-pagination", getPaginatedComments)
commentRouter.get("/sortByStar", sortByStar)
commentRouter.get("/sortByCreatedDate", sortByCreatedDate)
commentRouter.get("/", getAll)
commentRouter.get("/:id", getOne)
commentRouter.get("/getSearch", getBySearch)
commentRouter.post("/", verifyToken, selfPolice(["user"]), create)
commentRouter.patch("/:id", verifyToken, selfPolice(["user"]), update)
commentRouter.delete("/:id", verifyToken, selfPolice(["user"]), remove)

export default commentRouter;
