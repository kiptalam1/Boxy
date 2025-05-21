import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import configurePassport from "./configs/passport.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// connect to database;
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Connected to mongoDB !"))
	.catch((err) => console.log("Mongo connection error" + err));

//port;
const PORT = process.env.PORT || 5000;

// middleware;
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI,
			collectionName: "sessions",
		}),
		cookie: {
			maxAge: 1 * 60 * 60 * 1000,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		},
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
configurePassport(passport);

// setup views;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Path to views folder

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// base endpoint;
app.get("/", (req, res) => {
	res.render("homepage");
});

// routes;
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/files", fileRoutes);

// listen to app;
app.listen(PORT, () => {
	console.log(`It's running bruv !`);
});
