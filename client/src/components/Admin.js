import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Form,
  Container,
  Row,
} from 'react-bootstrap';

import { ALERT_TYPES, MESSAGES } from '../constants';

import AdminTable from './AdminTable';
import AppMessage from './AppMessage';

const Admin = ({
  history,
  searchText,
  filteredData,
  searchInput,
  handleChange,
  clearInput,
}) => {
  useEffect(() => {
    searchInput.current.focus();
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h3>Admin</h3>
          <Form>
            <Form.Group as={Row} controlId='formSearch'>
              <Col>
                <Form.Control
                  ref={searchInput}
                  type='text'
                  value={searchText}
                  placeholder='Search'
                  onChange={handleChange}
                  style={{ marginBottom: 5 }}
                />
              </Col>
              <Col sm={12} md='auto'>
                <Button
                  variant='outline-dark'
                  onClick={clearInput}
                  style={{ marginRight: 5 }}
                >
                  Clear
                </Button>
                <Button
                  variant='outline-dark'
                  onClick={() => history.push(`/new?${searchText}`)}
                >
                  New
                </Button>
              </Col>
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
};

Admin.propTypes = {
  history: PropTypes.object.isRequired,
  searchText: PropTypes.string.isRequired,
  filteredData: PropTypes.array.isRequired,
  searchInput: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired,
};

export default Admin;
