import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import './GetThreats.css';

class GetThreats extends Component {
  render() {
    const { threats } = this.props;
    const length = 30;
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
              <Table.HeaderCell>Mac Addresses</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {threats.map(threat => {
              return (
                <Table.Row key={threat.id}>
                  <Table.Cell width={1}>{threat.name}</Table.Cell>
                  <Table.Cell>{threat.classification || 'None'}</Table.Cell>
                  <Table.Cell>{threat.cylance_score}</Table.Cell>
                  <Table.Cell>{threat.file_size}</Table.Cell>
                  <Table.Cell>{threat.global_quarantined.toString()}</Table.Cell>
                  <Table.Cell>{threat.unique_to_cylance}</Table.Cell>
                  <Table.Cell>{threat.av_industry}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
export default GetThreats;
