import React from 'react';
import { Container, Table } from 'react-bootstrap';
import data from '../data/songs';

const songRows = data.songs.map((song, index) => (
  <tr key={index}>
    <td>{song.artist}</td>
    <td>{song.song}</td>
    <td>
      <a className="no-color" href={song.youtube} target="_blank" rel="noopener noreferrer">
        Link
      </a>
    </td>
  </tr>
));

const Songs = () => (
  <Container>
    <h3>Perfect Songs</h3>
    <Table striped hover>
      <thead>
        <tr>
          <th>Artist</th>
          <th>Song</th>
          <th>YouTube</th>
        </tr>
      </thead>
      <tbody>
        {songRows}
      </tbody>
    </Table>
  </Container>
);

export default Songs;
