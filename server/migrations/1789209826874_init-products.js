/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('categories', {
    id: 'id',
    name: {type: 'text', notNull: true, unique: true},
    slug: {type: 'text', notNull: true, unique: true},
    created_at: {type: 'timestamptz', default: pgm.func('NOW()') },
  })

  pgm.createTable('products', {
    id: 'id',
    name: { type: 'text', notNull: true },
    price: { type: 'integer', notNull: true },
    image: { type: 'text', notNull: true },
    rating: { type: 'numeric(2,1)', default: 0 },
    seller: { type: 'text', notNull: true },
    category_id: {
      type: 'integer',
      references: 'categories',
      onDelete: 'SET NULL',
    },
    is_popular: { type: 'boolean', default: false },
    created_at: { type: 'timestamptz', default: pgm.func('NOW()') },
  });

  pgm.createIndex('products', 'category_id');
  pgm.createIndex('products', 'is_popular', {
    where: 'is_popular = true',
    name: 'idx_products_popular',
  });
  pgm.createIndex('products', 'name');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('products')
  pgm.dropTable('categories')
};
