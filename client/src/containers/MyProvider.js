import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import { setToken, getToken, removeToken } from '../utils/storage';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [toast, setToast] = useState({
    isOpen: false,
    type: '',
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

  return (
    <MyContext.Provider value={{
      state: { isAuthenticated, toast },
      signIn: handleSignIn,
      signOut: handleSignOut,
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
