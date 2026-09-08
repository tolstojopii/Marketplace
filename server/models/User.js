const db = require('../config/database')

class User {
  static async findByEmail(email){
    const query = 'SELECT * FROM users WHERE email = $1';

    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id){
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async create(full_name, email, password){
    const query = `
    INSERT INTO users (full_name, email, password)
    VALUES ($1,$2,$3)
    RETURNING id, full_name, email, created_at`;
    const result = await db.query(query, [full_name, email, password]);
    return result.rows[0];
  }


  static async getAll(){
    const query = 'SELECT id, full_name, email, created_at FROM users';
    const result = await db.query(query);
    return result.rows;
  }
}

module.exports = User;