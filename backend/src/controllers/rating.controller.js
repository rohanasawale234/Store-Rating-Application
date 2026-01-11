import pool from "../config/db.js";

// submit rating
export const submitRating = async (req, res) => {
  const { storeId, rating } = req.body;
  const userId = req.user.id;

  try {
    await pool.query(
      "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)",
      [userId, storeId, rating]
    );

    res.status(201).json({ message: "Rating submitted successfully" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Rating already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// update rating
export const updateRating = async (req, res) => {
  const { rating } = req.body;
  const { storeId } = req.params;
  const userId = req.user.id;

  try {
    const [result] = await pool.query(
      "UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?",
      [rating, userId, storeId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.json({ message: "Rating updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// get user's rating for store
export const getUserRating = async (req, res) => {
  const { storeId } = req.params;
  const userId = req.user.id;

  try {
    const [rows] = await pool.query(
      "SELECT rating FROM ratings WHERE user_id = ? AND store_id = ?",
      [userId, storeId]
    );

    res.json(rows[0] || null);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
