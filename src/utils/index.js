const removeDupes = (array) => [...new Set(array)];

const formatArtists = (data) => {
  const results = data.map(item => item.artist);

  return removeDupes(results);
};

const isValidDate = (string) => {
  const date = new Date(string);

  return !isNaN(date.getTime());
};

const sortByAlbum = (a, b) => {
  if (a.artist < b.artist) return -1;
  if (a.artist > b.artist) return 1;
  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
  if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
  return 0;
};

module.exports = {
  formatArtists,
  isValidDate,
  sortByAlbum,
};
