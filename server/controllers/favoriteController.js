const Favorite = require("../models/Favorite");

exports.getFavorites = async (req, res) => {
  try {
    const items = await Favorite.getAllByUser(req.userId);
    res.json({ success: true, data: { items } });
  } catch (err) {
    console.error("getFavorites error", err);
    res.status(500).json({ success: false, message: "ошибка сервера" });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { productKey, product } = req.body;
    if (!productKey || !product) {
      return res.status(400).json({success:false, message:'некорректные данные'})
    }
    const item = await Favorite.add(req.userId, productKey, product); 
    res.status(201).json({success:true, data:{item}})
  } catch (err) {
    console.error('addFavorite error', err);
    res.status(500).json({success:false, message:'ошибка сервера'});
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    await Favorite.remove(req.userId, req.params.productKey);
    res.json({ success: true });
  } catch (err) {
    console.error('removeFavorite error', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};

exports.clearFavorites = async (req, res) => {
  try {
    await Favorite.clear(req.userId);
    res.json({ success: true });
  } catch (err) {
    console.error('clearFavorites error', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};
