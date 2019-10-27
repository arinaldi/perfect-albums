import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { ALERT_TYPES, MESSAGES } from '../../constants';

import AdminTable from '../AdminTable/presenter';
import AppMessage from '../AppMessage/presenter';

const Admin = ({
  searchText,
  total,
  filteredData,
  searchInput,
  handleChange,
  clearInput,
}) => {
  const history = useHistory();

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
          <Form onSubmit={e => e.preventDefault()}>
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
            ? (
              <AdminTable
                data={filteredData}
                searchText={searchText}
              />
            )
            : (
              <AppMessage
                type={ALERT_TYPES.INFO}
                message={MESSAGES.NO_DATA}
              />
            )}
        </Col>
      </Row>
    </Container>
  );
};

Admin.propTypes = {
  searchText: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  filteredData: PropTypes.array.isRequired,
  searchInput: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired,
};

export default Admin;
