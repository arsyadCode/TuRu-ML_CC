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

  async findById(id) {
    return this.QuestionsModel
      .findOne({
        where: { id: parseInt(id, 10) },
        raw: true,
      })
      .then((question) => question);
  }

  async update(id, question) {
    return this.QuestionsModel
      .update(question, {
        where: {
          id,
        },
      })
      .then((result) => result);
  }
}

module.exports = QuestionsRepository;
