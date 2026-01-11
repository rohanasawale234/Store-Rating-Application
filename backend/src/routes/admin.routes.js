import express from "express";
import {
  createStoreOwner,
  createStore,
  getAdminStats,
} from "../controllers/admin.controller.js";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post(
  "/store-owner",
  authenticate,
  authorizeAdmin,
  createStoreOwner
);

// Create Store
router.post(
  "/store",
  authenticate,
  authorizeAdmin,
  createStore
);

// Admin Dashboard Stats
router.get(
  "/stats",
  authenticate,
  authorizeAdmin,
  getAdminStats
);

export default router;
