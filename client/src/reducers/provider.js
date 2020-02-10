import { getToken } from '../utils/storage';
import { DISPATCH_TYPES } from '../constants';

export const providerInitialState = {
  modal: {
    isOpen: false,
    message: '',
    type: '',
  },
  toast: {
    callback: null,
    data: null,
    isOpen: false,
    type: '',
  },
  user: {
    isAuthenticated: Boolean(getToken()),
  },
};

export const providerReducer = (state, action) => {
  switch (action.type) {
  case DISPATCH_TYPES.SET_USER:
    return {
      ...state,
      user: { isAuthenticated: action.payload },
    };
  case DISPATCH_TYPES.OPEN_TOAST:
    return {
      ...state,
      toast: {
        isOpen: true,
        message: action.payload.message,
        type: action.payload.type,
      },
    };
  case DISPATCH_TYPES.CLOSE_TOAST:
    return {
      ...state,
      toast: {
        ...state.toast,
        isOpen: false,
      },
    };
  case DISPATCH_TYPES.OPEN_MODAL:
    return {
      ...state,
      modal: {
        callback: action.payload.callback,
        data: action.payload.data,
        isOpen: true,
        type: action.payload.type,
      },
    };
  case DISPATCH_TYPES.CLOSE_MODAL:
    return {
      ...state,
      modal: {
        ...state.modal,
        isOpen: false,
      },
    };
  default:
    return state;
  }
};
