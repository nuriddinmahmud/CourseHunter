import express from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/resourceCategory.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import selfPolice from "../middleware/selfPolice.js";

const ResourceCategoryRouter = express.Router();

/**
 * @swagger
 * /resourcecategories:
 *   get:
 *     summary: Get all resource categories
 *     tags: [ResourceCategories]
 *     responses:
 *       200:
 *         description: List of all resource categories
 *       400:
 *         description: No resource categories found
 *       500:
 *         description: Server error
 */
ResourceCategoryRouter.get("/", getAll);

/**
 * @swagger
 * /resourcecategories/{id}:
 *   get:
 *     summary: Get a single resource category by ID
 *     tags: [ResourceCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Resource category ID
 *     responses:
 *       200:
 *         description: Resource category details
 *       404:
 *         description: Resource category not found
 *       500:
 *         description: Server error
 */
ResourceCategoryRouter.get("/:id", getOne);

/**
 * @swagger
 * /resourcecategories:
 *   post:
 *     summary: Create a new resource category
 *     tags: [ResourceCategories]
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
 *             required:
 *               - name
 *               - image
 *     responses:
 *       200:
 *         description: Resource category created successfully
 *       400:
 *         description: Validation error
 */
ResourceCategoryRouter.post("/", verifyToken, selfPolice(["Admin"]), create);

/**
 * @swagger
 * /resourcecategories/{id}:
 *   patch:
 *     summary: Update a resource category by ID
 *     tags: [ResourceCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Resource category ID
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
 *     responses:
 *       200:
 *         description: Resource category updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Resource category not found
 *       500:
 *         description: Server error
 */
ResourceCategoryRouter.patch("/:id", verifyToken, selfPolice(["Admin"]), update);

/**
 * @swagger
 * /resourcecategories/{id}:
 *   delete:
 *     summary: Delete a resource category by ID
 *     tags: [ResourceCategories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Resource category ID
 *     responses:
 *       200:
 *         description: Resource category deleted successfully
 *       404:
 *         description: Resource category not found
 *       500:
 *         description: Server error
 */
ResourceCategoryRouter.delete("/:id", verifyToken, selfPolice(["Admin"]), remove);

export default ResourceCategoryRouter;
