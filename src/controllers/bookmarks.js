const { bookmarks: bookmarksMessage } = require('../helpers/response-message');

class BookmarksController {
  constructor(bookmarksUsecase) {
    this.bookmarksUsecase = bookmarksUsecase;
    this.getAllBookmarks = this.getAllBookmarks.bind(this);
    this.getBookmarkById = this.getBookmarkById.bind(this);
    this.getBookmarksByUserId = this.getBookmarksByUserId.bind(this);
    this.createBookmark = this.createBookmark.bind(this);
    this.deleteBookmarkById = this.deleteBookmarkById.bind(this);
  }

  async getAllBookmarks(req, res, next) {
    return this.bookmarksUsecase
      .getAllBookmarks(req)
      .then((bookmarks) => res.status(200).json(bookmarks))
      .catch((error) => next(error));
  }

  async getBookmarkById(req, res, next) {
    return this.bookmarksUsecase
      .getBookmarkById(req)
      .then((bookmark) => res.json(bookmark))
      .catch((error) => next(error));
  }

  async getBookmarksByUserId(req, res, next) {
    return this.bookmarksUsecase
      .getBookmarksByUserId(req)
      .then((bookmark) => res.json(bookmark))
      .catch((error) => next(error));
  }

  async createBookmark(req, res, next) {
    return this.bookmarksUsecase
      .createBookmark(req)
      .then((bookmark) => res.status(201).json({
        message: bookmarksMessage.create,
        data: bookmark,
      }))
      .catch((error) => next(error));
  }

  async deleteBookmarkById(req, res, next) {
    return this.bookmarksUsecase
      .deleteBookmarkById(req)
      .then(() => res.json({
        message: bookmarksMessage.delete,
      }))
      .catch((error) => next(error));
  }
}

module.exports = BookmarksController;
