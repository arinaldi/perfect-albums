import React, { Component, createContext } from 'react';

import { ALERT_TIMEOUT } from '../constants';
import { setToken, getToken, removeToken } from '../utils/storage';

const MyContext = createContext();
const MyConsumer = MyContext.Consumer;

class MyProvider extends Component {
  state = {
    isAuthenticated: !!getToken(),
    alert: {
      isOpen: false,
      type: '',
      message: '',
    },
  };

  handleSignIn = (token) => {
    setToken(token);
    this.setState({ isAuthenticated: true });
  }

  handleSignOut = () => {
    removeToken();
    this.setState({ isAuthenticated: false });
  }

  showAlert = (type, message) => {
    this.setState({ alert: {
      isOpen: true,
      type,
      message,
    }});
    this.hideAlert();
  }

  hideAlert = () => {
    setTimeout(() => {
      this.setState({ alert: {
        isOpen: false,
        type: '',
        message: '',
      }});
    }, ALERT_TIMEOUT);
  }

  render () {
    return (
      <MyContext.Provider value={{
        state: this.state,
        signIn: this.handleSignIn,
        signOut: this.handleSignOut,
        showAlert: this.showAlert,
      }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export { MyContext, MyConsumer };
export default MyProvider;
