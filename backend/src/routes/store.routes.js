import express from "express";
import { getAllStores } from "../controllers/store.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, getAllStores);

export default router;
