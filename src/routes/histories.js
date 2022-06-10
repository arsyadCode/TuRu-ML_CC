module.exports = function historiesRouter(express, verifyToken, historiesController) {
  const router = express.Router();

  router.get('/', historiesController.getAllHistories);
  router.get('/:id', verifyToken, historiesController.getHistoryById);
  router.get('/users/:id', verifyToken, historiesController.getHistoriesByUserId);
  router.post('/', verifyToken, historiesController.createHistory);
  router.delete('/:id', verifyToken, historiesController.deleteHistoryById);

  return router;
};
