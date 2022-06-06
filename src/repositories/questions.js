const Models = require('../models');

class QuestionsRepository {
  constructor() {
    this.QuestionsModel = Models.Questions;
  }

  async findAll(offset, limit) {
    return this.QuestionsModel
      .findAndCountAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id'],
        limit,
        offset,
        raw: true,
      })
      .then((questions) => ({
        count: questions.count,
        rows: questions.rows.map(
          (questions.rows, (question) => question.id),
        ),
      }));
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
