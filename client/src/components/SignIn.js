import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Button, Alert } from 'react-bootstrap';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSignIn({
      username: this.state.username,
      password: this.state.password
    });
  }

  renderError() {
    return (
      <Alert bsStyle="danger">
        <strong>{this.props.error}</strong>
      </Alert>
    );
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={8} xsOffset={2}>
            {this.props.error && this.renderError()}
            <form onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup>
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  type="text"
                  name="username"
                  onChange={e => {
                    this.setState({[e.target.name]: e.target.value});
                  }}
                  value={this.state.username}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  name="password"
                  onChange={e => {
                    this.setState({[e.target.name]: e.target.value});
                  }}
                  value={this.state.password}
                />
              </FormGroup>
              <Button type="submit">
               Sign In
              </Button>
            </form>
            </Col>
        </Row>
      </Grid>
    );
  }
}

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default SignIn;
