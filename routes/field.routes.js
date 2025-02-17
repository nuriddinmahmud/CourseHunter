import express from "express";
import {
    create,
    getAll,
    getOne,
    update,
    remove,
  }from "../controllers/field.controller.js";

const FieldRouter = express.Router();

FieldRouter.post("/", create);
FieldRouter.get("/", getAll);
FieldRouter.get("/:id", getOne);
FieldRouter.put("/:id", update);
FieldRouter.delete("/:id", remove);

export default FieldRouter;
