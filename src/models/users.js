const Sequelize = require('sequelize');
const db = require('../databases/mysql');

const Users = db.define(
  'Users',
  {
    name: Sequelize.STRING(50),
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING(),
    },
  },
  {
    tableName: 'users',
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
    ],
  },
);

module.exports = Users;
