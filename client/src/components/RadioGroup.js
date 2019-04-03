import React from 'react';
import {
  Col,
  Form,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const RadioGroup = ({
  controlId,
  label,
  name,
  value,
  onChange,
}) => (
  <Form.Row>
    <Form.Group as={Col} controlId={controlId}>
      <div>
        <Form.Label>{label}</Form.Label>
      </div>
      <div>
        <ToggleButtonGroup
          type='radio'
          name={name}
          value={value}
          onChange={onChange}
        >
          <ToggleButton
            variant='outline-dark'
            value={false}
          >
            false
          </ToggleButton>
          <ToggleButton
            variant='outline-dark'
            value={true}
          >
            true
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </Form.Group>
  </Form.Row>
);

RadioGroup.propTypes = {
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RadioGroup;
