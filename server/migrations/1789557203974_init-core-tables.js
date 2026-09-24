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

  pgm.sql(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(128) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);


  pgm.sql(`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'update_at'
      ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'updated_at'
      ) THEN
        ALTER TABLE users RENAME COLUMN update_at TO updated_at;
      END IF;
    END $$;
  `);

  
  pgm.sql(`
    ALTER TABLE users
      ALTER COLUMN created_at TYPE TIMESTAMPTZ USING created_at AT TIME ZONE 'UTC',
      ALTER COLUMN updated_at TYPE TIMESTAMPTZ USING updated_at AT TIME ZONE 'UTC';
  `);

  
  pgm.sql(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'users_email_unique'
      ) THEN
        ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE (email);
      END IF;
    END $$;
  `);

  
  pgm.sql(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product_key TEXT NOT NULL,
      product_data JSONB NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  pgm.sql(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'cart_items_user_product_unique'
      ) THEN
        ALTER TABLE cart_items
          ADD CONSTRAINT cart_items_user_product_unique UNIQUE (user_id, product_key);
      END IF;
    END $$;
  `);

  pgm.sql(
    `CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);`,
  );


  pgm.sql(`
    CREATE TABLE IF NOT EXISTS favorites (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product_key TEXT NOT NULL,
      product_data JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  pgm.sql(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'favorites_user_product_unique'
      ) THEN
        ALTER TABLE favorites
          ADD CONSTRAINT favorites_user_product_unique UNIQUE (user_id, product_key);
      END IF;
    END $$;
  `);

  pgm.sql(
    `CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);`,
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
 
  pgm.sql(`DROP INDEX IF EXISTS idx_favorites_user_id;`);
  pgm.sql(`DROP INDEX IF EXISTS idx_cart_items_user_id;`);
  pgm.sql(
    `ALTER TABLE favorites DROP CONSTRAINT IF EXISTS favorites_user_product_unique;`,
  );
  pgm.sql(
    `ALTER TABLE cart_items DROP CONSTRAINT IF EXISTS cart_items_user_product_unique;`,
  );
  pgm.sql(`ALTER TABLE users DROP CONSTRAINT IF EXISTS users_email_unique;`);

};
