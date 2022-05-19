const Models = require('../models');

class BookmarsRepository {
  constructor() {
    this.BookmarksModel = Models.Bookmarks;
  }

  async findAll(offset, limit) {
    return this.BookmarksModel
      .findAndCountAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id'],
        limit,
        offset,
        raw: true,
      })
      .then((bookmarks) => ({
        count: bookmarks.count,
        rows: bookmarks.rows.map(
          (bookmarks.rows, (bookmark) => bookmark.id),
        ),
      }));
  }

  async findById(id) {
    return this.BookmarksModel
      .findOne({
        where: { id: parseInt(id, 10) },
        raw: true,
      })
      .then((bookmark) => bookmark);
  }

  async create(bookmark) {
    return this.BookmarksModel
      .create(bookmark)
      .then((result) => result);
  }

  async deleteById(id) {
    return this.BookmarksModel
      .destroy({
        where: {
          id: parseInt(id, 10),
        },
      })
      .then((result) => result);
  }
}

module.exports = BookmarsRepository;
