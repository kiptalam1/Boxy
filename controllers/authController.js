import express from "express";
import bcrypt from "bcrypt";
import User from "../models/schemas/user.js";

export async function registerUser(req, res) {
	const { email, displayName, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			req.session.error = "User already exists";
			return res.redirect("/auth/register");
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			email,
			displayName,
			password: hashedPassword,
			rootFolder: null,
		});
		await user.save();
		req.session.message = "User registered successfully";
		res.redirect("/auth/login");
	} catch (err) {
		req.session.error = "Registration failed";
		req.session.oldInput = req.body;
		res.redirect("/auth/register");
	}
}

