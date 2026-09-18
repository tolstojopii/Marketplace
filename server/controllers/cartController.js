const CartItem = require("../models/CartItem");
const MAX_QTY = 99;
const MAX_KEY_LEN = 200;

exports.getCart = async (req, res) => {
  try {
    const items = await CartItem.getAllByUser(req.userId);
    res.json({ success: true, data: { items } });
  } catch (err) {
    console.error("getCart error", err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productKey, product } = req.body;
    const quantity = Number(req.body.quantity ?? 1);

    if (
      typeof productKey !== 'string' ||
      productKey.length === 0 ||
      productKey.length > MAX_KEY_LEN
    ) {
      return res.status(400).json({ success: false, message: 'Некорректный productKey' });
    }
    if (!product || typeof product !== 'object' || Array.isArray(product)) {
      return res.status(400).json({ success: false, message: 'Некорректный product' });
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY) {
      return res.status(400).json({
        success: false,
        message: `quantity должен быть целым числом от 1 до ${MAX_QTY}`,
      });
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
    const quantity = Number(req.body.quantity);

    if (!Number.isInteger(quantity) || quantity < 0 || quantity > MAX_QTY) {
      return res.status(400).json({
        success: false,
        message: `quantity должен быть целым числом от 0 до ${MAX_QTY}`,
      });
    }

    if (quantity === 0) {
      await CartItem.remove(req.userId, req.params.productKey);
      return res.json({ success: true, data: { item: null } });
    }

    const item = await CartItem.setQuantity(req.userId, req.params.productKey, quantity);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Товар не найден в корзине' });
    }
    res.json({ success: true, data: { item } });
  } catch (err) {
    console.error('setQuantity error', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};

exports.setQuantity = async (req, res) => {
  try {
    const quantity = Number(req.body.quantity);

    if (!Number.isInteger(quantity)) {
      return res
        .status(400)
        .json({ success: false, message: "quantity должен быть целым числом" });
    }

    if (quantity <= 0) {
      await CartItem.remove(req.userId, req.params.productKey);
      return res.json({ success: true, data: { item: null } });
    }

    const item = await CartItem.setQuantity(
      req.userId,
      req.params.productKey,
      quantity,
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Товар не найден в корзине" });
    }

    res.json({ success: true, data: { item } });
  } catch (err) {
    console.error("setQuantity error", err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};
exports.removeFromCart = async (req, res) => {
  try {
    await CartItem.remove(req.userId, req.params.productKey);
    res.json({ success: true });
  } catch (err) {
    console.error("removeFromCart error", err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await CartItem.clear(req.userId);
    res.json({ success: true });
  } catch (err) {
    console.error("clearCart error", err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};
