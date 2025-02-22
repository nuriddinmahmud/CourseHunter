import { Router } from "express";
import { findAll, create, findOne, update, remove } from "../controllers/resource.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import selfPolice from "../middleware/selfPolice.js";

const resourceRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Resource management API
 */

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Get all resources
 *     tags: [Resources]
 *     responses:
 *       200:
 *         description: List of all resources
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Error fetching resources
 */

resourceRoute.get('/', findAll);


/**
 * @swagger
 * /resources/{id}:
 *   get:
 *     summary: Get a single resource by ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resource found
 *       404:
 *         description: Resource not found
 *       400:
 *         description: Error fetching resource
 */

resourceRoute.get('/:id', findOne);


/**
 * @swagger
 * /resources:
 *   post:
 *     summary: Create a new resource
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Resource Name"
 *               media:
 *                 type: string
 *                 example: "http://example.com/media.mp4"
 *               description:
 *                 type: string
 *                 example: "Resource description"
 *               image:
 *                 type: string
 *                 example: "http://example.com/image.jpg"
 *               categoryID:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Resource created successfully
 *       400:
 *         description: Error creating resource
 *       422:
 *         description: Validation error
 */

resourceRoute.post('/', verifyToken, create);


/**
 * @swagger
 * /resources/{id}:
 *   patch:
 *     summary: Update a resource by ID
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               media:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               categoryID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Resource updated successfully
 *       404:
 *         description: Resource not found
 *       400:
 *         description: Error updating resource
 *       422:
 *         description: Validation error
 */

resourceRoute.patch('/:id', verifyToken, selfPolice(["User", "Admin"]), update);


/**
 * @swagger
 * /resources/{id}:
 *   delete:
 *     summary: Delete a resource by ID
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resource deleted successfully
 *       404:
 *         description: Resource not found
 *       400:
 *         description: Error deleting resource
 */

resourceRoute.delete('/:id', verifyToken, selfPolice(["User", "Admin"]), remove);

export default resourceRoute;
