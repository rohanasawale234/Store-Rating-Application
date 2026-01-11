import pool from "../config/db.js";

export const getAllStores = async (req, res) => {
  try {
    const [stores] = await pool.query(`
      SELECT 
        s.id,
        s.name,
        s.address,
        ROUND(AVG(r.rating), 1) AS average_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
    `);

    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
