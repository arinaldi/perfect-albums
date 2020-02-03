import { useEffect, useReducer } from 'react';

import Api from '../utils/api';
import { dataReducer, dataInitialState } from '../reducers/data';
import {
  STATE_EVENTS,
  STATE_STATUSES,
} from '../constants';

const useStateMachine = (path) => {
  const [state, dispatch] = useReducer(dataReducer, dataInitialState);
  const { status } = state;

  useEffect(() => {
    dispatch({ type: STATE_EVENTS.FETCH });
  }, []);

  useEffect(() => {
    if (status === STATE_STATUSES.LOADING) {
      let isCanceled = false;

      Api.get(path)
        .then(res => res.json())
        .then(data => {
          if (isCanceled) return;
          dispatch({ type: STATE_EVENTS.RESOLVE, data });
        })
        .catch(error => {
          if (isCanceled) return;
          dispatch({ type: STATE_EVENTS.REJECT, error });
        });

      return () => {
        isCanceled = true;
      };
    }
  }, [path, status]);

  return [state, dispatch];
};

export default useStateMachine;
