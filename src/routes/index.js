const { handleError } = require('../helpers/exceptions');

// Router
const bookmarksRouter = require('./bookmarks');
const usersRouter = require('./users');

// Repo
const BookmarksRepo = require('../repositories/bookmarks');
const UsersRepo = require('../repositories/users');

// Use case
const BookmarksUsecase = require('../use-cases/bookmarks');
const UsersUsecase = require('../use-cases/users');

// Controller
const BookmarksController = require('../controllers/bookmarks');
const UsersController = require('../controllers/users');

const bookmarksRepo = new BookmarksRepo();
const usersRepo = new UsersRepo();

const bookmarksUsecases = new BookmarksUsecase(bookmarksRepo);
const usersUsecases = new UsersUsecase(usersRepo);

const bookmarksControllers = new BookmarksController(bookmarksUsecases);
const usersControllers = new UsersController(usersUsecases);

module.exports = function routes(app, express) {
  app.get('/', (req, res) => {
    res.send(
      'Turu yuk <br> <a href="https://documenter.getpostman.com/view/16027759/UyxjHSHH">Turu API Docs</a>',
    );
  });

  app.use('/api/users', usersRouter(express, usersControllers));
  app.use('/api/bookmarks', bookmarksRouter(express, bookmarksControllers));

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    handleError(err, res);
  });
};
