import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { ALERT_TYPES, MESSAGES } from '../constants';

import AdminTable from './AdminTable';
import AppMessage from './AppMessage';

const Admin = ({
  history,
  searchText,
  total,
  filteredData,
  searchInput,
  handleChange,
  clearInput,
}) => {
  useEffect(() => {
    searchInput.current.focus();
  }, [searchInput]);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Row>
            <Col>
              <h3>Admin</h3>
            </Col>
            <Col xs='auto'>
              <h3>
                <Badge variant='light'>{total.toLocaleString()}</Badge>
              </h3>
            </Col>
          </Row>
          <Form>
            <Form.Group as={Row} controlId='formSearch'>
              <Col>
                <Row>
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
                  <Col xs='auto'>
                    <h3>
                      <Badge variant='light'>{filteredData.length}</Badge>
                    </h3>
                  </Col>
                </Row>
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
  total: PropTypes.number.isRequired,
  filteredData: PropTypes.array.isRequired,
  searchInput: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired,
};

export default Admin;
