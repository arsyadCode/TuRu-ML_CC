const { handleError } = require('../helpers/exceptions');

// Router
const bookmarksRouter = require('./bookmarks');

// Repo
const BookmarksRepo = require('../repositories/bookmarks');

// Use case
const BookmarksUsecase = require('../use-cases/bookmarks');

// Controller
const BookmarksController = require('../controllers/bookmarks');

const bookmarksRepo = new BookmarksRepo();

const bookmarksUsecases = new BookmarksUsecase(bookmarksRepo);

const bookmarksControllers = new BookmarksController(bookmarksUsecases);

module.exports = function routes(app, express) {
  app.get('/', (req, res) => {
    res.send('Turu yuk');
  });

  app.use('/api/bookmarks', bookmarksRouter(express, bookmarksControllers));

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    handleError(err, res);
  });
};
