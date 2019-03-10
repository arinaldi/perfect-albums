import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import { MyContext, MyConsumer } from './MyProvider';
import SignIn from '../components/SignIn';
import AppMessage from '../components/AppMessage';

import Api from '../utils/api';

class SignInContainer extends Component {
  state = {
    username: '',
    password: '',
    error: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const { error } = this.state;

    this.setState({ [name]: value });
    if (error) {
      this.setState({ error: '' });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { signIn } = this.context;
    const { username, password } = this.state;

    if (!username.trim() || !password.trim() ) {
      this.setState({
        error: 'Must provide all fields'
      });
    } else {
      Api.post('/api/signin', { username, password })
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
            this.setState({ error: '' });
            signIn(data.token);
          }
        });
    }
  }

  render () {
    const { username, password, error } = this.state;

    return (
      <MyConsumer>
      {({ state }) => {
        if (state.isAuthenticated) {
          return <Redirect to='/admin' />
        }

        return (
          <Fragment>
            <SignIn
              username={username}
              password={password}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
            {error && (
              <Container>
                <Row className='justify-content-center'>
                  <Col xs={12} sm={9} md={6}>
                    <AppMessage message={error} />
                  </Col>
                </Row>
              </Container>
            )}
          </Fragment>
        );
      }}
      </MyConsumer>
    );
  }
}

SignInContainer.contextType = MyContext;

export default SignInContainer;
