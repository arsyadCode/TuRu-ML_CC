const { handleError } = require('../helpers/exceptions');

// eslint-disable-next-line no-unused-vars
module.exports = function routes(app, express) {
  app.get('/', (req, res) => {
    res.send('Turu yuk');
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    handleError(err, res);
  });
};
