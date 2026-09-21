const db = require("../config/database");

class Product {
  static async findAll({
    category,
    popular,
    search,
    sort,
    limit = 20,
    offset = 0,
  }) {
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

    const SORTS = {
      price_asc: "p.price ASC",
      price_desc: "p.price DESC",
      rating_desc: "p.rating DESC NULLS LAST",
      name_asc: "p.name ASC",
      new_desc: "p.created_at DESC",
      default: "p.id ASC",
    };
    const orderBy = SORTS[sort] || SORTS.default;

    const whereSQL = where.length ? `WHERE ${where.join(" AND ")}` : "";
    params.push(limit, offset);

    const { rows } = await db.query(
      `SELECT p.id, p.name, p.price, p.image, p.rating, p.seller,
            p.is_popular AS "isPopular",
            c.name AS category,
            COUNT(*) OVER() AS total_count
     FROM products p
     LEFT JOIN categories c ON c.id = p.category_id
     ${whereSQL}
     ORDER BY ${orderBy}
     LIMIT $${i++} OFFSET $${i++}`,
      params,
    );

    const total = rows[0]?.total_count ? Number(rows[0].total_count) : 0;
    const products = rows.map(({ total_count, ...rest }) => rest);

    return { products, total };
  }

  static async findById(id) {
    const { rows } = await db.query(
      `SELECT p.id, p.name, p.price, p.image, p.rating, p.seller,
              p.is_popular AS "isPopular",
              c.name AS category
       FROM products p
       LEFT JOIN categories c ON c.id = p.category_id
       WHERE p.id = $1`,
      [id],
    );
    return rows[0];
  }

  static async create({
    name,
    price,
    seller,
    rating,
    image,
    category_id,
    is_popular,
  }) {
    const { rows } = await db.query(
      `INSERT INTO products (name,price,image,rating,seller,category_id,is_popular)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING ID`,
      [
        name,
        price,
        image,
        rating ?? 0,
        seller,
        category_id,
        is_popular ?? false,
      ],
    );
    return this.findById(rows[0].id);
  }
}

module.exports = Product;
