import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Api from '../../utils/api';
import { setToken, getToken, removeToken } from '../../utils/storage';

const Context = createContext();

const Provider = (props) => {
  const { children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({
    isOpen: false,
    type: '',
    message: '',
  });
  const [modal, setModal] = useState({
    isOpen: false,
    type: '',
    data: null,
    callback: null,
  });

  useEffect(() => {
    const checkUser = async () => {
      const token = getToken();

      if (token) {
        try {
          const res = await Api.get('/api/auth', true);
          const isUserValid = res.status === 200;
          setIsAuthenticated(isUserValid);

          if (!isUserValid) {
            removeToken();
          }
        } catch (err) {
          removeToken();
        }
      }

      setIsLoading(false);
    };

    checkUser();
  }, []);

  const handleSignIn = (token) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  const showToast = ({ type, message }) => {
    setToast({
      isOpen: true,
      type,
      message,
    });
  };

  const closeToast = () => {
    setToast({
      ...toast,
      isOpen: false,
    });
  };

  const openModal = ({ type, data, callback }) => {
    setModal({
      isOpen: true,
      type,
      data,
      callback,
    });
  };

  const closeModal = () => {
    setModal({
      ...modal,
      isOpen: false,
    });
  };

  return (
    <Context.Provider value={{
      state: { isAuthenticated, isLoading, modal, toast },
      signIn: handleSignIn,
      signOut: handleSignOut,
      showToast,
      closeToast,
      openModal,
      closeModal,
    }}
    >
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Context };
export default Provider;
