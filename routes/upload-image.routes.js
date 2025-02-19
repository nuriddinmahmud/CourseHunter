import { Router } from "express";
import upload from "../middleware/multer.middleware.js";

const uploadImageRoute = Router();

/**
 * @swagger
 * /upload-image:
 *   post:
 *     summary: Faylni yuklash (single image)
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
 *         description: Rasm muvaffaqiyatli yuklandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 image:
 *                   type: string
 *       404:
 *         description: Rasm topilmadi
 */
uploadImageRoute.post("/", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(404).send({ message: "Image not found ❗" });
  }
  res.status(200).send({ message: "Image uploaded successfully", image: req.file.filename });
});

export default uploadImageRoute;
