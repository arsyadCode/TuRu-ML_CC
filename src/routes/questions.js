module.exports = function questionsRouter(express, questionsController) {
  const router = express.Router();

  router.post('/', questionsController.createQuestion);
  router.put('/:id', questionsController.updateQuestion);

  return router;
};
