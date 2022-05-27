const { users: usersMessage } = require('../helpers/response-message');

class UsersController {
  constructor(usersUsecase) {
    this.usersUsecase = usersUsecase;
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.login = this.login.bind(this);
    this.deleteUserById = this.deleteUserById.bind(this);
  }

  async getAllUsers(req, res, next) {
    return this.usersUsecase
      .getAllUsers(req)
      .then((users) => res.status(200).json(users))
      .catch((error) => next(error));
  }

  async getUserById(req, res, next) {
    return this.usersUsecase
      .getUserById(req.params.id)
      .then((user) => res.json(user))
      .catch((error) => next(error));
  }

  async createUser(req, res, next) {
    return this.usersUsecase
      .createUser(req)
      .then((user) => res.status(201).json({
        message: usersMessage.create,
        data: user,
      }))
      .catch((error) => next(error));
  }

  async login(req, res, next) {
    return this.usersUsecase
      .login(req)
      .then((result) => res.json({
        message: usersMessage.loginSuccess,
        data: result,
      }))
      .catch((error) => next(error));
  }

  async deleteUserById(req, res, next) {
    return this.usersUsecase
      .deleteUserById(req)
      .then(() => res.json({
        message: usersMessage.delete,
      }))
      .catch((error) => next(error));
  }
}

module.exports = UsersController;
