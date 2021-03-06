const { handleError } = require('../helpers/exceptions');
const verifyToken = require('../helpers/middleware');

// Router
const bookmarksRouter = require('./bookmarks');
const usersRouter = require('./users');
const historiesRouter = require('./histories');
const questionsRouter = require('./questions');

// Repo
const BookmarksRepo = require('../repositories/bookmarks');
const UsersRepo = require('../repositories/users');
const HistoriesRepo = require('../repositories/histories');
const QuestionsRepo = require('../repositories/questions');

// Use case
const BookmarksUsecase = require('../use-cases/bookmarks');
const UsersUsecase = require('../use-cases/users');
const HistoryUsecase = require('../use-cases/histories');
const QuestionsUsecase = require('../use-cases/questions');

// Controller
const BookmarksController = require('../controllers/bookmarks');
const UsersController = require('../controllers/users');
const HistoriesController = require('../controllers/histories');
const QuestionsController = require('../controllers/questions');

const bookmarksRepo = new BookmarksRepo();
const usersRepo = new UsersRepo();
const historiesRepo = new HistoriesRepo();
const questionsRepo = new QuestionsRepo();

const bookmarksUsecases = new BookmarksUsecase(bookmarksRepo);
const usersUsecases = new UsersUsecase(usersRepo);
const historiesUsecase = new HistoryUsecase(historiesRepo);
const questionsUsecase = new QuestionsUsecase(questionsRepo);

const bookmarksControllers = new BookmarksController(bookmarksUsecases);
const usersControllers = new UsersController(usersUsecases);
const historiesController = new HistoriesController(historiesUsecase);
const questionsController = new QuestionsController(questionsUsecase);

module.exports = function routes(app, express) {
  app.get('/', (req, res) => {
    res.send(
      'Turu yuk <br> <a href="https://documenter.getpostman.com/view/16027759/UyxjHSHH">Turu API Docs</a>',
    );
  });

  app.use('/api/users', usersRouter(express, verifyToken, usersControllers));
  app.use('/api/bookmarks', bookmarksRouter(express, verifyToken, bookmarksControllers));
  app.use('/api/histories', historiesRouter(express, verifyToken, historiesController));
  app.use('/api/questions', questionsRouter(express, questionsController));

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    handleError(err, res);
  });
};
