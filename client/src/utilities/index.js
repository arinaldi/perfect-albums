export function localStorageTest() {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch (error) {
    return false;
  }
}

export function getHistory() {
  const history = localStorage.getItem('perfectAlbums');
  if (history) {
    return JSON.parse(history);
  }
  localStorage.setItem('perfectAlbums', '');
  return [];
}

export function saveToHistory(newAlbum) {
  const currentHistory = getHistory();
  const newHistory = [...currentHistory];

  newHistory.push(newAlbum);

  localStorage.setItem('perfectAlbums', JSON.stringify(newHistory));
}

export function removeFromHistory(index) {
  const currentHistory = getHistory();
  let newHistory = [...currentHistory];

  newHistory = [
    ...newHistory.slice(0, index),
    ...newHistory.slice(index + 1)
  ];

  localStorage.setItem('perfectAlbums', JSON.stringify(newHistory));
}
