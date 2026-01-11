import express from "express";
import {
  submitRating,
  updateRating,
  getUserRating,
} from "../controllers/rating.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// submit new rating
router.post("/", authenticate, submitRating);

// update existing rating
router.put("/:storeId", authenticate, updateRating);

// get user's rating for a store
router.get("/:storeId", authenticate, getUserRating);

export default router;
