import express from "express";
import { registerUser } from "../controllers/authController.js";
import ensureAuth from "../middleware/auth-middleware.js";
import passport from "passport";
import redirectIfAuthenticated from "../middleware/redirectAuthenticated.js";
const router = express.Router();

router.get("/login", redirectIfAuthenticated, (req, res) => {
	res.render("login"); // or send login page
});

router.get("/register", redirectIfAuthenticated, (req, res) => {
	res.render("register");
});

router.post("/register", registerUser);
router.post("/login", redirectIfAuthenticated, (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(401).json({ message: info.message });

		req.logIn(user, (err) => {
			if (err) return next(err);
			return res.redirect("/dashboard");
		});
	})(req, res, next);
});

export default router;