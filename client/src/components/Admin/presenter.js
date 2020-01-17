import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';

import { ALERT_TYPES, MESSAGES, PER_PAGE } from '../../constants';

import AdminTable from '../AdminTable/presenter';
import AppMessage from '../AppMessage/presenter';

const Admin = (props) => {
  const {
    searchText,
    total,
    data,
    currentPage,
    perPage,
    searchInput,
    handleChange,
    clearInput,
    handleFirst,
    handleLast,
    handlePrev,
    handleNext,
    handlePageChange,
  } = props;
  const history = useHistory();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === Math.ceil(total / perPage);

  useEffect(() => {
    searchInput.current.focus();
  }, [searchInput]);

  const PerPageSelector = (
    <ButtonGroup
      aria-label='Change per page'
      style={{
        alignSelf: 'flex-start',
        marginLeft: '10px',
        marginRight: '10px',
      }}
    >
      {PER_PAGE.map((page, index) => (
        <Button
          key={index}
          onClick={() => handlePageChange(page)}
          variant={page === perPage ? 'dark' : 'outline-dark'}
          disabled={page === perPage}
        >
          {page}
        </Button>
      ))}
    </ButtonGroup>
  );

  const PaginationBar = (
    <Row className='justify-content-center'>
      <Pagination style={{ marginLeft: '10px', marginRight: '10px' }}>
        <Pagination.First
          onClick={handleFirst}
          disabled={isFirstPage}
        />
        <Pagination.Prev
          onClick={handlePrev}
          disabled={isFirstPage}
        />
        <Pagination.Item disabled>{currentPage}</Pagination.Item>
        <Pagination.Next
          onClick={handleNext}
          disabled={isLastPage}
        />
        <Pagination.Last
          onClick={handleLast}
          disabled={isLastPage}
        />
      </Pagination>
      {PerPageSelector}
    </Row>
  );

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
          {PaginationBar}
          {data.length
            ? (
              <AdminTable
                data={data}
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
  data: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  searchInput: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired,
  handleFirst: PropTypes.func.isRequired,
  handleLast: PropTypes.func.isRequired,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Admin;
