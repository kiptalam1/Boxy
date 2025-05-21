import express from "express";
import ensureAuth from "../middleware/auth-middleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/upload", ensureAuth, upload.single("file"), (req, res) => {
	res.status(201).redirect("dashboard");
});

export default router;
