module.exports = {
  development: {
    username: process.env.PGUSER || 'conventionbot',
    password: process.env.PGPASSWORD || null,
    database: process.env.PGDB || 'convention_bot_development',
    host: process.env.PGHOST || '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.PGUSER || 'conventionbot',
    password: process.env.PGPASSWORD || null,
    database: process.env.PGDB || 'convention_bot_test',
    host: process.env.PGHOST || '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'POSTGRES_DB_URL',
    username: process.env.PGUSER || 'conventionbot',
    password: process.env.PGPASSWORD,
    database: process.env.PGDB || 'convention_bot_production',
    host: process.env.PGHOST,
    dialect: 'postgres',
    logging: false
  }
};
