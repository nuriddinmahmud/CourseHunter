import { Router } from "express";
import { findAll, create, findOne, update, remove } from "../controllers/reception.controller.js";

const receptionRoute = Router();

receptionRoute.get('/', findAll);
receptionRoute.post('/', create);
receptionRoute.get('/:id', findOne);
receptionRoute.patch('/:id', update);
receptionRoute.delete('/:id', remove);

export default receptionRoute;