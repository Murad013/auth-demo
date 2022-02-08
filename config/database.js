const { createPool } = require('mysql');
const mysql = require ('mysql');
const pool = createPool({
  port: process.env.DB_PORT, //default port number, if different this must change
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10
});

module.exports = pool;
