import React, { useState, createContext } from 'react';

import { ALERT_TIMEOUT } from '../constants';
import { setToken, getToken, removeToken } from '../utils/storage';

const MyContext = createContext();
const MyConsumer = MyContext.Consumer;

const MyProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [alert, setAlert] = useState({
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
      setAlert({
        isOpen: false,
        type: '',
        message: '',
      });
    }, ALERT_TIMEOUT);
  };

  return (
    <MyContext.Provider value={{
      state: { isAuthenticated, alert },
      signIn: handleSignIn,
      signOut: handleSignOut,
      showAlert,
    }}>
      {props.children}
    </MyContext.Provider>
  );
}

export { MyContext, MyConsumer };
export default MyProvider;
