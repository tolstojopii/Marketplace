const db = require('../config/database');

exports.getCategories = async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT id, name, slug FROM categories ORDER BY id'
    );
    res.json({ success: true, data: { categories: rows } });
  } catch (err) {
    console.error('getCategories error', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};