module.exports = function questionsRouter(express, questionsController) {
  const router = express.Router();

  router.get('/', questionsController.getAllQuestions);
  router.get('/random', questionsController.getRandomQuestions);
  router.get('/:id', questionsController.getQuestionById);
  router.post('/', questionsController.createQuestion);
  router.put('/:id', questionsController.updateQuestion);
  router.delete('/:id', questionsController.deleteQuestionById);

  return router;
};
