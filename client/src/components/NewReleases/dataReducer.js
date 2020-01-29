import { STATE_EVENTS, STATE_STATUSES } from '../../constants';

export const dataReducer = (state, event) => {
  switch (event.type) {
  case STATE_EVENTS.FETCH:
    return {
      ...state,
      status: STATE_STATUSES.LOADING,
    };
  case STATE_EVENTS.RESOLVE:
    return {
      ...state,
      status: STATE_STATUSES.SUCCESS,
      data: event.data,
    };
  case STATE_EVENTS.REJECT:
    return {
      ...state,
      status: STATE_STATUSES.FAILURE,
      error: event.error,
    };
  case STATE_EVENTS.CANCEL:
    return {
      ...state,
      status: STATE_STATUSES.IDLE,
    };
  default:
    return state;
  }
};

export const dataInitialState = {
  status: STATE_STATUSES.LOADING,
  data: null,
  error: null,
};
