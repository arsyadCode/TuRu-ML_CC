module.exports = function questionsRouter(express, questionsController) {
  const router = express.Router();

  router.post('/', questionsController.createQuestion);

  return router;
};
