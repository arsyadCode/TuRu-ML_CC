const Users = require('./users');
const Bookmarks = require('./bookmarks');
const Histories = require('./histories');

Bookmarks.belongsTo(Users, { as: 'user' });
Histories.belongsTo(Users, { as: 'user' });

const Models = {};
Models.Users = Users;
Models.Bookmarks = Bookmarks;
Models.Histories = Histories;

module.exports = Models;
