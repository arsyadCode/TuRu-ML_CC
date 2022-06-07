module.exports = function questionsRouter(express, questionsController) {
  const router = express.Router();

  router.get('/', questionsController.getAllQuestions);
  router.get('/:id', questionsController.getQuestionById);
  router.get('/random', questionsController.getRandomQuestions);
  router.post('/', questionsController.createQuestion);
  router.put('/:id', questionsController.updateQuestion);

  return router;
};
