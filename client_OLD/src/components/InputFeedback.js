import React from 'react';
import { Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const InputFeedback = ({
  controlId,
  label,
  name,
  value,
  onChange,
}) => (
  <Form.Row>
    <Form.Group as={Col} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type='text'
        name={name}
        value={value}
        onChange={onChange}
        required
      />
      <Form.Control.Feedback type='invalid'>
        Required
      </Form.Control.Feedback>
    </Form.Group>
  </Form.Row>
);

InputFeedback.propTypes = {
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default InputFeedback;
