import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Alert
} from 'react-bootstrap';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { clearError, error } = this.props;
    const { name, value } = e.target;

    this.setState({ [name]: value });
    if (error) {
      clearError();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;

    this.props.onSignIn({
      username,
      password
    });
  }

  renderError() {
    return (
      <div className="alert-container">
        <Alert bsClass="alert" bsStyle="danger">{this.props.error}</Alert>
      </div>
    );
  }

  render() {
    const { username, password } = this.state;

    return (
      <Grid>
        <Row>
          <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3} lg={4} lgOffset={4}>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  type="text"
                  name="username"
                  onChange={this.handleChange}
                  value={username}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  value={password}
                />
              </FormGroup>
              <Button
                type="submit"
                disabled={!(username && password)}
              >
               Sign In
              </Button>
            </form>
            { this.props.error && this.renderError() }
          </Col>
        </Row>
      </Grid>
    );
  }
}

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default SignIn;
