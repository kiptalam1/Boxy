import express from "express";
import ensureAuth from "../middleware/auth-middleware.js";

import uploadFileToCloudinaryAndDb from "../controllers/fileController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// upload file to database and cloudinary;
router.post(
	"/upload",
	ensureAuth,
	upload.single("file"),
	uploadFileToCloudinaryAndDb
);

//delete file 

export default router;
