import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cloudinary from "./utils/cloudinary";
const app = express();

// connect to database;
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Connected to mongoDB !"))
	.catch((err) => console.log("Mongo connection error" + err));

// cloudinary configuration;
//cloudinary.uploader.upload();

//port;
const PORT = process.env.PORT || 5000;

// base endpoint;
app.get("/", (req, res) => {
	res.json({
		msg: "Welcome home !",
	});
});

// listen to app;
app.listen(PORT, () => {
	console.log(`It's running bruv !`);
});
