import { useContext, useState } from 'react';

import { MESSAGES, TOAST_TYPES } from '../constants';
import { Context } from '../components/Provider';

const useSubmit = (options) => {
  const {
    apiFunc,
    callbacks,
    data,
    path,
    successMessage,
  } = options;
  const { signOut, showToast } = useContext(Context);
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

        callbacks.forEach(cb => {
          cb();
        });

        showToast({
          type: TOAST_TYPES.SUCCESS,
          message: successMessage,
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

export default useSubmit;
