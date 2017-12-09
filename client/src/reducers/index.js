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

function album(state = [], action) {
  if (action.type === 'GET_ALBUM_DONE') {
    return action.value;
  }
  return state;
}

const rootReducer = combineReducers({
  posts,
  albums,
  album
});

export default rootReducer;
