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
