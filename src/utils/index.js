const formatDate = (isoDate) => {
  const newDate = new Date(isoDate);
  const date = newDate.getUTCDate();
  const month = newDate.toLocaleDateString(
    'en-US',
    { month: 'short' },
  );
  const year = newDate.getFullYear();

  return `${date} ${month} ${year}`;
};

const sortByAlbum = (a, b) => {
  if (a.artist < b.artist) return -1;
  if (a.artist > b.artist) return 1;
  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
  if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
  return 0;
};

module.exports = { formatDate, sortByAlbum };
