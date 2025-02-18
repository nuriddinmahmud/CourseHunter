import { Router } from "express";
import { create, getAll, getBySearch, getOne, getPaginatedEducationalCentres, remove, sortByAddress, sortByName, update } from "../controllers/educationalCenter.controller.js";

const educationalCenterRouter = Router()

educationalCenterRouter.get("/", getPaginatedEducationalCentres)
educationalCenterRouter.get("/sortByName", sortByName)
educationalCenterRouter.get("/sortByAddress", sortByAddress)
educationalCenterRouter.get("/", getAll)
educationalCenterRouter.get("/:id", getOne)
educationalCenterRouter.get("/getSearch", getBySearch)
educationalCenterRouter.post("/", create)
educationalCenterRouter.patch("/:id", update)
educationalCenterRouter.delete("/:id", remove)

export default educationalCenterRouter;
