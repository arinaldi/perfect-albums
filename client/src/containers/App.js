import React, { Component } from 'react';

import Routes from './Routes';
import '../styles.css';
import { ALERT_TIMEOUT } from '../constants';

class App extends Component {
  state = {
    error: '',
    authenticated: localStorage.getItem('token') || false,
    alert: {
      isOpen: false,
      type: '',
      message: '',
    }
  };

  handleSignIn = (credentials) => {
    const { username, password } = credentials;
    if (!username.trim() || !password.trim() ) {
      this.setState({
        error: 'Must provide all fields'
      });
    } else {
      fetch('/api/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
      }).then(res => {
        if (res.status === 401) {
          return this.setState({
            error: 'Invalid username or password'
          });
        }
        return res.json();
      }).then(data => {
        if (data) {
          const { token } = data;
          localStorage.setItem('token', token);
          this.setState({
            error: '',
            authenticated: token
          });
        }
      });
    }
  }

  handleSignOut = () => {
    localStorage.removeItem('token');
    this.setState({
      authenticated: false
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
    const { error, authenticated, alert } = this.state;

    return (
      <Routes
        onSignIn={this.handleSignIn}
        onSignOut={this.handleSignOut}
        clearError={this.clearError}
        error={error}
        showAuthItems={authenticated}
        alert={alert}
        showAlert={this.showAlert}
      />
    );
  }

}

export default App;
