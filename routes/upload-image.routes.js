import { Router } from "express";
import upload from "../middleware/multer.middleware.js";

const uploadImageRoute = Router();

/**
 * @swagger
 * /upload-image:
 *   post:
 *     summary: Upload a file (single image)
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image uploaded successfully
 *                 image:
 *                   type: string
 *       404:
 *         description: Image not found
 */
uploadImageRoute.post("/", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(404).send({ message: "Image not found ❗" });
  }
  res.status(200).send({ message: "Image uploaded successfully", image: req.file.filename });
});

export default uploadImageRoute;
