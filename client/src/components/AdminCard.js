import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const CHECK = '✔';
const X = '✘';

const AdminCard = ({ data, history }) => (
  data.map(item => (
    <ListGroup key={item.id}>
      <ListGroup.Item
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <span className="album-title">{item.album}</span>
        <br />
        {item.artist}
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
            variant="outline-dark"
            onClick={() => history.push(`/edit/${item.id}`)}
          >
            Edit
          </Button>
          <Button
            variant="outline-dark"
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

export default AdminCard;
