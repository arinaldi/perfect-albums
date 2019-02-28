import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import data from '../data/albums';

const albumCols = data.data.map(({ year, albums }) => (
  <Col key={year} xs={12} md={6} lg={4}>
    <h4>{year}</h4>
    <ol>
      {albums.map((album, index) => (
        <li key={index}>
          {album.artist} &ndash; {album.title}
        </li>
      ))}
    </ol>
  </Col>
));

const TopAlbums = () => (
  <Container>
    <h3>Top Albums</h3>
    <Row>
      {albumCols}
      <Col xs={12} md={6} lg={4}>
        <h4>1984 - 1990</h4>
        <p>1990</p>
        <ul>
          <li>Depeche Mode &ndash; Violator</li>
        </ul>
        <p>1989</p>
        <ul>
          <li>The Cure &ndash; Disintegration</li>
          <li>Nine Inch Nails &ndash; Pretty Hate Machine</li>
          <li>Nirvana &ndash; Bleach</li>
        </ul>
        <p>1988</p>
        <ul>
          <li>Metallica &ndash; ...And Justice for All</li>
          <li>The Moody Blues &ndash; Sur la Mer</li>
        </ul>
        <p>1987</p>
        <ul>
          <li>Guns N' Roses &ndash; Appetite for Destruction</li>
          <li>Pet Shop Boys &ndash; Actually</li>
        </ul>
        <p>1986</p>
        <ul>
          <li>Metallica &ndash; Master of Puppets</li>
          <li>Beastie Boys &ndash; Licensed to Ill</li>
        </ul>
        <p>1985</p>
        <ul>
          <li>The Misfits &ndash; Legacy of Brutality</li>
        </ul>
        <p>1984</p>
        <ul>
          <li>Metallica &ndash; Ride the Lightning</li>
        </ul>
      </Col>
    </Row>
  </Container>
);

export default TopAlbums;
