import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import { ALERT_TIMEOUT } from '../constants';
import { setToken, getToken, removeToken } from '../utils/storage';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [alert, setAlert] = useState({
    isOpen: false,
    type: '',
    message: '',
  });
  const [toast, setToast] = useState({
    isOpen: false,
    message: '',
  });

  const handleSignIn = (token) => {
    setToken(token);
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  const showAlert = (type, message) => {
    setAlert({
      isOpen: true,
      type,
      message,
    });
    hideAlert();
  };

  const hideAlert = () => {
    setTimeout(() => {
      setAlert({ isOpen: false });
    }, ALERT_TIMEOUT);
  };

  const showToast = (message) => {
    setToast({
      isOpen: true,
      message,
    });
  };

  const closeToast = () => {
    setToast({
      ...toast,
      isOpen: false,
    });
  };

  return (
    <MyContext.Provider value={{
      state: { isAuthenticated, alert, toast },
      signIn: handleSignIn,
      signOut: handleSignOut,
      showAlert,
      showToast,
      closeToast,
    }}>
      {children}
    </MyContext.Provider>
  );
};

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MyContext };
export default MyProvider;
