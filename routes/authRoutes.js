import express from "express";
import { registerUser } from "../controllers/authController.js";
import ensureAuth from "../middleware/auth-middleware.js";
import passport from "passport";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(401).json({ message: info.message });

		req.logIn(user, (err) => {
			if (err) return next(err);
			return res.status(200).json({ message: "Login successful" });
		});
	})(req, res, next);
});

export default router;