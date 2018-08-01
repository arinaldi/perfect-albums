const ALERT_TIMEOUT = 2000;
const ERROR_GENERIC = 'Something went wrong';
const ALBUM_PREFIX = 'Album successfully';

const startFetch = () => ({
  type: 'START_FETCH'
});

const endFetch = () => ({
  type: 'END_FETCH'
});

const showError = () => ({
  type: 'SHOW_ERROR'
});

const instaLoaded = (data) => ({
  type: 'INSTA_LOADED',
  value: data
});

const albumsLoaded = (items) => ({
  type: 'ALBUMS_LOADED',
  value: items
});

const getAlbumDone = (item) => ({
  type: 'GET_ALBUM_DONE',
  value: item
});

const showAlert = (type, message) => ({
  type: 'SHOW_ALERT',
  value: {
    isOpen: true,
    type,
    message
  }
});

const hideAlert = () => ({
  type: 'HIDE_ALERT',
  value: {
    isOpen: false,
    type: 'success',
    message: ''
  }
});

export const loadInsta = () => (
  (dispatch) => {
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
  }
);

export const loadAlbums = () => (
  (dispatch) => {
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
  }
);

export const getAlbum = (id) => (
  (dispatch) => {
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
  }
);

export const createAlbum = (item) => (
  (dispatch) => {
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
  }
);

export const editAlbum = (id, item) => (
  (dispatch) => {
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
  }
);

export const deleteAlbum = (id) => (
  (dispatch) => {
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
  }
);
