const { NotFoundError } = require('../helpers/exceptions');
const { getPagination } = require('../helpers/paging');
const { bookmarks: bookmarksMessage } = require('../helpers/response-message');
const { getImageFromLetter } = require('../helpers/sign-language-images');

class BookmarksUsecase {
  constructor(BookmarksRepo) {
    this.bookmarksRepo = BookmarksRepo;
  }

  async getAllBookmarks(req) {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const ids = await this.bookmarksRepo.findAll(offset, limit);
    return this.resolveBookmarks(ids.rows);
  }

  async getBookmarkById(req) {
    return this.resolveBookmark(req.params.id)
      .then((bookmark) => {
        if (!bookmark) throw new NotFoundError(bookmarksMessage.notFound);

        return bookmark;
      });
  }

  async createBookmark(req) {
    return this.bookmarksRepo
      .create(req.body)
      .then((bookmark) => bookmark);
  }

  async deleteBookmarkById(req) {
    await this.bookmarksRepo
      .findById(req.params.id)
      .then((bookmark) => {
        if (!bookmark) throw new NotFoundError(bookmarksMessage.notFound);

        return this.bookmarksRepo.deleteById(req.params.id);
      });
  }

  async resolveBookmarks(ids) {
    const bookmarks = [];
    await Promise.all(
      ids.map(async (id) => {
        await this.resolveBookmark(id).then((bookmark) => {
          bookmarks.push(bookmark);
        });
      }),
    );

    return bookmarks;
  }

  async resolveBookmark(id) {
    return this.bookmarksRepo
      .findById(id)
      .then(async (bookmark) => {
        // eslint-disable-next-line no-param-reassign
        bookmark.images = [];
        for (let i = 0; i < bookmark.text.length; i += 1) {
          // eslint-disable-next-line no-param-reassign
          bookmark.images.push(getImageFromLetter(bookmark.text[i]));
        }
        return bookmark;
      });
  }
}

module.exports = BookmarksUsecase;
