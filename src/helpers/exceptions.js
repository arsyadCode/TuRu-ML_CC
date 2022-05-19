// eslint-disable-next-line max-classes-per-file
class ClientError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

class InvariantError extends ClientError {
  constructor(message) {
    super(400, message);
    this.name = 'InvariantError';
  }
}

class AuthenticationError extends ClientError {
  constructor(message) {
    super(401, message);
    this.name = 'AuthenticationError';
  }
}

class AuthorizationError extends ClientError {
  constructor(message) {
    super(403, message);
    this.name = 'AuthorizationError';
  }
}

class NotFoundError extends ClientError {
  constructor(message) {
    super(404, message);
    this.name = 'NotFoundError';
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;

  if (err instanceof ClientError) {
    res.status(statusCode).json({
      message,
    });
  } else {
    // server error
    res.status(500).json({
      message: 'internal server error',
    });
  }
};

module.exports = {
  ClientError,
  InvariantError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  handleError,
};
