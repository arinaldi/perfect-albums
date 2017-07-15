import React from 'react';
import uuidV1 from 'uuid/v1';
import { Grid, Row, Col } from 'react-bootstrap';

const renderPosts = (props) => (
  props.posts.map((post) => {
    const instaLink = post.link;
    const instaImage = post.images.standard_resolution.url;
    const caption = post.caption.text;

    return (
      <Col xs={6} sm={3} key={uuidV1()} className="insta-image">
        <a href={instaLink}>
          <img src={instaImage} alt={caption} className="img-responsive" />
        </a>
      </Col>
    );
  })
);

const AotD = (props) => (
  <div>
    <Grid>
      <Row className="show-grid">
        <Col md={12}>
          <div className="insta-link">
            <h3>Album of the Day</h3>
            <a className="no-color" href="https://www.instagram.com/tony_sleeves/" target="_blank">
              <i className="fa fa-instagram fa-2x" aria-hidden="true" />
              &nbsp;&nbsp;@tony_sleeves
            </a>
          </div>
        </Col>
      </Row>
    </Grid>
    <Grid>
      <Row className="show-grid">
        {renderPosts(props)}
      </Row>
    </Grid>
  </div>
);

export default AotD;
