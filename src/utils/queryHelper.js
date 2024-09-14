const buildFilter = ({ genre, artist, album }) => {
  const filter = {};

  if (genre) filter.genre = genre;
  if (artist) filter.artist = artist;
  if (album) filter.album = album;

  return filter;
};

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

function buildPagination({ page = DEFAULT_PAGE, limit = DEFAULT_PAGE_SIZE }) {
  return { page, skip: (page - 1) * limit, limit };
}

module.exports = { buildFilter, buildPagination };
