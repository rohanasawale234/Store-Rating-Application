import pool from "../config/db.js";
import bcrypt from "bcryptjs";

/**
 * ============================
 * 1️⃣ CREATE STORE OWNER
 * ============================
 */
export const createStoreOwner = async (req, res) => {
  const { name, email, address, password } = req.body;

  try {
    const [exists] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (exists.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, address, password, role) VALUES (?, ?, ?, ?, 'STORE_OWNER')",
      [name, email, address, hashedPassword]
    );

    res.status(201).json({ message: "Store owner created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ============================
 * 2️⃣ CREATE STORE
 * ============================
 */
export const createStore = async (req, res) => {
  const { name, email, address, ownerId } = req.body;

  try {
    const [owners] = await pool.query(
      "SELECT id FROM users WHERE id = ? AND role = 'STORE_OWNER'",
      [ownerId]
    );

    if (owners.length === 0) {
      return res.status(400).json({ message: "Invalid store owner" });
    }

    await pool.query(
      "INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)",
      [name, email, address, ownerId]
    );

    res.status(201).json({ message: "Store created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ============================
 * 3️⃣ ADMIN DASHBOARD STATS
 * ============================
 */
export const getAdminStats = async (req, res) => {
  try {
    const [[users]] = await pool.query(
      "SELECT COUNT(*) AS total FROM users"
    );

    const [[stores]] = await pool.query(
      "SELECT COUNT(*) AS total FROM stores"
    );

    const [[ratings]] = await pool.query(
      "SELECT COUNT(*) AS total FROM ratings"
    );

    res.json({
      totalUsers: users.total,
      totalStores: stores.total,
      totalRatings: ratings.total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ============================
 * 4️⃣ GET ALL USERS (ADMIN)
 * ============================
 */
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, name, email, address, role FROM users ORDER BY created_at DESC"
    );

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ============================
 * 5️⃣ GET ALL STORES (ADMIN)
 * ============================
 */
export const getAllStores = async (req, res) => {
  try {
    const [stores] = await pool.query(`
      SELECT 
        s.id,
        s.name,
        s.email,
        s.address,
        ROUND(AVG(r.rating),1) AS rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
      ORDER BY s.created_at DESC
    `);

    res.json(stores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
