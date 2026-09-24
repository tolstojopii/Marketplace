const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const { category, popular, search, sort, page = 1, limit = 20 } = req.query;

    const rawPage = Number(page);
    const rawLimit = Number(limit);

    const pageNum =
      Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;

    const limitNum =
      Number.isFinite(rawLimit) && rawLimit >= 1
        ? Math.min(100, Math.floor(rawLimit))
        : 20;

    const offset = (pageNum - 1) * limitNum;

    const { products, total } = await Product.findAll({
      category,
      popular: popular === "true",
      search: search?.trim() || undefined,
      sort,
      limit: limitNum,
      offset,
    });

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (err) {
    console.error("getProducts error", err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, image, rating, seller, category_id, is_popular } = req.body;

    const errors = [];
    if (!name || name.trim().length < 2) {
      errors.push('Название должно содержать минимум 2 символа');
    }
    if (!Number.isInteger(price) || price < 0) {
      errors.push('Цена должна быть целым неотрицательным числом');
    }
    if (!image || typeof image !== 'string') {
      errors.push('Картинка обязательна');
    }
    if (!seller || seller.trim().length < 2) {
      errors.push('Продавец обязателен');
    }
    if (rating !== undefined) {
      if (typeof rating !== 'number' || rating < 0 || rating > 5) {
        errors.push('Рейтинг должен быть числом от 0 до 5');
      }
    }
    if (!Number.isInteger(category_id) || category_id < 1) {
      errors.push('Категория обязательна');
    }

    if (errors.length) {
      return res.status(400).json({ success: false, errors });
    }

    const product = await Product.create({
      name: name.trim(),
      price,
      image: image.trim(),
      rating,
      seller: seller.trim(),
      category_id,
      is_popular: Boolean(is_popular),
    });

    res.status(201).json({ success: true, data: { product } });
  } catch (err) {
    console.error('createProduct error', err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Некорректный id" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Товар не найден" });
    }
    res.json({ success: true, data: { product } });
  } catch (err) {
    console.error("getProductById error", err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};
