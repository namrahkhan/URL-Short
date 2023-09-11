const pg = require("pg");
const { Pool } = pg;
const {
  db_database,
  db_password,
  db_host,
  db_port,
  db_user,
} = require("../config");

const db = new Pool({
  host: db_host,
  port: db_port,
  password: db_password,
  user: db_user,
  database: db_database,
});

module.exports = db;
