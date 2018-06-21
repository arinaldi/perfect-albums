import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormControl,
  Grid,
  Row,
  Table
} from 'react-bootstrap';
import { formatData } from '../utilities';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: formatData(props.albums),
      searchText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.createAlbum = this.createAlbum.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filteredData: formatData(nextProps.albums)
    });
  }

  handleChange({ target: { value } }) {
    this.setState({ searchText: value });
    this.filterData(value);
  }

  clearInput() {
    this.setState({
      filteredData: formatData(this.props.albums),
      searchText: ''
    });
  }

  createAlbum() {
    this.props.history.push('/new');
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

  render() {
    const albumRows = this.state.filteredData.map((data) => {
      return (
        <tr key={data._id}>
          <td>{data.artist}</td>
          <td>{data.album}</td>
          <td>{data.cd.toString()}</td>
          <td>{data.aotd.toString()}</td>
          <td>
            <Link to={`/edit/${data._id}`}>Edit</Link>
            &nbsp;|&nbsp;
            <Link to={`/delete/${data._id}`}>Delete</Link>
          </td>
        </tr>
      );
    });

    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            <h3>Admin</h3>
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
                <Button onClick={this.clearInput}>Clear</Button>
                <Button onClick={this.createAlbum}>New</Button>
              </FormGroup>
            </Form>
            <Table responsive striped hover className="songs">
              <thead>
                <tr>
                  <th>Artist</th>
                  <th>Album</th>
                  <th>CD</th>
                  <th>AotD</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {albumRows}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withRouter(Admin);
