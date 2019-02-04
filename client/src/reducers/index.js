import { combineReducers } from 'redux';

const albums = (state = [], action) => {
  if (action.type === 'ALBUMS_LOADED') {
    return action.value;
  }
  return state;
};

const album = (state = {}, action) => {
  if (action.type === 'GET_ALBUM_DONE') {
    return action.value;
  }
  return state;
};

const alert = (state = { isOpen: false, type: 'success', message: '' }, action) => {
  if (['SHOW_ALERT', 'HIDE_ALERT'].includes(action.type)) {
    return action.value;
  }
  return state;
};

const status = (state = { isFetching: false, isError: false }, action) => {
  switch (action.type) {
    case 'START_FETCH':
      return {
        isFetching: true,
        isError: false
      };
    case 'END_FETCH':
      return {
        isFetching: false,
        isError: false
      };
    case 'SHOW_ERROR':
      return {
        isFetching: false,
        isError: true
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  albums,
  album,
  alert,
  status
});

export default rootReducer;
