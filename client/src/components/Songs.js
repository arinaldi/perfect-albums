import React from 'react';
import { Grid, Table } from 'react-bootstrap';
import songs from '../data/songs';

const uuidV1 = require('uuid/v1');
const arr = songs.songs;

const songRows = arr.map((song) => {
  return (
    <tr key={uuidV1()}>
      <td>{song.artist}</td>
      <td>{song.song}</td>
      <td>
        <a className="no-color" href={song.youtube} target="_blank">
          <i aria-hidden="true" className="fa fa-youtube-play" />
        </a>
      </td>
    </tr>
  );
});

function Songs() {
  return (
    <Grid>
      <h3>Perfect Songs</h3>
      <Table responsive striped hover className="songs">
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
    </Grid>
  );
}

export default Songs;
