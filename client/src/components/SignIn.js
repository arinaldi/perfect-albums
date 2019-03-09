import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

import { MyConsumer } from '../containers/MyProvider';
import AppMessage from './AppMessage';

class SignIn extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = (e, error, clearError) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
    if (error) {
      clearError();
    }
  }

  handleSubmit = (e, signIn) => {
    e.preventDefault();
    const { username, password } = this.state;

    signIn({ username, password });
  }

  render () {
    const { username, password } = this.state;

    return (
      <MyConsumer>
      {({ state, signIn, clearError }) => {
        if (state.isAuthenticated) {
          return <Redirect to='/admin' />
        }

        return (
          <Container>
            <h3>Sign In</h3>
            <Form onSubmit={e => this.handleSubmit(e, signIn)}>
              <Form.Row>
                <Form.Group as={Col} controlId='formUsername'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='text'
                    name='username'
                    value={username}
                    onChange={e => this.handleChange(e, state.error, clearError)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId='formPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    value={password}
                    onChange={e => this.handleChange(e, state.error, clearError)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Button
                    variant='outline-dark'
                    type='submit'
                    disabled={!(username && password)}
                  >
                   Sign In
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
            <Row className='justify-content-center'>
              <Col xs={12} sm={9} md={6}>
                {state.error && <AppMessage message={state.error} />}
              </Col>
            </Row>
          </Container>
        );
      }}
      </MyConsumer>
    );
  }
}

export default SignIn;
