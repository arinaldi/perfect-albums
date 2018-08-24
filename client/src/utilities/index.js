export const localStorageTest = () => {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch (error) {
    return false;
  }
};

export const getHistory = () => {
  const history = localStorage.getItem('perfectAlbums');
  
  if (history) {
    return JSON.parse(history);
  }
  localStorage.setItem('perfectAlbums', '');
  
  return [];
};

export const saveToHistory = (newAlbum) => {
  const currentHistory = getHistory();
  const newHistory = [...currentHistory];

  newHistory.push(newAlbum);
  localStorage.setItem('perfectAlbums', JSON.stringify(newHistory));
};

export const removeFromHistory = (index) => {
  const currentHistory = getHistory();
  let newHistory = [...currentHistory];

  newHistory = [
    ...newHistory.slice(0, index),
    ...newHistory.slice(index + 1)
  ];
  localStorage.setItem('perfectAlbums', JSON.stringify(newHistory));
};

const sortByAlbum = (a, b) => {
  if (a.artist < b.artist) return -1;
  if (a.artist > b.artist) return 1;
  if (a.album.toLowerCase() < b.album.toLowerCase()) return -1;
  if (a.album.toLowerCase() > b.album.toLowerCase()) return 1;
  return 0;
};

export const formatData = (data) => (
  data
    .sort(sortByAlbum)
    .slice(0, 50)
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
