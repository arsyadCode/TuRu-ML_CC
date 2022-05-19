module.exports = function bookmarksRouter(express, bookmarksController) {
  const router = express.Router();

  router.get('/', bookmarksController.getAllBookmarks);
  router.get('/:id', bookmarksController.getBookmarkById);
  router.post('/', bookmarksController.createBookmark);
  router.delete('/:id', bookmarksController.deleteBookmarkById);

  return router;
};
