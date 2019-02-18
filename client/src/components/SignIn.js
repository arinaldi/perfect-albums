import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

import ErrorMessage from './ErrorMessage';

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
    const { username, password } = this.state;

    this.props.onSignIn({
      username,
      password
    });
  }

  render() {
    const { error } = this.props;
    const { username, password } = this.state;

    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs="12" sm="9" md="6">
            <form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                  value={username}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  value={password}
                />
              </Form.Group>
              <Button
                variant="outline-dark"
                type="submit"
                disabled={!(username && password)}
              >
               Sign In
              </Button>
            </form>
            {error && <ErrorMessage message={error} />}
          </Col>
        </Row>
      </Container>
    );
  }
}

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default SignIn;
