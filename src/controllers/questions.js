const { questions: questionsMessage } = require('../helpers/response-message');

class QuestionsController {
  constructor(questionsUsecase) {
    this.questionsUsecase = questionsUsecase;
    this.createQuestion = this.createQuestion.bind(this);
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
}

module.exports = QuestionsController;
