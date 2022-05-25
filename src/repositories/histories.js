/* eslint-disable linebreak-style */
const Sequelize = require('sequelize');
const Models = require('../models');

const { Op } = Sequelize;

class HistoriesRepository {
  constructor() {
    this.HistoriesModel = Models.Histories;
  }

  async findAll(offset, limit) {
    return this.HistoriesModel
      .findAndCountAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id'],
        limit,
        offset,
        raw: true,
      })
      .then((histories) => ({
        count: histories.count,
        rows: histories.rows.map(
          (histories.rows, (history) => history.id),
        ),
      }));
  }

  async findById(id) {
    return this.HistoriesModel
      .findOne({
        where: { id: parseInt(id, 10) },
        raw: true,
      })
      .then((history) => history);
  }

  async findByUserId(offset, limit, userId, textQuery) {
    const query = textQuery ? {
      userId,
      text: {
        [Op.iLike]: `%${textQuery}%`,
      },
    } : { userId };

    return this.HistoriesModel
      .findAndCountAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id'],
        where: query,
        limit,
        offset,
        raw: true,
      })
      .then((history) => history);
  }

  async create(history) {
    return this.HistoriesModel
      .create(history)
      .then((result) => result);
  }

  async deleteById(id) {
    return this.HistoriesModel
      .destroy({
        where: {
          id: parseInt(id, 10),
        },
      })
      .then((result) => result);
  }
}

module.exports = HistoriesRepository;
