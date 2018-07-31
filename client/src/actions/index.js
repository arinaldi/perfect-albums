const ALERT_TIMEOUT = 2000;
const ERROR_GENERIC = 'Something went wrong';
const ALBUM_PREFIX = 'Album successfully';

function startFetch() {
  return {
    type: 'START_FETCH'
  };
}

function endFetch() {
  return {
    type: 'END_FETCH'
  };
}

function showError() {
  return {
    type: 'SHOW_ERROR'
  };
}

export function loadInsta() {
  return function (dispatch) {
    dispatch(startFetch());
    fetch('/instagram')
    .then(res => res.json())
    .then(res => {
      dispatch(instaLoaded(res.data));
      dispatch(endFetch());
    })
    .catch(() => {
      dispatch(showError());
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
    dispatch(startFetch());
    fetch('/albums')
    .then(res => res.json())
    .then((items) => {
      dispatch(albumsLoaded(items));
      dispatch(endFetch());
    })
    .catch(() => {
      dispatch(showError());
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
    dispatch(startFetch());
    fetch(`/albums/${id}`)
      .then(res => res.json())
      .then(item => {
        dispatch(getAlbumDone(item));
        dispatch(endFetch());
      })
      .catch(() => {
        dispatch(showError());
      });
  };
}

function getAlbumDone(item) {
  return {
    type: 'GET_ALBUM_DONE',
    value: item
  };
}

function showAlert(type, message) {
  return {
    type: 'SHOW_ALERT',
    value: {
      isOpen: true,
      type,
      message
    }
  };
}

function hideAlert() {
  return {
    type: 'HIDE_ALERT',
    value: {
      isOpen: false,
      type: 'success',
      message: ''
    }
  };
}

export function createAlbum(item) {
  return function (dispatch) {
    fetch('/albums', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item)
    })
    .then(() => {
      dispatch(loadAlbums());
      dispatch(showAlert('success', `${ALBUM_PREFIX} created`));
      setTimeout(() => {
        dispatch(hideAlert());
      }, ALERT_TIMEOUT);
    })
    .catch(() => {
      setTimeout(() => {
        dispatch(hideAlert());
      }, ALERT_TIMEOUT);
    });
  };
}

export function editAlbum(id, item) {
  return function (dispatch) {
    fetch(`/albums/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item)
    })
    .then(() => {
      dispatch(loadAlbums());
      dispatch(showAlert('success', `${ALBUM_PREFIX} edited`));
      setTimeout(() => {
        dispatch(hideAlert());
      }, ALERT_TIMEOUT);
    })
    .catch(() => {
      dispatch(showAlert('danger', ERROR_GENERIC));
      setTimeout(() => {
        dispatch(hideAlert());
      }, ALERT_TIMEOUT);
    });
  };
}

export function deleteAlbum(id) {
  return function (dispatch) {
    fetch(`/albums/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .then(() => {
      dispatch(loadAlbums());
      dispatch(showAlert('success', `${ALBUM_PREFIX} deleted`));
      setTimeout(() => {
        dispatch(hideAlert());
      }, ALERT_TIMEOUT);
    })
    .catch(() => {
      setTimeout(() => {
        dispatch(hideAlert());
      }, ALERT_TIMEOUT);
    });
  };
}
