import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password, confirmPassword } = this.state;

    this.props.onSignUp({
      username,
      password,
      confirmPassword
    });
  }

  render() {
    const { username, password, confirmPassword } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="email"
            name="username"
            onChange={this.handleChange}
            placeholder="Enter Username"
            value={username}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            name="password"
            onChange={this.handleChange}
            placeholder="Enter Password"
            value={password}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            name="confirmPassword"
            onChange={this.handleChange}
            placeholder="Confirm Password"
            value={confirmPassword}
          />
        </FormGroup>
        <Button
          type="submit"
          disabled={!(username && password && confirmPassword)}
        >
         Sign Up
        </Button>
      </form>
    );
  }
}

SignUp.propTypes = {
  onSignUp: PropTypes.func.isRequired
};

export default SignUp;
