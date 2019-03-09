import React, { Component, createContext } from 'react';

import { ALERT_TIMEOUT } from '../constants';
import Api from '../utils/api';
import { setToken, getToken, removeToken } from '../utils/storage';

const MyContext = createContext();
const MyConsumer = MyContext.Consumer;

class MyProvider extends Component {
  state = {
    error: '',
    isAuthenticated: !!getToken(),
    alert: {
      isOpen: false,
      type: '',
      message: '',
    },
  };

  handleSignIn = (credentials) => {
    const { username, password } = credentials;
    if (!username.trim() || !password.trim() ) {
      this.setState({
        error: 'Must provide all fields'
      });
    } else {
      Api.post('/api/signin', credentials)
        .then(res => {
          if (res.status === 401) {
            return this.setState({
              error: 'Invalid username or password',
            });
          }
          return res.json();
        })
        .then(data => {
          if (data) {
            setToken(data.token);
            this.setState({
              error: '',
              isAuthenticated: true,
            });
          }
        });
    }
  }

  handleSignOut = () => {
    removeToken();
    this.setState({
      isAuthenticated: false
    });
  }

  clearError = () => {
    this.setState({ error: '' });
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
        clearError: this.clearError,
        showAlert: this.showAlert,
      }}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export { MyConsumer };
export default MyProvider;
