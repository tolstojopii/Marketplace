const db = require('../config/database')

class User {
  static async findByEmail(email) {
    const { rows } = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const { rows } = await db.query(
      `SELECT id, full_name, email, role, created_at
       FROM users WHERE id = $1`,
      [id]
    );
    return rows[0];
  }

  static async create(full_name, email, password) {
    const { rows } = await db.query(
      `INSERT INTO users (full_name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, full_name, email, role, created_at`,
      [full_name, email, password]
    );
    return rows[0];
  }

  static async getAll() {
    const { rows } = await db.query(
      'SELECT id, full_name, email, role, created_at FROM users'
    );
    return rows;
  }
}

module.exports = User;