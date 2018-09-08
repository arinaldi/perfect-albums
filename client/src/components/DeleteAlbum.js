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
import { getQuery } from '../utilities';

class DeleteAlbum extends Component {

  constructor() {
    super();
    this.state = {
      fireRedirect: false,
      query: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { getAlbum, match, location } = this.props;
    let query = '';

    if (location.search) {
      query = getQuery(location.search);
    }

    getAlbum(match.params.id);
    this.setState({ query });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { deleteAlbum, match } = this.props;

    deleteAlbum(match.params.id);
    this.setState({ fireRedirect: true });
  }

  renderForm() {
    const { artist, album } = this.props.album;
    const { query } = this.state;

    return (
      <Form
        horizontal
        onSubmit={this.handleSubmit}
      >
        <FormGroup>
          <Col smOffset={2} sm={10}>
            {`Are you sure you want to delete ${artist} – ${album}?`}
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Link to={`/admin?${query}`}>
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
    const { query } = this.state;

    if (status.isFetching) return <Loader />;
    if (status.isError) return <ErrorMessage />;
    
    return (
      <Grid>
        <h3>Delete Album</h3>
        <Row className="show-grid">
          <Col xs={12}>
            { this.renderForm() }
            {this.state.fireRedirect && (
              <Redirect to={`/admin?${query}`} />
            )}
          </Col>
        </Row>
      </Grid>
      
    );
  }
}
export default DeleteAlbum;
