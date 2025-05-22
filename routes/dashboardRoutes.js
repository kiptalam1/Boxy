import express from "express";
import ensureAuth from "../middleware/auth-middleware.js";
import { displayDashboardContent } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", ensureAuth, displayDashboardContent);
export default router;
