const Sequelize = require('sequelize');
const db = require('../databases/index');

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
