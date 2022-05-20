require('dotenv').config();

const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DBMS_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

module.exports = db;
