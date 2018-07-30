import React, { Component } from 'react';
import Layout from './components/Layout';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
      authenticated: localStorage.getItem('token') || false
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    this.props.loadInsta();
    this.props.loadAlbums();
  }

  handleSignIn(credentials) {
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
      }).then((res) => {
        if (res.status === 401) {
          return this.setState({
            error: 'Invalid username or password'
          });
        }
        return res.json();
      }).then((data) => {
        const { token } = data;
        localStorage.setItem('token', token);
        this.setState({
          error: '',
          authenticated: token
        });
      });
    }
  }

  handleSignOut() {
    localStorage.removeItem('token');
    this.setState({
      authenticated: false
    });
  }

  render() {
    return (
      <div>
        <Layout
          onSignIn={this.handleSignIn}
          onSignOut={this.handleSignOut}
          error={this.state.error}
          showAuthItems={this.state.authenticated}
        />
      </div>
    );
  }

}

export default App;
