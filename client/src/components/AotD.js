import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const renderPosts = (posts) => (
  posts.map((post) => {
    const { link, caption } = post;
    const { url } = post.images.standard_resolution;

    return (
      <Col xs={6} sm={3} key={post.id} className="insta-image">
        <a href={link}>
          <img
            src={url}
            alt={caption.text}
            title={caption.text}
            className="img-responsive"
          />
        </a>
      </Col>
    );
  })
);

class AotD extends Component {
  componentDidMount() {
    this.props.loadInsta();
  }

  render() {
    const { posts, status } = this.props;

    if (status.isFetching) return <Loader />;
    if (status.isError) return <ErrorMessage />;

    return (
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
            {renderPosts(posts)}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AotD;
