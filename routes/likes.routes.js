import { Router } from "express";
import { create, getAll, getBySearch, getOne, getPaginatedLikes, remove, sortLikesCount } from "../controllers/likes.controller.js";

const likesRouter = Router()

likesRouter.get("/", getPaginatedLikes)
likesRouter.get("/sortByCount", sortLikesCount)
likesRouter.get("/", getAll)
likesRouter.get("/:id", getOne)
likesRouter.get("/getSearch", getBySearch)
likesRouter.post("/", create)
likesRouter.delete("/:id", remove)

export default likesRouter;
