const Joi = require('joi');
const { InvariantError, NotFoundError } = require('../helpers/exceptions');
const { questions: questionsMessage } = require('../helpers/response-message');
const { getPagination } = require('../helpers/paging');

class QuestionsUsecase {
  constructor(QuestionsRepo) {
    this.questionsRepo = QuestionsRepo;
  }

  async getAllQuestions(req) {
    const schema = Joi.object().keys({
      page: Joi.number(),
      size: Joi.number(),
    });
    await schema.validateAsync(req.query).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const ids = await this.questionsRepo.findAll(offset, size);
    return this.resolveQuestions(ids.rows);
  }

  async getRandomQuestions(req) {
    const schema = Joi.object().keys({
      page: Joi.number(),
      size: Joi.number(),
    });
    await schema.validateAsync(req.query).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const ids = await this.questionsRepo.findAll(offset, limit);
    return this.resolveQuestions(ids.rows.sort(() => 0.5 - Math.random()));
  }

  async createQuestion(req) {
    const schema = Joi.object().keys({
      text: Joi.string(),
      image: Joi.string(),
      first_choice: Joi.string(),
      second_choice: Joi.string(),
      third_choice: Joi.string(),
      fourth_choice: Joi.string(),
      correct_answer: Joi.string(),
    });
    await schema.validateAsync(req.body).catch((joiError) => {
      throw new InvariantError(joiError.details.map((x) => x.message));
    });
    return this.questionsRepo
      .create(req.body)
      .then((questions) => questions);
  }

  async updateQuestion(req) {
    await this.questionsRepo
      .findById(req.params.id)
      .then((question) => {
        if (!question) throw new NotFoundError(questionsMessage.notFound);

        return this.questionsRepo.update(req.params.id, req.body);
      });
  }

  async resolveQuestions(ids) {
    const questions = [];
    await Promise.all(
      ids.map(async (id) => {
        await this.resolveQuestion(id).then((question) => {
          questions.push(question);
        });
      }),
    );

    return questions;
  }

  async resolveQuestion(id) {
    return this.questionsRepo
      .findById(id)
      .then(async (question) => question);
  }
}

module.exports = QuestionsUsecase;
