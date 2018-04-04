import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import './GetZones.css';

class GetZones extends Component {
  render() {
    const { zones } = this.props;
    return <div className="zones table">
        <Table color="green" striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Policy ID</Table.HeaderCell>
              <Table.HeaderCell>Update Type</Table.HeaderCell>
              <Table.HeaderCell>Criticality</Table.HeaderCell>
              <Table.HeaderCell>Date Created</Table.HeaderCell>
              <Table.HeaderCell>Date Modified</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {zones.map(zone => {
            return (
              <Table.Row key={zone.id}>
                <Table.Cell>{zone.name}</Table.Cell>
                <Table.Cell>{zone.policy_id}</Table.Cell>
                <Table.Cell>{zone.update_type}</Table.Cell>
                <Table.Cell>{zone.criticality}</Table.Cell>
                <Table.Cell>{zone.date_created}</Table.Cell>
                <Table.Cell>{zone.date_modified}</Table.Cell>
              </Table.Row>
            );
          })}
          </Table.Body>
        </Table>
      </div>;
  }
}
export default GetZones;
