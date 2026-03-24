import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 5000;

// Start server immediately (IMPORTANT for Render)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Try DB connection separately (won't crash app)
(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ MySQL connected successfully");
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message);
  }
})();
