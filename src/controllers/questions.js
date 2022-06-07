const { questions: questionsMessage, questions } = require('../helpers/response-message');

class QuestionsController {
  constructor(questionsUsecase) {
    this.questionsUsecase = questionsUsecase;
    this.getAllQuestions = this.getAllQuestions.bind(this);
    this.getQuestionById = this.getQuestionById.bind(this);
    this.getRandomQuestions = this.getRandomQuestions.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.deleteQuestionById = this.deleteQuestionById.bind(this);
  }

  async getAllQuestions(req, res, next) {
    return this.questionsUsecase
      .getAllQuestions(req)
      .then((questions) => res.status(200).json(questions))
      .catch((error) => next(error));
  }

  async getQuestionById(req, res, next) {
    return this.questionsUsecase
      .getQuestionById(req.params.id)
      .then((question) => res.json(question))
      .catch((error) => next(error));
  }

  async getRandomQuestions(req, res, next) {
    return this.questionsUsecase
      .getRandomQuestions(req)
      .then((questions) => res.status(200).json(questions))
      .catch((error) => next(error));
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

  async deleteQuestionById(req, res, next) {
    return this.questionsUsecase
      .deleteQuestionById(req)
      .then(() => res.json({
        message: questionsMessage.delete,
      }))
      .catch((error) => next(error));
  }
}

module.exports = QuestionsController;
