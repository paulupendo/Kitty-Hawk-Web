import React, { Component } from 'react';
import { Input, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';

// axios
import axios from 'axios';

// styles
import './Zone.css';

class GetZoneDevices extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      mac_address: []
    };
  }
  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}devices/mac-address?company_name=${
          this.props.value
        }&mac_address=${this.state.searchTerm}`
      )
      .then(res => console.log(res));
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
    return (
      <div className="zone-devices">
        <Segment>
          <span> Unique Zone ID </span>
          <br />
          <Input
            placeholder="Enter User ID to Search..."
            onChange={this.handleInput}
          />
          <Button onClick={this.handleClick}>SEARCH</Button>
        </Segment>
        <div className="user-table">
          <Table color="green" striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Policy ID</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>johne </Table.Cell>
                <Table.Cell>johne </Table.Cell>
                <Table.Cell>johne </Table.Cell>
              </Table.Row>
            </Table.Header>
          </Table>
        </div>
      </div>
    );
  }
}

export default GetZoneDevices;
