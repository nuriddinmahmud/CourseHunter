import { Router } from "express";
import { create, getAll, getBySearch, getOne, getPaginatedRegions, remove, sortByName, update } from "../controllers/region.controller.js";

const regionRouter = Router()

regionRouter.get("/with-pagination", getPaginatedRegions)
regionRouter.get("/sortByName", sortByName)
regionRouter.get("/", getAll)
regionRouter.get("/:id", getOne)
regionRouter.get("/getSearch", getBySearch)
regionRouter.post("/", create)
regionRouter.patch("/:id", update)
regionRouter.delete("/:id", remove)

export default regionRouter;
