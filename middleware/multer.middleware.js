import multer from "multer";
import path from "path";

let storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
});

export let upload = multer({ storage });