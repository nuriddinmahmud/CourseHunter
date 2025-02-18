import { Router } from "express";
import { create, findAll, findOne, remove, update } from "../controllers/courses.controller.js";

const courseRoute = Router();

courseRoute.get('/', findAll);
courseRoute.post('/', create);
courseRoute.get('/:id', findOne);
courseRoute.patch('/:id', update);
courseRoute.delete('/:id', remove);

export default courseRoute;