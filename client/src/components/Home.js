import React from 'react';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Jumbotron>
        <h1>Perfect Albums</h1>
        <p>The best music on the Net</p>
      </Jumbotron>
      <section className="main">
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={3}>
              <Link to="/albums" className="no-color">
                <i className="fa fa-headphones fa-5x" aria-hidden="true" />
                <h2>Top Albums</h2>
                <h4>My favorite albums, by year</h4>
              </Link>
            </Col>
            <Col xs={12} md={3}>
              <Link to="/songs" className="no-color">
                <i className="fa fa-music fa-5x" aria-hidden="true" />
                <h2>Perfect Songs</h2>
                <h4>Songs that I deem timeless classics</h4>
              </Link>
            </Col>
            <Col xs={12} md={3}>
              <Link to="/aotd" className="no-color">
                <i className="fa fa-instagram fa-5x" aria-hidden="true" />
                <h2>Album of the Day</h2>
                <h4>My daily project on Instagram</h4>
              </Link>
            </Col>
            <Col xs={12} md={3}>
              <Link to="/collection" className="no-color">
                <i className="fa fa-database fa-5x" aria-hidden="true" />
                <h2>My Collection</h2>
                <h4>My searchable collection of albums</h4>
              </Link>
            </Col>
          </Row>
        </Grid>
      </section>
    </div>
  );
}

export default Home;
