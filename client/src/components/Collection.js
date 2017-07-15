import React, { Component } from 'react';
import uuidV1 from 'uuid/v1';
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormControl,
  Glyphicon,
  Grid,
  ListGroup,
  ListGroupItem,
  Row,
  Table
} from 'react-bootstrap';
// import collection from '../data/collection';
import {
  localStorageTest,
  getHistory,
  saveToHistory,
  removeFromHistory
} from '../utilities';

let currentHistory;

if (localStorageTest()) {
  currentHistory = getHistory();
} else {
  console.log('Local Storage not available');
}

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: this.props.albums.slice(0, 49),
      searchText: '',
      randomIndex: 0,
      saved: currentHistory,
    };
    this.handleChange = this.handleChange.bind(this);
    this.getRandom = this.getRandom.bind(this);
    this.seeAll = this.seeAll.bind(this);
    this.saveAlbum = this.saveAlbum.bind(this);
    this.removeAlbum = this.removeAlbum.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredData: nextProps.albums.slice(0, 49)
    });
  }

  handleChange({ target: { value } }) {
    this.setState({ searchText: value });
    this.filterData(value);
  }

  getValidationState() {
    const length = this.state.filteredData.length;
    if (length === 0) {
      return 'error';
    }
  }

  filterData(query) {
    const filteredData = this.props.albums.filter((item) => {
      return item.artist.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
             item.album.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    });

    this.setState({
      filteredData
    });
  }

  getRandom() {
    const min = 0;
    const max = this.props.albums.length - 1;
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;

    this.setState({
      randomIndex,
      filteredData: [this.props.albums[randomIndex]]
    });
  }

  seeAll() {
    this.setState({
      filteredData: this.props.albums.slice(0, 49),
      searchText: '',
      randomIndex: 0,
    });
  }

  saveAlbum(e) {
    const id = uuidV1();
    const childCells = e.currentTarget.getElementsByTagName('td');
    const artist = childCells[0].innerText;
    const album = childCells[1].innerText;

    const found = this.state.saved.some((item) => {
      return item.album === album;
    });

    if (found) {
      console.log('album exists');
    } else {
      const newAlbum = {
        id,
        artist,
        album,
      };

      this.setState({
        saved: [
          ...this.state.saved,
          newAlbum,
        ]
      });
      saveToHistory(newAlbum);
    }
  }

  removeAlbum(e) {
    const id = e.currentTarget.dataset.id;
    const theObj = this.state.saved.find((item => item.id === id));
    const index = this.state.saved.indexOf(theObj);

    this.setState({
      saved: [
        ...this.state.saved.slice(0, index),
        ...this.state.saved.slice(index + 1)
      ]
    });

    // remove from LS
    removeFromHistory(index);

  }

  render() {
    const albumRows = this.state.filteredData.map((data) => {
      return (
        <tr key={uuidV1()} onClick={this.saveAlbum}>
          <td>{data.artist}</td>
          <td>{data.album}</td>
          <td><Glyphicon glyph="star-empty" className="pull-right star" /></td>
        </tr>
      );
    });

    const savedItems = this.state.saved.map((item) => {
      return (
        <ListGroupItem
          key={item.id}
          data-id={item.id}
          onClick={this.removeAlbum}
          header={item.album}
        >
          {item.artist}
          <Glyphicon
            glyph="remove"
            className="pull-right x"
          />
        </ListGroupItem>
      );
    });

    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={8}>
            <h3>My Collection</h3>

            <Form horizontal className="form">
              <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}
              >
                  <FormControl
                    type="text"
                    value={this.state.searchText}
                    placeholder="Search"
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                  <Button onClick={this.getRandom}>Random</Button>
                  <Button onClick={this.seeAll}>See All</Button>
              </FormGroup>
            </Form>

            <Table responsive striped hover className="songs">
              <thead>
                <tr>
                  <th>Artist</th>
                  <th>Album</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {albumRows}
              </tbody>
            </Table>
          </Col>

          <Col xs={12} md={4}>
            <h3>Saved albums</h3>
            <ListGroup>
              {savedItems}
            </ListGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Collection;
