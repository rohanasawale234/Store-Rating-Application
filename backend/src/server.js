import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 5000;

// Start server FIRST (Render needs this)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Try DB connection separately (non-blocking)
(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ MySQL connected");
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
  }
})();
