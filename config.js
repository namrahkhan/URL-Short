const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_DATABASE,
  APPLICATION_PORT,
  HOSTING_BASE_URL,
} = process.env;

const config = {
  port: APPLICATION_PORT,
  db_host: DB_HOST,
  db_port: DB_PORT,
  db_database: DB_DATABASE,
  db_password: DB_PASSWORD,
  db_user: DB_USER,
  BASE_URL: HOSTING_BASE_URL,
};

module.exports = config;
