import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Form,
  Container,
  Row,
} from 'react-bootstrap';

import AdminTable from './AdminTable';
import AppMessage from './AppMessage';

import { ALERT_TYPES, MESSAGES } from '../constants';

class Admin extends Component {
  componentDidMount () {
    this.props.searchInput.current.focus();
  }

  render () {
    const {
      history,
      searchText,
      filteredData,
      searchInput,
      handleChange,
      clearInput,
    } = this.props;

    return (
      <Container>
        <Row>
          <Col xs={12}>
            <h3>Admin</h3>
            <Form>
              <Form.Group controlId='formSearch'>
                <Form.Control
                  ref={searchInput}
                  type='text'
                  value={searchText}
                  placeholder='Search'
                  onChange={handleChange}
                />
                <Button
                  variant='outline-dark'
                  onClick={clearInput}
                  style={{ marginTop: 5, marginRight: 5 }}
                >
                  Clear
                </Button>
                <Button
                  variant='outline-dark'
                  onClick={() => history.push(`/new?${searchText}`)}
                  style={{ marginTop: 5 }}
                >
                  New
                </Button>
              </Form.Group>
            </Form>
            {filteredData.length
              ? <AdminTable
                history={history}
                data={filteredData}
                searchText={searchText}
                />
              : <AppMessage
                type={ALERT_TYPES.INFO}
                message={MESSAGES.NO_DATA}
                />}
          </Col>
        </Row>
      </Container>
    );
  }
}

Admin.propTypes = {
  history: PropTypes.object.isRequired,
  searchText: PropTypes.string.isRequired,
  filteredData: PropTypes.array.isRequired,
  searchInput: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired,
};

export default Admin;
