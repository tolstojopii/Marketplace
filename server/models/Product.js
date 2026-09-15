const db = require('../config/database');

class Product {
  static async findAll({ category, popular, search, limit = 50, offset = 0 }) {
    const where = [];
    const params = [];
    let i = 1;

    if (category) {
      where.push(`c.name = $${i++}`);
      params.push(category);
    }
    if (popular === true) {
      where.push(`p.is_popular = TRUE`);
    }
    if (search) {
      where.push(`p.name ILIKE $${i++}`);
      params.push(`%${search}%`);
    }

    const whereSQL = where.length ? `WHERE ${where.join(' AND ')}` : '';
    params.push(limit, offset);

    const { rows } = await db.query(
      `SELECT p.id, p.name, p.price, p.image, p.rating, p.seller,
              p.is_popular AS "isPopular",
              c.name AS category
       FROM products p
       LEFT JOIN categories c ON c.id = p.category_id
       ${whereSQL}
       ORDER BY p.id
       LIMIT $${i++} OFFSET $${i++}`,
      params
    );
    return rows;
  }

  static async findById(id) {
    const { rows } = await db.query(
      `SELECT p.id, p.name, p.price, p.image, p.rating, p.seller,
              p.is_popular AS "isPopular",
              c.name AS category
       FROM products p
       LEFT JOIN categories c ON c.id = p.category_id
       WHERE p.id = $1`,
      [id]
    );
    return rows[0];
  }
}

module.exports = Product;