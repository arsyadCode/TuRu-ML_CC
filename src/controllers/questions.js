const { questions: questionsMessage } = require('../helpers/response-message');

class QuestionsController {
  constructor(questionsUsecase) {
    this.questionsUsecase = questionsUsecase;
    this.createQuestion = this.createQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
  }

  async createQuestion(req, res, next) {
    return this.questionsUsecase
      .createQuestion(req)
      .then((question) => res.status(201).json({
        message: questionsMessage.create,
        data: question,
      }))
      .catch((error) => next(error));
  }

  async updateQuestion(req, res, next) {
    return this.questionsUsecase
      .updateQuestion(req)
      .then((question) => res.json({
        message: questionsMessage.update,
        data: question,
      }))
      .catch((error) => next(error));
  }
}

module.exports = QuestionsController;
