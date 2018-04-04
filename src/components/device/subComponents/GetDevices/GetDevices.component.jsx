import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import './GetDevices.css';

class GetDevices extends Component {
  render() {
    const { devices } = this.props;
    return <div className="devices table">
        <Table color="green" striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>State</Table.HeaderCell>
              <Table.HeaderCell>Agent_version</Table.HeaderCell>
              <Table.HeaderCell>Date First Registred</Table.HeaderCell>
              <Table.HeaderCell>Ip Address</Table.HeaderCell>
              <Table.HeaderCell>Mac Addresses</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {devices.map(device => {
            return <Table.Row key={device.id}>
                <Table.Cell>{device.name}</Table.Cell>
                <Table.Cell>{device.state}</Table.Cell>
                <Table.Cell>{device.agent_version}</Table.Cell>
                <Table.Cell>{device.date_first_registered}</Table.Cell>
                <Table.Cell>{device.ip_addresses}</Table.Cell>
                <Table.Cell>{device.mac_addresses}</Table.Cell>
              </Table.Row>;
          })}
          </Table.Body>
        </Table>
      </div>;
  }
}
export default GetDevices;
