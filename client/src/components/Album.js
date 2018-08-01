import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Radio
} from 'react-bootstrap';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      album: '',
      cd: false,
      aotd: false,
      isEditMode: false,
      fireRedirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const { path } = match;
    const isEditMode = path.includes('edit');

    if (isEditMode) {
      this.props.getAlbum(id);
      this.setState({ isEditMode });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isEditMode } = this.state;

    if (isEditMode) {
      const { artist, album, cd, aotd } = nextProps.album;
      this.setState({ artist, album, cd, aotd });
    }
  }

  handleChange({ target: { name, value } }) {
    if (name === 'cd' || name === 'aotd') value = value === 'true';
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createAlbum, editAlbum } = this.props;
    const { artist, album, cd, aotd, isEditMode } = this.state;

    if (isEditMode) {
      const { id } = this.props.match.params;
      editAlbum(id, { artist, album, cd, aotd });
    } else {
      createAlbum({ artist, album, cd, aotd });
    }

    this.setState({ fireRedirect: true });
  }

  renderForm() {
    const { artist, album, cd, aotd } = this.state;
    
    return (
      <Form
        horizontal
        onSubmit={this.handleSubmit}
      >
        <FormGroup controlId="formHorizontalArtist">
          <Col componentClass={ControlLabel} sm={2}>
            Artist
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              value={artist}
              name="artist"
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalAlbum">
          <Col componentClass={ControlLabel} sm={2}>
            Album
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              value={album}
              name="album"
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalCd">
          <Col componentClass={ControlLabel} sm={2}>
            CD
          </Col>
          <Col sm={10}>
            <Radio
              name="cd"
              inline
              checked={cd === false}
              value="false"
              onChange={this.handleChange}
            >
              false
            </Radio>
            <Radio
              name="cd"
              inline
              checked={cd === true}
              value="true"
              onChange={this.handleChange}
            >
              true
            </Radio>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalAotd">
          <Col componentClass={ControlLabel} sm={2}>
            AotD
          </Col>
          <Col sm={10}>
            <Radio
              name="aotd"
              inline
              checked={aotd === false}
              value="false"
              onChange={this.handleChange}
            >
              false
            </Radio>
            <Radio
              name="aotd"
              inline
              checked={aotd === true}
              value="true"
              onChange={this.handleChange}
            >
              true
            </Radio>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Link to="/admin">
              <Button>Cancel</Button>
            </Link>&nbsp;&nbsp;
            <Button type="submit">Save</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }

  render() {
    const { status } = this.props;
    const { isEditMode } = this.state;
    const title = isEditMode ? 'Edit' : 'Create';

    if (status.isFetching) return <Loader />;
    if (status.isError) return <ErrorMessage />;

    return (
      <Grid>
        <h3>{`${title} Album`}</h3>
        <Row className="show-grid">
          <Col xs={12}>
            { this.renderForm() }
            { this.state.fireRedirect && <Redirect to={'/admin'} /> }
          </Col>
        </Row>
      </Grid>
      
    );
  }
}
export default Album;
