export const sortByAlbum = (a, b) => {
  if (a.artist < b.artist) return -1;
  if (a.artist > b.artist) return 1;
  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
  if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
  return 0;
};

export const sortDesc = (a, b) => b - a;

export const formatData = (data) => (
  data
    .sort(sortByAlbum)
    .slice(0, 50)
);

export const filterData = (data, query) => (
  data.filter(item => (
    item.artist.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
    item.title.toLowerCase().indexOf(query.toLowerCase()) >= 0
  ))
);

export const getQuery = (query) => decodeURI(query.substring(1));
