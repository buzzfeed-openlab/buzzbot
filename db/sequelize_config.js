module.exports = {
  development: {
    username: process.env.PGUSER || 'buzzbot',
    password: process.env.PGPASSWORD || null,
    database: process.env.PGDB || 'buzzbot_development',
    host: process.env.PGHOST || '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.PGUSER || 'buzzbot',
    password: process.env.PGPASSWORD || null,
    database: process.env.PGDB || 'buzzbot_test',
    host: process.env.PGHOST || '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'POSTGRES_DB_URL',
    username: process.env.PGUSER || 'buzzbot',
    password: process.env.PGPASSWORD,
    database: process.env.PGDB || 'buzzbot_production',
    host: process.env.PGHOST,
    dialect: 'postgres',
    logging: false
  }
};
