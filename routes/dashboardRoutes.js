import express from "express";
import ensureAuth from "../middleware/auth-middleware.js";

const router = express.Router();

router.get("/dashboard", ensureAuth, (req, res) => {
	res.json({ message: `Welcome, ${req.user.displayName}` });
});

export default router;
