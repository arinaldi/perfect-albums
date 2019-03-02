const sortByAlbum = (a, b) => {
  if (a.artist < b.artist) return -1;
  if (a.artist > b.artist) return 1;
  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
  if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
  return 0;
};

export const formatData = (data) => (
  data
    .sort(sortByAlbum)
    .slice(0, 50)
);

export const filterData = (data, query) => (
  data.filter((item) => (
    item.artist.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
    item.title.toLowerCase().indexOf(query.toLowerCase()) >= 0
  ))
);

export const isMobileDevice = () => {
  const { userAgent } = navigator;

  if (userAgent.match(/Android/i) ||
    userAgent.match(/webOS/i) ||
    userAgent.match(/iPhone/i) ||
    userAgent.match(/iPod/i) ||
    userAgent.match(/BlackBerry/i) ||
    userAgent.match(/Windows Phone/i) ||
    userAgent.match(/SymbianOS/i) ||
    userAgent.match(/RIM/i) ||
    userAgent.match(/BB/i)
  ) {
    return true;
  }

  return false;
};

export const getQuery = (query) => decodeURI(query.substring(1));
