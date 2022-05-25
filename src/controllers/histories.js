/* eslint-disable linebreak-style */
const { histories: historiesMessage } = require('../helpers/response-message');

class HistoriesController {
  constructor(historiesUsecase) {
    this.historiesUsecase = historiesUsecase;
    this.getAllHistories = this.getAllHistories.bind(this);
    this.getHistoryById = this.getHistoryById.bind(this);
    this.getHistoriesByUserId = this.getHistoriesByUserId.bind(this);
    this.createHistory = this.createHistory.bind(this);
    this.deleteHistoryById = this.deleteHistoryById.bind(this);
  }

  async getAllHistories(req, res, next) {
    return this.historiesUsecase
      .getAllHistories(req)
      .then((histories) => res.status(200).json(histories))
      .catch((error) => next(error));
  }

  async getHistoryById(req, res, next) {
    return this.historiesUsecase
      .getHistoryById(req)
      .then((history) => res.json(history))
      .catch((error) => next(error));
  }

  async getHistoriesByUserId(req, res, next) {
    return this.historiesUsecase
      .getHistoriesByUserId(req)
      .then((history) => res.json(history))
      .catch((error) => next(error));
  }

  async createHistory(req, res, next) {
    return this.historiesUsecase
      .createHistory(req)
      .then((history) => res.status(201).json({
        message: historiesMessage.create,
        data: history,
      }))
      .catch((error) => next(error));
  }

  async deleteHistoryById(req, res, next) {
    return this.historiesUsecase
      .deleteHistoryById(req)
      .then(() => res.json({
        message: historiesMessage.delete,
      }))
      .catch((error) => next(error));
  }
}

module.exports = HistoriesController;
