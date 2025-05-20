// import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/schemas/user.js";

export default function configurePassport(passport) {
	passport.use(
		new LocalStrategy(
			{ usernameField: "email" },
			async (email, password, done) => {
				try {
					const findUser = await User.findOne({ email });
					// if no user is found;
					if (!findUser)
						return done(null, false, { message: "User not found" });
					// if passwords do not match;
					const passwordMatch = await bcrypt.compare(
						password,
						findUser.password
					);
					if (!passwordMatch)
						return done(null, false, { message: "Invalid credentials" });
					return done(null, findUser);
				} catch (error) {
					done(error);
				}
			}
		)
	);

	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser(async (id, done) => {
		try {
			const user = await User.findById(id);
			done(null, user);
		} catch (err) {
			done(err);
		}
	});
}
