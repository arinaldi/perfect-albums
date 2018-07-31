import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
} from 'react-bootstrap';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

class DeleteAlbum extends Component {

  constructor() {
    super();
    this.state = {
      fireRedirect: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getAlbum(id);
  }

  renderForm() {
    const { artist, album } = this.props.album;
    const { id } = this.props.match.params;

    return (
      <Form
        horizontal
        onSubmit={(e) => {
          e.preventDefault();
          if (this.props.deleteAlbum) {
            this.props.deleteAlbum(id);
            this.setState({ fireRedirect: true });
          }
        }}
      >
        <FormGroup>
          <Col smOffset={2} sm={10}>
            {`Are you sure you want to delete ${artist} – ${album}?`}
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Link to="/admin">
              <Button>Cancel</Button>
            </Link>&nbsp;&nbsp;
            <Button type="submit">Delete</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }

  render() {
    const { status } = this.props;

    if (status.isFetching) return <Loader />;
    if (status.isError) return <ErrorMessage />;
    
    return (
      <Grid>
        <h3>Delete Album</h3>
        <Row className="show-grid">
          <Col xs={12}>
            { this.renderForm() }
            {this.state.fireRedirect && (
              <Redirect to={'/admin'} />
            )}
          </Col>
        </Row>
      </Grid>
      
    );
  }
}
export default DeleteAlbum;
