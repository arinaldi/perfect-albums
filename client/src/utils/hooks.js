import { useEffect, useReducer, useState } from 'react';

import Api from '../utils/api';
import { dataReducer, dataInitialState } from '../reducers/data';
import { STATE_EVENTS, STATE_STATUSES } from '../constants';

export const useStateMachine = (path) => {
  const [state, dispatch] = useReducer(dataReducer, dataInitialState);
  const { status } = state;

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

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
