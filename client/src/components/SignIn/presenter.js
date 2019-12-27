import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

import SubmitButton from '../SubmitButton/presenter';

const SignIn = ({
  username,
  password,
  isSubmitting,
  handleChange,
  handleSubmit,
}) => (
  <Container>
    <h3>Sign In</h3>
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId='formUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                autoComplete='username'
                autoCapitalize='off'
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
      </Col>
    </Row>
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
