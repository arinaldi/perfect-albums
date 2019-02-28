import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CHECK = '✔';
const X = '✘';

const AdminCard = ({ history, data }) => (
  data.map(item => (
    <ListGroup key={item.id}>
      <ListGroup.Item
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <span className='album-title'>{item.album}</span>
        <br />
        {item.artist}
        <br />
        {item.year}
      </ListGroup.Item>
      <ListGroup.Item style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <span>{`CD: ${item.cd ? CHECK : X}`}</span>
          <span style={{ marginLeft: 15 }}>{`AotD: ${item.aotd ? CHECK : X}`}</span>
        </div>
        <div>
          <Button
            variant='outline-dark'
            onClick={() => history.push(`/edit/${item.id}`)}
          >
            Edit
          </Button>
          <Button
            variant='outline-dark'
            onClick={() => history.push(`/delete/${item.id}`)}
            style={{ marginLeft: 5 }}
          >
            Delete
          </Button>
        </div>
      </ListGroup.Item>
    </ListGroup>
  ))
);

AdminCard.propTypes = {
  history: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default AdminCard;
