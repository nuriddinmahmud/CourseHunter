import express from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/branches.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";
import selfPolice from "../middleware/selfPolice.js";

const BranchRouter = express.Router();

/**
 * @swagger
 * /branches:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the branch
 *               image:
 *                 type: string
 *                 description: URL of the branch image
 *               phone:
 *                 type: string
 *                 description: Phone number of the branch
 *               address:
 *                 type: string
 *                 description: Address of the branch
 *               regionID:
 *                 type: integer
 *                 description: ID of the region
 *             required:
 *               - name
 *               - image
 *               - phone
 *               - address
 *               - regionID
 *     responses:
 *       201:
 *         description: Branch created successfully
 *       400:
 *         description: Bad request, validation error
 *       500:
 *         description: Server error
 */
BranchRouter.post("/", verifyToken, selfPolice(['Admin', 'Ceo']), create);

/**
 * @swagger
 * /branches:
 *   get:
 *     summary: Get all branches
 *     tags: [Branches]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for branch name
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of branches per page
 *       - in: query
 *         name: regionID
 *         schema:
 *           type: integer
 *         description: Region ID to filter branches
 *     responses:
 *       200:
 *         description: List of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of branches
 *                 page:
 *                   type: integer
 *                   description: Current page
 *                 pageSize:
 *                   type: integer
 *                   description: Number of items per page
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
 *                       phone:
 *                         type: string
 *                       address:
 *                         type: string
 *                       regionID:
 *                         type: integer
 *       500:
 *         description: Server error
 */
BranchRouter.get("/", getAll);

/**
 * @swagger
 * /branches/{id}:
 *   get:
 *     summary: Get a single branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID
 *     responses:
 *       200:
 *         description: Branch details
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
 *                 phone:
 *                   type: string
 *                 address:
 *                   type: string
 *                 regionID:
 *                   type: integer
 *       404:
 *         description: Branch not found
 *       500:
 *         description: Server error
 */
BranchRouter.get("/:id", getOne);

/**
 * @swagger
 * /branches/{id}:
 *   patch:
 *     summary: Update a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID
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
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               regionID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *       400:
 *         description: Bad request, validation error
 *       404:
 *         description: Branch not found
 *       500:
 *         description: Server error
 */
BranchRouter.patch("/:id", verifyToken, checkRole(['Admin']), update);

/**
 * @swagger
 * /branches/{id}:
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *       404:
 *         description: Branch not found
 *       500:
 *         description: Server error
 */
BranchRouter.delete("/:id", verifyToken, checkRole(['Admin']), remove);

export default BranchRouter;
