import express from "express";
import { registerUser } from "../controllers/authController.js";
import ensureAuth from "../middleware/auth-middleware.js";
import passport from "passport";
import redirectIfAuthenticated from "../middleware/redirectAuthenticated.js";
import { error } from "console";
const router = express.Router();

router.get("/login", redirectIfAuthenticated, (req, res) => {
	const message = req.session.message;
	delete req.session.message;
	res.render("login", {
		title: "Login in",
		message,
		error: null,
		values: {},
	}); // or send login page
});

router.get("/register", redirectIfAuthenticated, (req, res) => {
	const { error, message, oldInput } = req.session;
	// clear session messages after displaying them;
	delete req.session.message;
	delete req.session.error;
	delete req.session.oldInput;

	res.render("register", { error, message, values: oldInput || {} });
});

router.post("/register", registerUser);
router.post("/login", redirectIfAuthenticated, (req, res, next) => {
	try {
		passport.authenticate("local", (err, user, info) => {
			if (err) return next(err);
			if (!user) return res.render("login", { error: info.message });

			req.logIn(user, (err) => {
				if (err) return next(err);
				return res.redirect("/dashboard");
			});
		})(req, res, next);
	} catch (err) {
		res.render("login", {
			title: "Sign In",
			error: err.message,
			values: req.body, // Retain user input
		});
	}
});

export default router;