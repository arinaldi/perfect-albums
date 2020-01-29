export const modalReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
  case 'OPEN_CREATE':
    return {
      ...state,
      isCreateOpen: true,
    };
  case 'CLOSE_CREATE':
    return {
      ...state,
      isCreateOpen: false,
    };
  case 'OPEN_DELETE':
    return {
      ...state,
      isDeleteOpen: true,
      id: payload.id,
      artist: payload.artist,
      title: payload.title,
    };
  case 'CLOSE_DELETE':
    return {
      ...state,
      isDeleteOpen: false,
      id: '',
      artist: '',
      title: '',
    };
  default:
    return state;
  }
};

export const modalInitialState = {
  isCreateOpen: false,
  isDeleteOpen: false,
  id: '',
  artist: '',
  title: '',
};
