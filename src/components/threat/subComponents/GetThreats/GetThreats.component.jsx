import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import './GetThreats.css';

class GetThreats extends Component {
  render() {
    const { Threats } = this.props;
    return (
      <div className="Threats table">
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
            {/* {Threats.map(threat => {
              return (
                <Table.Row key={threat.id}>
                  <Table.Cell>{threat.name}</Table.Cell>
                  <Table.Cell>{threat.state}</Table.Cell>
                  <Table.Cell>{threat.agent_version}</Table.Cell>
                  <Table.Cell>{threat.date_first_registered}</Table.Cell>
                  <Table.Cell>{threat.ip_addresses}</Table.Cell>
                  <Table.Cell>{threat.mac_addresses}</Table.Cell>
                </Table.Row>
              );
            })} */}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
export default GetThreats;
