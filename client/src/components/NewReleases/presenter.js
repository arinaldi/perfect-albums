import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import { sortByDate } from '../../utils';
import { STATE_STATUSES } from '../../constants';
import { Context } from '../Provider';
import AppMessage from '../AppMessage/presenter';
import DateCol from './DateCol';

const NewReleases = (props) => {
  const {
    cancel,
    data,
    handleCreateOpen,
    handleDeleteOpen,
    refresh,
    status,
  } = props;
  const { state: { isAuthenticated } } = useContext(Context);
  const isLoading = status === STATE_STATUSES.LOADING;

  return (
    <Container>
      <Row>
        <Col>
          <h3>New Releases</h3>
        </Col>
        {isAuthenticated && (
          <Col xs='auto'>
            <Button
              variant='outline-dark'
              onClick={isLoading ? cancel : refresh}
              style={{ marginRight: '5px' }}
            >
              {isLoading ? 'Cancel' : 'Refresh'}
            </Button>
            <Button
              variant='outline-dark'
              onClick={handleCreateOpen}
            >
              New
            </Button>
          </Col>
        )}
      </Row>
      {status === STATE_STATUSES.FAILURE && <AppMessage />}
      {status === STATE_STATUSES.SUCCESS && (
        <Row>
          {Object.keys(data).sort(sortByDate).map(date => (
            <DateCol
              key={date}
              data={data[date]}
              date={date}
              handleDeleteOpen={handleDeleteOpen}
            />
          ))}
        </Row>
      )}
    </Container>
  );
};

NewReleases.propTypes = {
  cancel: PropTypes.func.isRequired,
  data: PropTypes.object,
  handleCreateOpen: PropTypes.func.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default NewReleases;
