import express from "express";
import { registerUser } from "../controllers/authController.js";
const router = express.Router();

router.post("/auth/login", registerUser);
