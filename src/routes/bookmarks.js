module.exports = function bookmarksRouter(express, verifyToken, bookmarksController) {
  const router = express.Router();

  router.get('/', verifyToken, bookmarksController.getAllBookmarks);
  router.get('/:id', verifyToken, bookmarksController.getBookmarkById);
  router.post('/', verifyToken, bookmarksController.createBookmark);
  router.delete('/:id', verifyToken, bookmarksController.deleteBookmarkById);

  return router;
};
