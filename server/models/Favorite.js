const db = require("../config/database");

class Favorite {
  static async getAllByUser(userId) {
    const { rows } = await db.query(
      "SELECT product_key, product_data, created_at FROM favorites WHERE user_id = $1 ORDER BY created_at DESC",
      [userId],
    );
    return rows;
  }

  static async add(userId, productKey, productData) {
    const { rows } = await db.query(
      `INSERT INTO favorites (user_id, product_key, product_data)
     VALUES ($1, $2, $3)                          
     ON CONFLICT (user_id, product_key) DO UPDATE
     SET product_data = EXCLUDED.product_data
     RETURNING product_key, product_data, created_at`,
      [userId, productKey, productData],
    );
    return rows[0];
  }

  static async remove(userId, productKey) {
    await db.query(
      "DELETE FROM favorites WHERE user_id = $1 AND product_key = $2",
      [userId, productKey],
    );
  }

  static async clear(userId) {
    await db.query("DELETE FROM favorites WHERE user_id = $1", [userId]);
  }
}

module.exports = Favorite;
