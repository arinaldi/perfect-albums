import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Row, Col, Alert } from 'react-bootstrap';
import SignUp from './SignUp';

class SignUpSignIn extends Component {
  renderError() {
    return (
      <div className="alert-container">
        <Alert bsClass="alert" bsStyle="danger">{this.props.error}</Alert>
      </div>
    );
  }

  render() {
    return (
      <Row>
        <Col xs={8} xsOffset={2}>
          {this.props.error && this.renderError()}
          <Tabs defaultActiveKey={1} id="signup-signin-tabs">
            <Tab eventKey={1} title="Sign Up">
              <SignUp onSignUp={this.props.onSignUp}/>
            </Tab>
            <Tab eventKey={2} title="Sign In">
              Sign In
            </Tab>
          </Tabs>
        </Col>
      </Row>
    );
  }
}

SignUpSignIn.propTypes = {
  error: PropTypes.string,
  onSignUp: PropTypes.func.isRequired
};

export default SignUpSignIn;
