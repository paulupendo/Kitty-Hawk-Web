import React, { Component } from 'react';
import { Input, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';

// axios
import axios from 'axios';

// styles
import './GetZone.css';

class GetZone extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      zones: {}
    };
  }
  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}single-device?company_name=${
          this.props.value
        }&device_id=${this.state.searchTerm}`
      )
      .then(res => {
        this.setState({
          device: res.data.data.device
        });
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
    return (
      <div className="get-policy">
        <Segment>
          <span> Device ID </span>
          <br />
          <Input
            placeholder="Enter Device ID to Search..."
            onChange={this.handleInput}
          />
          <Button onClick={this.handleClick}>SEARCH</Button>
        </Segment>
        <div className="device-table">
          <Table color="green" striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Agent Version</Table.HeaderCell>
                <Table.HeaderCell>Date Fist Registered</Table.HeaderCell>
                <Table.HeaderCell>Date Modified</Table.HeaderCell>
                <Table.HeaderCell>Date Offline</Table.HeaderCell>
                <Table.HeaderCell>Host Name</Table.HeaderCell>
                <Table.HeaderCell>Last Looged In User</Table.HeaderCell>
                <Table.HeaderCell>State</Table.HeaderCell>
                <Table.HeaderCell>Host Name</Table.HeaderCell>
              </Table.Row>
              {Object.keys(this.state.device).length >= 1 &&
                [this.state.device].map(device => {
                  return (
                    <Table.Row key={device.id}>
                      <Table.Cell>{device.name || 'None'}</Table.Cell>
                      <Table.Cell>{device.agent_version}</Table.Cell>
                      <Table.Cell>{device.date_first_registered}</Table.Cell>
                      <Table.Cell>{device.date_last_modified}</Table.Cell>
                      <Table.Cell>{device.date_offline}</Table.Cell>
                      <Table.Cell>{device.host_name}</Table.Cell>
                      <Table.Cell>{device.last_logged_in_user}</Table.Cell>
                      <Table.Cell>{device.state}</Table.Cell>
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

export default GetZone;
