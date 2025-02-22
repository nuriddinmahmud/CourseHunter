import { Router } from "express";
import {
  create,
  getAll,
  getBySearch,
  getOne,
  getPaginatedEducationalCentres,
  remove,
  sortByAddress,
  sortByName,
  update,
} from "../controllers/educationalCenter.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import checkRole from "../middleware/rolePolice.js";

const educationalCenterRouter = Router();

/**
 * @swagger
 * /educationalcentres/getSearch:
 *   get:
 *     summary: Search educational centers based on query parameters
 *     tags: [EducationalCenters]
 *     parameters:
 *       - in: query
 *         name: name
 *         type: string
 *         description: Name of the educational center
 *       - in: query
 *         name: address
 *         type: string
 *         description: Address of the educational center
 *       - in: query
 *         name: regionID
 *         type: integer
 *         description: Region ID of the educational center
 *     responses:
 *       200:
 *         description: List of educational centers that match the search criteria
 *       400:
 *         description: Bad request
 */
educationalCenterRouter.get("/getSearch", getBySearch);

/**
 * @swagger
 * /educationalcentres/with-pagination:
 *   get:
 *     summary: Get educational centers with pagination
 *     tags: [EducationalCenters]
 *     parameters:
 *       - in: query
 *         name: page
 *         type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         type: integer
 *         description: Limit of results per page
 *     responses:
 *       200:
 *         description: List of educational centers with pagination
 *       400:
 *         description: Bad request
 */
educationalCenterRouter.get("/with-pagination", getPaginatedEducationalCentres);

/**
 * @swagger
 * /educationalcentres/sortByName:
 *   get:
 *     summary: Get educational centers sorted by name
 *     tags: [EducationalCenters]
 *     parameters:
 *       - in: query
 *         name: name
 *         type: string
 *         description: Sort order for educational center names (asc or desc)
 *     responses:
 *       200:
 *         description: Sorted list of educational centers by name
 *       400:
 *         description: Bad request
 */
educationalCenterRouter.get("/sortByName", sortByName);

/**
 * @swagger
 * /educationalcentres/sortByAddress:
 *   get:
 *     summary: Get educational centers sorted by address
 *     tags: [EducationalCenters]
 *     parameters:
 *       - in: query
 *         name: address
 *         type: string
 *         description: Sort order for educational center addresses (asc or desc)
 *     responses:
 *       200:
 *         description: Sorted list of educational centers by address
 *       400:
 *         description: Bad request
 */
educationalCenterRouter.get("/sortByAddress", sortByAddress);

/**
 * @swagger
 * /educationalcentres:
 *   get:
 *     summary: Get all educational centers
 *     tags: [EducationalCenters]
 *     responses:
 *       200:
 *         description: List of all educational centers
 *       401:
 *         description: No educational centers found
 *       400:
 *         description: Bad request
 */
educationalCenterRouter.get("/", getAll);

/**
 * @swagger
 * /educationalcentres/{id}:
 *   get:
 *     summary: Get a single educational center by ID
 *     tags: [EducationalCenters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Educational center ID
 *     responses:
 *       200:
 *         description: Educational center details
 *       404:
 *         description: Educational center not found
 *       400:
 *         description: Bad request
 */
educationalCenterRouter.get("/:id", getOne);

/**
 * @swagger
 * /educationalcentres:
 *   post:
 *     summary: Create a new educational center
 *     tags: [EducationalCenters]
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
 *               address:
 *                 type: string
 *               regionID:
 *                 type: integer
 *               phone:
 *                 type: string
 *             required:
 *               - name
 *               - image
 *               - address
 *               - regionID
 *               - phone
 *     responses:
 *       200:
 *         description: Educational center created successfully
 *       400:
 *         description: Validation error
 *       405:
 *         description: Unauthorized user role
 */
educationalCenterRouter.post("/", verifyToken, checkRole(["Ceo", "Admin"]), create);

/**
 * @swagger
 * /educationalcentres/{id}:
 *   patch:
 *     summary: Update an educational center by ID
 *     tags: [EducationalCenters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Educational center ID
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
 *               address:
 *                 type: string
 *               regionID:
 *                 type: integer
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Educational center updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Educational center not found
 *       405:
 *         description: Unauthorized user role
 */
educationalCenterRouter.patch("/:id", verifyToken, checkRole(["Ceo", "Admin"]), update);

/**
 * @swagger
 * /educationalcentres/{id}:
 *   delete:
 *     summary: Delete an educational center by ID
 *     tags: [EducationalCenters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Educational center ID
 *     responses:
 *       200:
 *         description: Educational center deleted successfully
 *       404:
 *         description: Educational center not found
 *       405:
 *         description: Unauthorized user role
 */
educationalCenterRouter.delete("/:id", verifyToken, checkRole(["Ceo", "Admin"]), remove);

export default educationalCenterRouter;
