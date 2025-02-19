import { Router } from "express";
import {
  create,
  getAll,
  getBySearch,
  getOne,
  getPaginatedEducationalCentres,
  remove,
  sortByAddress,
  sortByName,
  update,
} from "../controllers/educationalCenter.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const educationalCenterRouter = Router();

educationalCenterRouter.get("/getSearch", getBySearch);
educationalCenterRouter.get("/with-pagination", getPaginatedEducationalCentres);
educationalCenterRouter.get("/sortByName", sortByName);
educationalCenterRouter.get("/sortByAddress", sortByAddress);
educationalCenterRouter.get("/", getAll);
educationalCenterRouter.get("/:id", getOne);
educationalCenterRouter.post("/", verifyToken, checkRole(["ceo", "admin"]), create);
educationalCenterRouter.patch("/:id", verifyToken, checkRole(["ceo", "admin"]), update);
educationalCenterRouter.delete("/:id", verifyToken, checkRole(["ceo", "admin"]), remove);

export default educationalCenterRouter;
