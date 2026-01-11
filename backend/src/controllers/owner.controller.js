import pool from "../config/db.js";

export const getOwnerDashboard = async (req, res) => {
  const ownerId = req.user.id;

  try {
    // get store owned by this owner
    const [stores] = await pool.query(
      "SELECT id, name FROM stores WHERE owner_id = ?",
      [ownerId]
    );

    if (stores.length === 0) {
      return res.status(404).json({ message: "No store found for owner" });
    }

    const storeId = stores[0].id;

    // get ratings + users
    const [ratings] = await pool.query(
      `
      SELECT 
        u.name AS user_name,
        r.rating
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = ?
      `,
      [storeId]
    );

    // get average rating
    const [avg] = await pool.query(
      "SELECT ROUND(AVG(rating),1) AS average FROM ratings WHERE store_id = ?",
      [storeId]
    );

    res.json({
      store: stores[0],
      averageRating: avg[0].average,
      ratings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
