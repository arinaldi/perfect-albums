import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Form,
  Container,
  Row,
} from 'react-bootstrap';

import AdminTable from './AdminTable';
import AdminCard from './AdminCard';
import { isMobileDevice } from '../utils';

const Admin = ({
  history,
  filteredData,
  searchText,
  handleChange,
  clearInput,
}) => (
  <Container>
    <Row>
      <Col xs={12}>
        <h3>Admin</h3>
        <Form>
          <Form.Group controlId='formBasicText'>
            <Form.Control
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
              onClick={() => history.push('/new')}
              style={{ marginTop: 5 }}
            >
              New
            </Button>
          </Form.Group>
        </Form>
        {isMobileDevice()
          ? <AdminCard history={history} data={filteredData} />
          : <AdminTable data={filteredData} />}
      </Col>
    </Row>
  </Container>
);

Admin.propTypes = {
  history: PropTypes.object.isRequired,
  filteredData: PropTypes.array.isRequired,
  searchText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired,
};

export default Admin;
