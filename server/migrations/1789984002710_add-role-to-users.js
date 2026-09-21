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
  pgm.addColumn('users',{
    role:{
      type: 'varchar(20)',
      notNull:true,
      default:'user',
    }
  })
    pgm.addConstraint('users', 'users_role_check', {
    check: "role IN ('user', 'admin')",
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropConstraint('users', 'users_role_check');
  pgm.dropColumn('users','role')
};
