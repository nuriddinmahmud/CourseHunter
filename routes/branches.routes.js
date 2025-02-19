import express from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/branches.controller.js";

const BranchRouter = express.Router();

BranchRouter.post("/", create);
BranchRouter.get("/", getAll);
BranchRouter.get("/:id", getOne);
BranchRouter.patch("/:id", update);
BranchRouter.delete("/:id", remove);

export default BranchRouter;
