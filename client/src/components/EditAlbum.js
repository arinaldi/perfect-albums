import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Radio } from 'react-bootstrap';

class EditAlbum extends Component {

  constructor() {
    super();
    this.state = {
      album: {
        artist: '',
        album: '',
        cd: false,
        aotd: false
      },
      fireRedirect: false
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getAlbum(id);
  }

  componentWillReceiveProps(nextProps) {
    const { _id, artist, album, cd, aotd } = nextProps.album;
    this.setState({
      album: {
        _id,
        artist,
        album,
        cd,
        aotd
      }
    });
  }

  renderForm() {
    const { artist, album, cd, aotd } = this.state.album;
    return (
      <Form
        horizontal
        onSubmit={(e) => {
          e.preventDefault();
          if (this.props.editAlbum) {
            this.props.editAlbum(this.state.album);
            this.setState({ fireRedirect: true });
          }
        }}
      >
        <FormGroup controlId="formHorizontalArtist">
          <Col componentClass={ControlLabel} sm={2}>
            Artist
          </Col>
          <Col sm={10}>
            <FormControl
              type="text"
              value={artist}
              onChange={e => {
                const updatedAlbum = {artist: e.target.value};
                this.setState({
                  album: Object.assign(this.state.album, updatedAlbum)
                });
              }}
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
              onChange={e => {
                const updatedAlbum = {album: e.target.value};
                this.setState({
                  album: Object.assign(this.state.album, updatedAlbum)
                });
              }}
            />
          </Col>
        </FormGroup>

        <FormGroup
          controlId="formHorizontalCd"
          onChange={e => {
            let bool = false;
            if (e.target.id === 'true') {
              bool = true;
            }
            const updatedAlbum = {cd: bool};
            this.setState({
              album: Object.assign(this.state.album, updatedAlbum)
            });
          }}
        >
          <Col componentClass={ControlLabel} sm={2}>
            CD
          </Col>
          <Col sm={10}>
            <Radio name="cdGroup" inline id="false" checked={cd === false}>
              false
            </Radio>
            <Radio name="cdGroup" inline id="true" checked={cd === true}>
              true
            </Radio>
          </Col>
        </FormGroup>

        <FormGroup
          controlId="formHorizontalAotd"
          onChange={e => {
            let bool = false;
            if (e.target.id === 'true') {
              bool = true;
            }
            const updatedAlbum = {aotd: bool};
            this.setState({
              album: Object.assign(this.state.album, updatedAlbum)
            });
          }}
        >
          <Col componentClass={ControlLabel} sm={2}>
            AotD
          </Col>
          <Col sm={10}>
            <Radio name="aotdGroup" inline id="false" checked={aotd === false}>
              false
            </Radio>
            <Radio name="aotdGroup" inline id="true" checked={aotd === true}>
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
    return (
      <Grid>
        <h3>Edit Album</h3>
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
export default EditAlbum;
