import { combineReducers } from 'redux';

function posts(state = [], action) {
  if (action.type === 'INSTA_LOADED') {
    return action.value;
  }
  return state;
}

function albums(state = [], action) {
  if (action.type === 'ALBUMS_LOADED') {
    return action.value;
  }
  return state;
}

function album(state = {}, action) {
  if (action.type === 'GET_ALBUM_DONE') {
    return action.value;
  }
  return state;
}

function alert(state = { isOpen: false, type: 'success', message: '' }, action) {
  if (action.type === 'SHOW_ALERT') {
    const { isOpen, type, message } = action.value; 
    return { isOpen, type, message };
  }

  if (action.type === 'HIDE_ALERT') {
    const { isOpen, type, message } = action.value; 
    return { isOpen, type, message };
  }

  return state;
}

function status(state = { isFetching: false, isError: false }, action) {
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
}

const rootReducer = combineReducers({
  posts,
  albums,
  album,
  alert,
  status
});

export default rootReducer;
