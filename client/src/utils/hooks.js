import {
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import Api from '../utils/api';
import { dataReducer, dataInitialState } from '../reducers/data';
import {
  MESSAGES,
  STATE_EVENTS,
  STATE_STATUSES,
  TOAST_TYPES,
} from '../constants';
import { Context } from '../components/Provider';

export const useStateMachine = (path) => {
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

export const useSubmit = (options) => {
  const {
    action,
    apiFunc,
    data,
    path,
    query,
  } = options;
  const { signOut, showToast } = useContext(Context);
  const history = useHistory();
  const [isValidated, setIsValidated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      setIsSaving(true);

      try {
        await apiFunc(path, { data, signOut, showToast });
        setIsSaving(false);
        history.push(`/admin?${query}`);
        showToast({
          type: TOAST_TYPES.SUCCESS,
          message: `${MESSAGES.ALBUM_PREFIX} ${action}`,
        });
      } catch (err) {
        if (err.message !== MESSAGES.UNAUTHORIZED) {
          setIsSaving(false);
          showToast({
            type: TOAST_TYPES.ERROR,
            message: err.message || MESSAGES.ERROR,
          });
        }
      }
    } else {
      setIsValidated(true);
    }
  };

  return {
    handleSubmit,
    isSaving,
    isValidated,
  };
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
