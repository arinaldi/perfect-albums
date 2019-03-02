import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import AppMessage from './AppMessage';

class SignIn extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = (e) => {
    const { clearError, error } = this.props;
    const { name, value } = e.target;

    this.setState({ [name]: value });
    if (error) {
      clearError();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { signIn } = this.props;
    const { username, password } = this.state;

    signIn({ username, password });
  }

  render () {
    const { error } = this.props;
    const { username, password } = this.state;

    return (
      <Container>
        <h3>Sign In</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId='formUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                value={username}
                onChange={this.handleChange}
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
                onChange={this.handleChange}
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
            {error && <AppMessage message={error} />}
          </Col>
        </Row>
      </Container>
    );
  }
}

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  error: PropTypes.string,
};

SignIn.defaultProps = {
  error: '',
};

export default SignIn;
