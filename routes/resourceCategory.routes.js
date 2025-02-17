import expres from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/resourceCategory.controller.js";

const ResourceCategoryRouter = expres.Router()

ResourceCategoryRouter.post("/", create);
ResourceCategoryRouter.get("/", getAll);
ResourceCategoryRouter.get("/:id", getOne);
ResourceCategoryRouter.put("/:id", update);
ResourceCategoryRouter.delete("/:id", remove);

export default ResourceCategoryRouter;
