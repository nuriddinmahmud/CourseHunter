import express from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/field.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const FieldRouter = express.Router();

/**
 * @swagger
 * /fields:
 *   post:
 *     summary: Create a new field
 *     tags: [Fields]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               courseID:
 *                 type: integer
 *             required:
 *               - name
 *               - image
 *     responses:
 *       201:
 *         description: Field created successfully
 *       400:
 *         description: Validation error
 */
FieldRouter.post("/", verifyToken, checkRole(["Admin", 'Ceo']), create);

/**
 * @swagger
 * /fields:
 *   get:
 *     summary: Get all fields with pagination
 *     tags: [Fields]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for field names
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of fields per page
 *     responses:
 *       200:
 *         description: List of fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       image:
 *                         type: string
 *                       courseID:
 *                         type: integer
 *       500:
 *         description: Server error
 */
FieldRouter.get("/", getAll);

/**
 * @swagger
 * /fields/{id}:
 *   get:
 *     summary: Get a single field by ID
 *     tags: [Fields]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Field ID
 *     responses:
 *       200:
 *         description: Field details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 image:
 *                   type: string
 *                 courseID:
 *                   type: integer
 *       404:
 *         description: Field not found
 *       500:
 *         description: Server error
 */
FieldRouter.get("/:id", getOne);

/**
 * @swagger
 * /fields/{id}:
 *   patch:
 *     summary: Update an existing field by ID
 *     tags: [Fields]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Field ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               courseID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Field updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Field not found
 *       500:
 *         description: Server error
 */
FieldRouter.patch("/:id", checkRole(["Admin", 'Ceo']), update);

/**
 * @swagger
 * /fields/{id}:
 *   delete:
 *     summary: Delete a field by ID
 *     tags: [Fields]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Field ID
 *     responses:
 *       200:
 *         description: Field deleted successfully
 *       404:
 *         description: Field not found
 *       500:
 *         description: Server error
 */
FieldRouter.delete("/:id", checkRole(["Admin", 'Ceo']), remove);

export default FieldRouter;
