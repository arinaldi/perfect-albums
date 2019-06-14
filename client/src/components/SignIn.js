import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

import SubmitButton from './SubmitButton';

const SignIn = ({
  username,
  password,
  isSubmitting,
  handleChange,
  handleSubmit,
}) => (
  <Container>
    <h3>Sign In</h3>
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId='formUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            name='username'
            autoComplete='username'
            value={username}
            onChange={handleChange}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            autoComplete='current-password'
            value={password}
            onChange={handleChange}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <SubmitButton
            isDisabled={!(username && password) || isSubmitting}
            isLoading={isSubmitting}
            text='Submit'
            loadingText='Submitting...'
          />
        </Form.Group>
      </Form.Row>
    </Form>
  </Container>
);

SignIn.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

SignIn.defaultProps = {
  isSubmitting: false,
};

export default SignIn;
