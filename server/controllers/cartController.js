const CartItem = require('../models/CartItem');

exports.getCart = async (req, res) => {
  try {
    const items = await CartItem.getAllByUser(req.userId);
    res.json({ success: true, data: { items } });
  } catch (err) {
    console.error('getCart error', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productKey, product, quantity = 1 } = req.body;
    if (!productKey || !product) {
      return res.status(400).json({ success: false, message: 'Некорректные данные' });
    }
    const item = await CartItem.add(req.userId, productKey, product, quantity);
    res.status(201).json({ success: true, data: { item } });
  } catch (err) {
    console.error('addToCart error', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};

exports.setQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await CartItem.setQuantity(req.userId, req.params.productKey, quantity);
    res.json({ success: true, data: { item } });
  } catch (err) {
    console.error('setQuantity error', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    await CartItem.remove(req.userId, req.params.productKey);
    res.json({ success: true });
  } catch (err) {
    console.error('removeFromCart error', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await CartItem.clear(req.userId);
    res.json({ success: true });
  } catch (err) {
    console.error('clearCart error', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};