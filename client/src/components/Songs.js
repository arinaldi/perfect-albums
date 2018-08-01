import React from 'react';
import { Grid, Table } from 'react-bootstrap';
import data from '../data/songs';

const songRows = data.songs.map((song, index) => (
  <tr key={index}>
    <td>{song.artist}</td>
    <td>{song.song}</td>
    <td>
      <a className="no-color" href={song.youtube} target="_blank">
        <i aria-hidden="true" className="fa fa-youtube-play" />
      </a>
    </td>
  </tr>
));

const Songs = () => (
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

export default Songs;
