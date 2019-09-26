import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';

import { sortByDate } from '../../utils';
import { Context } from '../Provider';
import DateCol from './DateCol';

const NewReleases = ({ data, handleCreateOpen, handleDeleteOpen }) => {
  const { state } = useContext(Context);

  return (
    <Container>
      <Row>
        <Col>
          <h3>New Releases</h3>
        </Col>
        {state.isAuthenticated && (
          <Col xs='auto'>
            <Button
              variant='outline-dark'
              onClick={handleCreateOpen}
            >
              New
            </Button>
          </Col>
        )}
      </Row>
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
    </Container>
  );
};

NewReleases.propTypes = {
  data: PropTypes.object.isRequired,
  handleCreateOpen: PropTypes.func.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
};

export default NewReleases;
