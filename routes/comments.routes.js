import { Router } from "express";
import { create, getAll, getBySearch, getOne, getPaginatedComments, remove, sortByCreatedDate, sortByStar, sortCommenstCount, update } from "../controllers/comment.controller.js";
import verifyToken from "../middleware/verifyToken.js";
const commentRouter = Router();
/**
 * @swagger
 * tags:
 *   name: Comments
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               star:
 *                 type: number
 *               createdAt:
 *                 type: string
 *               educationalCentreID:
 *                 type: number
 *     responses:
 *       200:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Created comment successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                     star:
 *                       type: number
 *                     educationalCentreID:
 *                       type: number
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
commentRouter.post("/", verifyToken, create)

/**
 * @swagger
 * /comments/with-pagination:
 *   get:
 *     summary: Get paginated comments
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of comments per page
 *     responses:
 *       200:
 *         description: Paginated list of comments
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
 *         description: Invalid query parameters
 */
commentRouter.get("/with-pagination", getPaginatedComments);

/**
 * @swagger
 * /comments/sortByStar:
 *   get:
 *     summary: Sort comments by star rating
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: star
 *         schema:
 *           type: number
 *         description: The star rating to filter by
 *     responses:
 *       200:
 *         description: Sorted comments by star rating
 */
commentRouter.get("/sortByStar", sortByStar);

/**
 * @swagger
 * /comments/sortByCreatedDate:
 *   get:
 *     summary: Sort comments by creation date
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: The date format to sort comments by
 *     responses:
 *       200:
 *         description: Sorted comments by creation date
 */
commentRouter.get("/sortByCreatedDate", sortByCreatedDate);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of all comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No comments found
 */
commentRouter.get("/", getAll);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get a specific comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: The requested comment
 *       404:
 *         description: Comment not found
 */
commentRouter.get("/:id", getOne);

/**
 * @swagger
 * /comments/getSearch:
 *   get:
 *     summary: Search comments
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for comments
 *     responses:
 *       200:
 *         description: Found comments based on search term
 *       400:
 *         description: No comments found
 */
commentRouter.get("/getSearch", getBySearch);

/**
 * @swagger
 * /comments/{id}:
 *   patch:
 *     summary: Update an existing comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               star:
 *                 type: number
 *               educationalCentreID:
 *                 type: number
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Comment not found
 */
commentRouter.patch("/:id", verifyToken, update);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a specific comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
commentRouter.delete("/:id", verifyToken, remove);

export default commentRouter;
