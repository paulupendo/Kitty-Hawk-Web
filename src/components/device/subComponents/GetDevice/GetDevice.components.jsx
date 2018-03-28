import React, { Component } from 'react';
import { Input, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';

// axios
import axios from 'axios';

// styles
import './GetDevice.css';

class GetDevice extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: ''
    };
  }
  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}users?user_id=${
          this.state.searchTerm
        }&company_name=${this.props.value}`
      )
      .then(res => {
        this.setState({ user: res.data.data.user });
      });
  };
  /**
   * This method handles adding input for name, description, level and paths properties
   *
   * @param {string} name the property the value should be added to
   * @returns {function} that sets the value for the property [name] provided
   */
  handleInput = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  render() {
    return <div className="get-device">
        <Segment>
          <span> Device ID </span>
          <br />
          <Input placeholder="Enter User ID to Search..." onChange={this.handleInput} />
          <Button onClick={this.handleClick}>SEARCH</Button>
        </Segment>
        <div className="user-table">
          <Table color="green" striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Role Name</Table.HeaderCell>
                <Table.HeaderCell>Default Zone Role Name</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>johne </Table.Cell>
                <Table.Cell>johne </Table.Cell>
                <Table.Cell>johne </Table.Cell>
                <Table.Cell>johne </Table.Cell>
                <Table.Cell>johne </Table.Cell>
              </Table.Row>
            </Table.Header>
          </Table>
        </div>
      </div>;
  }
}

export default GetDevice;
