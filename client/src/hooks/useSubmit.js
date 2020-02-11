import { useState } from 'react';

import {
  DISPATCH_TYPES,
  MESSAGES,
  TOAST_TYPES,
} from '../constants';
import { useAppDispatch } from '../components/Provider';

const useSubmit = (options) => {
  const {
    apiFunc,
    callbacks,
    data,
    path,
    successMessage,
  } = options;
  const dispatch = useAppDispatch();
  const [isValidated, setIsValidated] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      setIsSaving(true);

      try {
        await apiFunc(path, { data, dispatch });
        setIsSaving(false);

        callbacks.forEach(cb => {
          cb();
        });

        dispatch({
          payload: {
            message: successMessage,
            type: TOAST_TYPES.SUCCESS,
          },
          type: DISPATCH_TYPES.OPEN_TOAST,
        });
      } catch (err) {
        if (err.message !== MESSAGES.UNAUTHORIZED) {
          setIsSaving(false);
          dispatch({
            payload: {
              message: err.message || MESSAGES.ERROR,
              type: TOAST_TYPES.ERROR,
            },
            type: DISPATCH_TYPES.OPEN_TOAST,
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

export default useSubmit;