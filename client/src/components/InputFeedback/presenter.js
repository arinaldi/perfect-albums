import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const InputFeedback = ({
  controlId,
  label,
  name,
  value,
  onChange,
  type,
  isRequired,
}) => (
  <Form.Row>
    <Form.Group as={Col} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={isRequired}
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
  type: PropTypes.string,
  isRequired: PropTypes.bool,
};

InputFeedback.defaultProps = {
  type: 'text',
  isRequired: true,
};

export default InputFeedback;
