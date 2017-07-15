import React, { Component } from 'react';
import { Link } from "react-router-dom";
import uuidV1 from 'uuid/v1';
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

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: this.props.albums.slice(0, 49),
      searchText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
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

  clearInput() {
    this.setState({
      filteredData: this.props.albums,
      searchText: ''
    });
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
        <tr key={uuidV1()}>
          <td>{data.artist}</td>
          <td>{data.album}</td>
          <td>{data.cd.toString()}</td>
          <td>{data.aotd.toString()}</td>
          <td>
            <Link to={`/edit/${data._id}`}>Edit</Link>
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
              </FormGroup>
            </Form>
            <Table responsive striped hover className="songs">
              <thead>
                <tr>
                  <th>Artist</th>
                  <th>Album</th>
                  <th>CD</th>
                  <th>AotD</th>
                  <th></th>
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

export default Admin;
