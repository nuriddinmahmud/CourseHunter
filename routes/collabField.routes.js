import { Router } from "express";
import { create } from "../controllers/collabField.controller.js";

/**
 * @swagger
 * tags:
 *   name: CollabField
 */

/**
 * @swagger
 * /collabFields:
 *   post:
 *     summary: Create a new CollabField
 *     tags: [CollabField]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fieldID:
 *                 type: integer
 *               educationalCentreID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: CollabField created successfully
 *       500:
 *         description: Internal server error
 */
const CollabFieldRoute = Router();

CollabFieldRoute.post('/', create);

export default CollabFieldRoute;
