const sortByAlbum = (a, b) => {
  if (a.artist < b.artist) return -1;
  if (a.artist > b.artist) return 1;
  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
  if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
  return 0;
};

module.exports = { sortByAlbum };
