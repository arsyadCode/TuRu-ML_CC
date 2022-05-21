const { NotFoundError, AuthorizationError } = require('../helpers/exceptions');
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

  async getBookmarksByUserId(req) {
    const { userId: credentialsId } = req.user;
    const { id: userId } = req.params;

    // eslint-disable-next-line eqeqeq
    if (userId != credentialsId) throw new AuthorizationError(bookmarksMessage.forbidden);
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);
    const ids = await this.bookmarksRepo.findByUserId(offset, limit, userId);
    const result = [];
    ids.rows = ids.rows.forEach((element) => {
      result.push(element.id);
    });

    return this.resolveBookmarks(result);
  }

  async createBookmark(req) {
    const { userId } = req.user;
    req.body.userId = userId;
    return this.bookmarksRepo
      .create(req.body)
      .then((bookmark) => bookmark);
  }

  async deleteBookmarkById(req) {
    const { userId } = req.user;
    await this.bookmarksRepo
      .findById(req.params.id)
      .then((bookmark) => {
        if (!bookmark) throw new NotFoundError(bookmarksMessage.notFound);

        if (userId !== bookmark.userId) throw new AuthorizationError(bookmarksMessage.forbidden);

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
        if (bookmark) {
          bookmark.images = [];
          for (let i = 0; i < bookmark.text.length; i += 1) {
            bookmark.images.push(getImageFromLetter(bookmark.text[i]));
          }
        }

        return bookmark;
      });
  }
}

module.exports = BookmarksUsecase;
