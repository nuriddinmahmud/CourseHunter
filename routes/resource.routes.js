import { Router } from "express";
import { findAll, create, findOne, update, remove } from "../controllers/resource.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import selfPolice from "../middleware/selfPolice.js";

const resourceRoute = Router();

resourceRoute.get('/', findAll);
resourceRoute.post('/', verifyToken, create);
resourceRoute.get('/:id', findOne);
resourceRoute.patch('/:id', verifyToken, selfPolice(["User", "Admin"]), update);
resourceRoute.delete('/:id', verifyToken, selfPolice(["User", "Admin"]), remove);

export default resourceRoute;
