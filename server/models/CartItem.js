const db = require('../config/database');

class CartItem {
  static async getAllByUser(userId) {
    const { rows } = await db.query(
      'SELECT product_key, product_data, quantity FROM cart_items WHERE user_id = $1 ORDER BY created_at ASC',
      [userId]
    );
    return rows;
  }

  static async add(userId, productKey, productData, quantity = 1) {
    const { rows } = await db.query(
      `INSERT INTO cart_items (user_id, product_key, product_data, quantity)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, product_key) DO UPDATE
       SET quantity = cart_items.quantity + EXCLUDED.quantity,
           updated_at = NOW()
       RETURNING product_key, product_data, quantity`,
      [userId, productKey, productData, quantity]
    );
    return rows[0];
  }

  static async setQuantity(userId, productKey, quantity) {
    if (quantity <= 0) return this.remove(userId, productKey);
    const { rows } = await db.query(
      `UPDATE cart_items SET quantity = $3, updated_at = NOW()
       WHERE user_id = $1 AND product_key = $2
       RETURNING product_key, product_data, quantity`,
      [userId, productKey, quantity]
    );
    return rows[0];
  }

  static async remove(userId, productKey) {
    await db.query(
      'DELETE FROM cart_items WHERE user_id = $1 AND product_key = $2',
      [userId, productKey]
    );
  }

  static async clear(userId) {
    await db.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
  }
}

module.exports = CartItem;