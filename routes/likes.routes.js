import { Router } from "express";
import { create, getAll, getBySearch, getOne, getPaginatedLikes, remove, sortLikesCount } from "../controllers/likes.controller.js";

const likesRouter = Router()

likesRouter.get("/getSearch", getBySearch)
likesRouter.get("/with-pagination", getPaginatedLikes)
likesRouter.get("/sortLikesCount", sortLikesCount)
likesRouter.get("/", getAll)
likesRouter.get("/:id", getOne)
likesRouter.post("/", create)
likesRouter.delete("/:id", remove)

export default likesRouter;
