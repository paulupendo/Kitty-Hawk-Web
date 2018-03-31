import React, { Component } from 'react';
import { Input, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';

// axios
import axios from 'axios';

// styles
import './getbyMacAddress.css';

class GetByMACAddress extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      deviceMac: []
    };
  }
  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}devices/mac-address?company_name=${
          this.props.value
        }&mac_address=${this.state.searchTerm}`
      )
      .then(res =>
        this.setState({
          deviceMac: res.data.data.device
        })
      ).catch(err => err)
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
    console.log(this.state);
    return (
      <div className="mac-devices">
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
                <Table.HeaderCell>Agent Version</Table.HeaderCell>
                <Table.HeaderCell>Host</Table.HeaderCell>
                <Table.HeaderCell>last_logged_in_user</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>State</Table.HeaderCell>
              </Table.Row>
              {this.state.deviceMac.map(mac => {
                return (
                  <Table.Row key={mac.id}>
                    <Table.Cell>{mac.name}</Table.Cell>
                    <Table.Cell>{mac.agent_version}</Table.Cell>
                    <Table.Cell>{mac.host_name}</Table.Cell>
                    <Table.Cell>{mac.last_logged_in_user}</Table.Cell>
                    <Table.Cell>{mac.state}</Table.Cell>
                    <Table.Cell>{mac.update_available}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Header>
          </Table>
        </div>
      </div>
    );
  }
}

export default GetByMACAddress;
