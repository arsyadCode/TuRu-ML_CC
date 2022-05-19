const getPagination = (page, size) => {
  let limit = size < 0 || size > 20 ? 20 : size;
  if (!limit) {
    limit = 20;
  }

  let offset = (page - 1) * limit;
  if (!offset) {
    offset = 0;
  }

  return { limit, offset };
};

const getPagingData = (datarows, page, limit) => {
  const { count: itemCount, rows: data } = datarows;
  const currentPage = page ? +page : 0;
  const pageCount = Math.ceil(itemCount / limit);

  return {
    itemCount, data, pageCount, currentPage,
  };
};

module.exports = {
  getPagination,
  getPagingData,
};
