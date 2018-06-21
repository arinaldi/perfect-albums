export function loadInsta() {
  return function (dispatch) {
    fetch('/instagram')
    .then( (response) => {
      return response.json();
    }).then((res) => {
      dispatch(instaLoaded(res.data));
    });
  };
}

function instaLoaded(data) {
  return {
    type: 'INSTA_LOADED',
    value: data
  };
}

export function loadAlbums() {
  return function (dispatch) {
    fetch('/albums')
    .then( (response) => {
      return response.json();
    }).then((items) => {
      dispatch(albumsLoaded(items));
    });
  };
}

function albumsLoaded(items) {
  return {
    type: 'ALBUMS_LOADED',
    value: items
  };
}

export function getAlbum(id) {
  return function (dispatch) {
    fetch(`/albums/${id}`)
      .then(res => res.json())
      .then((item) => {
        dispatch(getAlbumDone(item));
      });
  };
}

function getAlbumDone(item) {
  return {
    type: 'GET_ALBUM_DONE',
    value: item
  };
}

export function createAlbum(item) {
  return function (dispatch) {
    fetch('/albums', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item)
    }).then(() => dispatch(loadAlbums()));
  };
}

export function editAlbum(id, item) {
  return function (dispatch) {
    fetch(`/albums/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item)
    }).then(() => dispatch(loadAlbums()));
  };
}

export function deleteAlbum(id) {
  return function (dispatch) {
    fetch(`/albums/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    }).then(() => dispatch(loadAlbums()));
  };
}
