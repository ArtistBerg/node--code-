const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

// query validation
function getPagination(query) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT; //  0 is unlimited
  const skip = (page - 1) * limit;
  return {
    skip,
    limit,
  };
}

module.exports = getPagination;
