import { Router } from "express";
import { findAll, create, findOne, update, remove } from "../controllers/reception.controller.js";

const receptionRoute = Router();

/**
 * @swagger
 * /receptions:
 *   get:
 *     summary: Get all receptions
 *     tags: [Receptions]
 *     responses:
 *       200:
 *         description: List of all receptions
 *       404:
 *         description: No receptions found
 *       500:
 *         description: Server error
 */
receptionRoute.get('/', findAll);

/**
 * @swagger
 * /receptions:
 *   post:
 *     summary: Create a new reception
 *     tags: [Receptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *               fieldID:
 *                 type: integer
 *               branchID:
 *                 type: integer
 *               educationalCentreID:
 *                 type: integer
 *             required:
 *               - userID
 *               - fieldID
 *               - branchID
 *               - educationalCentreID
 *     responses:
 *       200:
 *         description: Reception created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
receptionRoute.post('/', create);

/**
 * @swagger
 * /receptions/{id}:
 *   get:
 *     summary: Get a single reception by ID
 *     tags: [Receptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Reception ID
 *     responses:
 *       200:
 *         description: Reception details
 *       404:
 *         description: Reception not found
 *       500:
 *         description: Server error
 */
receptionRoute.get('/:id', findOne);

/**
 * @swagger
 * /receptions/{id}:
 *   patch:
 *     summary: Update a reception by ID
 *     tags: [Receptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Reception ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userID:
 *                 type: integer
 *               fieldID:
 *                 type: integer
 *               branchID:
 *                 type: integer
 *               educationalCentreID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Reception updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Reception not found
 *       500:
 *         description: Server error
 */
receptionRoute.patch('/:id', update);

/**
 * @swagger
 * /receptions/{id}:
 *   delete:
 *     summary: Delete a reception by ID
 *     tags: [Receptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Reception ID
 *     responses:
 *       200:
 *         description: Reception deleted successfully
 *       404:
 *         description: Reception not found
 *       500:
 *         description: Server error
 */
receptionRoute.delete('/:id', remove);

export default receptionRoute;
