const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('./exceptions');
const { users: usersMessage } = require('./response-message');

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;

  if (!token) {
    throw new AuthenticationError(usersMessage.tokenRequired);
  }

  const bearer = token.split(' ');
  const bearerToken = bearer[1];

  try {
    const decoded = jwt.verify(bearerToken, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    throw new AuthenticationError(usersMessage.invalidToken);
  }

  return next();
};

module.exports = verifyToken;
