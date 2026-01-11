import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getOwnerDashboard } from "../controllers/owner.controller.js";

const router = express.Router();

router.get("/dashboard", authenticate, getOwnerDashboard);

export default router;
