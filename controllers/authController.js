import express from "express";
import bcrypt from "bcrypt";
import User from "../models/schemas/user.js";

export async function registerUser(req, res) {
	const { email, displayName, password } = req.body;
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(400).json({ message: "User already exists" });
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			email,
			displayName,
			password: hashedPassword,
			rootFolder: null,
		});
		await user.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Registration failed", error: err.message });
	}
}

