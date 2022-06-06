const Users = require('./users');
const Bookmarks = require('./bookmarks');
const Histories = require('./histories');
const Questions = require('./questions');

Bookmarks.belongsTo(Users, { as: 'user' });
Histories.belongsTo(Users, { as: 'user' });

const Models = {};
Models.Users = Users;
Models.Bookmarks = Bookmarks;
Models.Histories = Histories;
Models.Questions = Questions;

module.exports = Models;
