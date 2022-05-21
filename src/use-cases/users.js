const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { NotFoundError, AuthenticationError } = require('../helpers/exceptions');
const { getPagination } = require('../helpers/paging');
const { users: usersMessage } = require('../helpers/response-message');

class UsersUsecase {
  constructor(UsersRepo) {
    this.usersRepo = UsersRepo;
  }

  async getAllUsers(req) {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const ids = await this.usersRepo.findAll(offset, limit);
    return this.resolveUsers(ids.rows);
  }

  async getUserById(id) {
    return this.resolveUser(id)
      .then((user) => {
        if (!user) throw new NotFoundError(usersMessage.notFound);

        return user;
      });
  }

  async createUser(req) {
    const isEmailExist = await this.usersRepo.findByEmail(req.body.email);

    if (isEmailExist) throw new NotFoundError(usersMessage.emailExist);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    return this.usersRepo
      .create(req.body)
      .then(async (user) => user);
  }

  async resolveUsers(ids) {
    const users = [];
    await Promise.all(
      ids.map(async (id) => {
        await this.resolveUser(id).then((user) => {
          users.push(user);
        });
      }),
    );

    return users;
  }

  async resolveUser(id) {
    return this.usersRepo
      .findById(id)
      .then(async (user) => {
        const { password, token, ...result } = user;
        return result;
      });
  }

  async login(req) {
    const user = await this.usersRepo.findByEmail(req.body.email);

    if (!user) throw new AuthenticationError(usersMessage.invalidCredential);

    const isPasswordValid = await bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) throw new AuthenticationError(usersMessage.invalidCredential);

    const token = await this.getNewToken(user.id);

    return { token };
  }

  async getNewToken(userId) {
    const newToken = await this.constructor.getToken(userId);
    await this.saveToken(newToken, userId);
    return newToken;
  }

  static async getToken(userId) {
    return jwt.sign({ userId }, process.env.TOKEN_KEY, { expiresIn: '2h' });
  }

  async saveToken(token, userId) {
    return this.usersRepo.update(userId, { token });
  }
}

module.exports = UsersUsecase;
