import multer from "multer";
import path from "path"

let storage = multer.diskStorage({
    filename: (req, res, cb) => {
        cb(null, `${Date.now()}.${path.extname(file.originalName)}`)
    },
    destination: (req, res, cb) => {
        cb(null, "./uploads")
    }
})

export let upload = multer({storage})