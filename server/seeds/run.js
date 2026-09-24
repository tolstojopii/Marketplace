const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seed() {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8')
  );

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    
    const categoryMap = {}; 
    for (const cat of data.categories) {
      const { rows } = await client.query(
        `INSERT INTO categories (name, slug)
         VALUES ($1, $2)
         ON CONFLICT (name) DO UPDATE SET slug = EXCLUDED.slug
         RETURNING id`,
        [cat.name, cat.slug]
      );
      categoryMap[cat.name] = rows[0].id;
    }

    
    await client.query(
      `INSERT INTO categories (name, slug) VALUES ('Популярное', 'popular')
       ON CONFLICT (name) DO NOTHING`
    );
    const { rows: popRows } = await client.query(
      `SELECT id FROM categories WHERE name = 'Популярное'`
    );
    categoryMap['Популярное'] = popRows[0].id;

    
    

    for (const p of data.products) {
      await client.query(
        `INSERT INTO products (name, price, image, rating, seller, category_id, is_popular)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          p.name,
          p.price,
          p.image,
          p.rating ?? 0,
          p.seller,
          categoryMap[p.category] || null,
          p.isPopular === true,
        ]
      );
    }

    await client.query('COMMIT');
    console.log(`Загружено: ${data.products.length} товаров, ${data.categories.length + 1} категорий`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed упал:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();