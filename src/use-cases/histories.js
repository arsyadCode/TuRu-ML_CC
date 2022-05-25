/* eslint-disable linebreak-style */
const { NotFoundError, AuthorizationError } = require('../helpers/exceptions');
const { getPagination } = require('../helpers/paging');
const { histories: historiesMessage } = require('../helpers/response-message');
const { getImageFromLetter } = require('../helpers/sign-language-images');

class HistoryUsecase {
  constructor(HistoriesRepository) {
    this.historiesRepo = HistoriesRepository;
  }

  async getAllHistories(req) {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const ids = await this.historiesRepo.findAll(offset, limit);
    return this.resolveHistories(ids.rows);
  }

  async getHistoryById(req) {
    const { userId } = req.user;

    return this.resolveHistory(req.params.id)
      .then((history) => {
        if (!history) throw new NotFoundError(historiesMessage.notFound);
        if (userId !== history.userId) throw new AuthorizationError(historiesMessage.forbidden);

        return history;
      });
  }

  async getHistoriesByUserId(req) {
    const { userId: credentialsId } = req.user;
    const { id: userId } = req.params;
    const { query } = req.query;

    // eslint-disable-next-line eqeqeq
    if (userId != credentialsId) throw new AuthorizationError(historiesMessage.forbidden);
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);
    const ids = await this.historiesRepo.findByUserId(offset, limit, userId, query);
    const result = [];
    ids.rows = ids.rows.forEach((element) => {
      result.push(element.id);
    });

    return this.resolveHistories(result);
  }

  async createHistory(req) {
    const { userId } = req.user;
    req.body.userId = userId;

    return this.historiesRepo
      .create(req.body)
      .then((history) => history);
  }

  async deleteHistoryById(req) {
    const { userId } = req.user;
    await this.historiesRepo
      .findById(req.params.id)
      .then((history) => {
        if (!history) throw new NotFoundError(historiesMessage.notFound);

        if (userId !== history.userId) throw new AuthorizationError(historiesMessage.forbidden);

        return this.historiesRepo.deleteById(req.params.id);
      });
  }

  async resolveHistories(ids) {
    const histories = [];
    await Promise.all(
      ids.map(async (id) => {
        await this.resolveHistory(id).then((history) => {
          histories.push(history);
        });
      }),
    );

    return histories;
  }

  async resolveHistory(id) {
    return this.historiesRepo
      .findById(id)
      .then(async (history) => {
        if (history) {
          history.images = [];
          for (let i = 0; i < history.text.length; i += 1) {
            history.images.push(getImageFromLetter(history.text[i]));
          }
        }

        return history;
      });
  }
}

module.exports = HistoryUsecase;
