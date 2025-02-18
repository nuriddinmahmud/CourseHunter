import { Router } from "express";
import upload from "../middleware/multer.middleware.js";

const uploadImageRoute = Router();

uploadImageRoute.post("/", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(404).send({ message: "Image not found ❗" });
  }
  res.status(200).send({ message: "Image uploaded successfully", image: req.file.filename });
});

export default uploadImageRoute;
