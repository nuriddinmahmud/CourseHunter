import { Router } from "express";
import { create, getAll, getBySearch, getOne, getPaginatedLikes, remove, sortLikesCount } from "../controllers/likes.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const likesRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Likes
*/

/**
 * @swagger
 * /likes/sortLikesCount:
 *   get:
 *     summary: Sort likes by like count for each educational centre
 *     tags: [Likes]
 *     responses:
 *       200:
 *         description: Sorted likes by like count
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   educationalCentreID:
 *                     type: integer
 *                   likeCount:
 *                     type: integer
 */
likesRouter.get("/sortLikesCount", sortLikesCount);

/**
 * @swagger
 * /likes/getSearch:
 *   get:
 *     summary: Search likes for a user and educational centre
 *     tags: [Likes]
 *     parameters:
 *       - in: query
 *         name: userID
 *         schema:
 *           type: integer
 *         description: The user ID for searching likes
 *       - in: query
 *         name: educationalCentreID
 *         schema:
 *           type: integer
 *         description: The educational centre ID for filtering likes
 *     responses:
 *       200:
 *         description: Found likes based on user ID and educational centre ID
 *       400:
 *         description: Bad request or invalid parameters
 */
likesRouter.get("/getSearch", getBySearch);

/**
 * @swagger
 * /likes/with-pagination:
 *   get:
 *     summary: Get paginated likes
 *     tags: [Likes]
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
 *         description: Number of likes per page
 *     responses:
 *       200:
 *         description: Paginated list of likes
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
likesRouter.get("/with-pagination", getPaginatedLikes);

/**
 * @swagger
 * /likes:
 *   get:
 *     summary: Get all likes
 *     tags: [Likes]
 *     responses:
 *       200:
 *         description: List of all likes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No likes found
 */
likesRouter.get("/", getAll);

/**
 * @swagger
 * /likes/{id}:
 *   get:
 *     summary: Get a specific like by ID
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The like ID
 *     responses:
 *       200:
 *         description: The requested like
 *       404:
 *         description: Like not found
 */
likesRouter.get("/:id", getOne);

/**
 * @swagger
 * /likes:
 *   post:
 *     summary: Create a new like
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               educationalCentreID:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Like created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Created like successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     educationalCentreID:
 *                       type: integer
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */

likesRouter.post("/", verifyToken, create)

/**
 * @swagger
 * /likes/{id}:
 *   delete:
 *     summary: Delete a specific like
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The like ID
 *     responses:
 *       200:
 *         description: Like deleted successfully
 *       404:
 *         description: Like not found
 */
likesRouter.delete("/:id", verifyToken, remove);

export default likesRouter;
