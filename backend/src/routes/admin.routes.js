import express from "express";
import {
  createStoreOwner,
  createStore,
  getAdminStats,
  getAllUsers,
  getAllStores,
} from "../controllers/admin.controller.js";
import {
  authenticate,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * ============================
 * ADMIN ROUTES
 * ============================
 */

// Create Store Owner
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

// Get All Users
router.get(
  "/users",
  authenticate,
  authorizeAdmin,
  getAllUsers
);

// Get All Stores
router.get(
  "/stores",
  authenticate,
  authorizeAdmin,
  getAllStores
);

export default router;
