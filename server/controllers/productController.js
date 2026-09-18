const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const { category, popular, search, page = 1, limit = 50 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const products = await Product.findAll({
      category,
      popular: popular === 'true',
      search,
      limit: Number(limit),
      offset,
    });

    res.json({ success: true, data: { products } });
  } catch (err) {
    console.error('getProducts error', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ success: false, message: 'Некорректный id' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Товар не найден' });
    }
    res.json({ success: true, data: { product } });
  } catch (err) {
    console.error('getProductById error', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};