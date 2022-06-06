const Joi = require('joi');
const { InvariantError, NotFoundError } = require('../helpers/exceptions');
const { questions: questionsMessage } = require('../helpers/response-message');

class QuestionsUsecase {
  constructor(QuestionsRepo) {
    this.questionsRepo = QuestionsRepo;
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
}

module.exports = QuestionsUsecase;
