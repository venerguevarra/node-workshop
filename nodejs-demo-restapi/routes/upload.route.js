import { Router } from "express";
import path from "path";
import multer from "multer";
import fs from 'fs';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const accepted_extensions = ['jpg', 'png', 'gif', 'txt'];
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB upload limit
    files: 1 // 1 file
  },
  fileFilter: (req, file, cb) => {
    // if the file extension is in our accepted list
    if (
      accepted_extensions.some(ext => file.originalname.endsWith("." + ext))
    ) {
      return cb(null, true);
    }

    // otherwise, return error
    return cb(
      new Error(
        "Only " + accepted_extensions.join(", ") + " files are allowed!"
      )
    );
  }
});

router.post("/single", upload.single("singleFile"), (req, res) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  res.send(req.file);
});

//Uploading multiple files
router.post("/multiple", upload.array("multipleFiles"), (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }

  res.send(files);
});

router.post("/photo", upload.single("picture"), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString("base64");

  var finalImg = {
    contentType: req.file.mimetype,
    image: new Buffer(encode_image, "base64")
  };

  res.redirect("/");
});

export default router;
