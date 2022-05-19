const Sequelize = require('sequelize');
const db = require('../databases/mysql');

const Bookmarks = db.define(
  'Bookmarks',
  {
    text: {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: true,
  },
  {
    tableName: 'bookmarks',
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

module.exports = Bookmarks;
