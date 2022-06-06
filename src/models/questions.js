const Sequelize = require('sequelize');
const db = require('../databases/index');

const Questions = db.define(
  'Questions',
  {
    text: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    first_choice: {
      type: Sequelize.STRING,
    },
    second_choice: {
      type: Sequelize.STRING,
    },
    third_choice: {
      type: Sequelize.STRING,
    },
    fourth_choice: {
      type: Sequelize.STRING,
    },
    correct_answer: {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: true,
  },
  {
    tableName: 'questions',
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

module.exports = Questions;
