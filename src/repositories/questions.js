const Models = require('../models');

class QuestionsRepository {
  constructor() {
    this.QuestionsModel = Models.Questions;
  }

  async create(question) {
    return this.QuestionsModel
      .create(question)
      .then((result) => result);
  }
}

module.exports = QuestionsRepository;
