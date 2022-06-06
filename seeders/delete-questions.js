const QuestionsRepository = require('../src/repositories/questions');

const questionsRepository = new QuestionsRepository();
questionsRepository.deleteBatch();
