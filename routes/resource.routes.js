import { Router } from "express";
import { findAll, create, findOne, update, remove } from "../controllers/resource.controller.js";

const resourceRoute = Router();

resourceRoute.get('/', findAll);
resourceRoute.post('/', create);
resourceRoute.get('/:id', findOne);
resourceRoute.patch('/:id', update);
resourceRoute.delete('/:id', remove);

export default resourceRoute;