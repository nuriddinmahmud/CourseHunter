import { Router } from "express";
import { 
  create, 
  getAll, 
  getBySearch, 
  getOne, 
  getPaginatedRegions, 
  remove, 
  sortByName, 
  update 
} from "../controllers/region.controller.js";

const regionRouter = Router();

/**
 * @swagger
 * /regions/with-pagination:
 *   get:
 *     summary: Get all regions with pagination
 *     tags: [Regions]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of regions per page
 *     responses:
 *       200:
 *         description: List of regions with pagination
 *       400:
 *         description: Bad request
 */
regionRouter.get("/with-pagination", getPaginatedRegions);

/**
 * @swagger
 * /regions/sortByName:
 *   get:
 *     summary: Get regions sorted by name
 *     tags: [Regions]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Sort order for region names (asc or desc)
 *     responses:
 *       200:
 *         description: Sorted list of regions by name
 *       400:
 *         description: Bad request
 */
regionRouter.get("/sortByName", sortByName);

/**
 * @swagger
 * /regions:
 *   get:
 *     summary: Get all regions
 *     tags: [Regions]
 *     responses:
 *       200:
 *         description: List of all regions
 *       400:
 *         description: No regions found
 *       500:
 *         description: Server error
 */
regionRouter.get("/", getAll);

/**
 * @swagger
 * /regions/{id}:
 *   get:
 *     summary: Get a single region by ID
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Region ID
 *     responses:
 *       200:
 *         description: Region details
 *       404:
 *         description: Region not found
 *       500:
 *         description: Server error
 */
regionRouter.get("/:id", getOne);

/**
 * @swagger
 * /regions/getSearch:
 *   get:
 *     summary: Search regions by query parameters
 *     tags: [Regions]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search term for region names
 *     responses:
 *       200:
 *         description: List of regions matching search criteria
 *       400:
 *         description: No matching regions found
 *       500:
 *         description: Server error
 */
regionRouter.get("/getSearch", getBySearch);

/**
 * @swagger
 * /regions:
 *   post:
 *     summary: Create a new region
 *     tags: [Regions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Region created successfully
 *       400:
 *         description: Validation error
 */
regionRouter.post("/", create);

/**
 * @swagger
 * /regions/{id}:
 *   patch:
 *     summary: Update an existing region by ID
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Region ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Region updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Region not found
 *       500:
 *         description: Server error
 */
regionRouter.patch("/:id", update);

/**
 * @swagger
 * /regions/{id}:
 *   delete:
 *     summary: Delete a region by ID
 *     tags: [Regions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Region ID
 *     responses:
 *       200:
 *         description: Region deleted successfully
 *       404:
 *         description: Region not found
 *       500:
 *         description: Server error
 */
regionRouter.delete("/:id", remove);

export default regionRouter;
