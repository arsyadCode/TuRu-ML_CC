const Sequelize = require('sequelize');
const db = require('../databases/mysql');

const Histories = db.define(
  'Histories',
  {
    text: {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: true,
  },
  {
    tableName: 'histories',
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

module.exports = Histories;
