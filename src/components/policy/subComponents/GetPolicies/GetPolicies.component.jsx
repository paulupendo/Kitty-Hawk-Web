import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import './GetPolicies.css';

class GetPolicies extends Component {
  render() {
    const { policies } = this.props;
    return (
      <div className="policies table">
        <Table color="green" striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Zone Count</Table.HeaderCell>
              <Table.HeaderCell>Device Count</Table.HeaderCell>
              <Table.HeaderCell>Date Added</Table.HeaderCell>
              <Table.HeaderCell>Date Modified</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {policies.map(policy => {
              return (
                <Table.Row key={policy.id}>
                  <Table.Cell>{policy.name}</Table.Cell>
                  <Table.Cell>{policy.zone_count}</Table.Cell>
                  <Table.Cell>{policy.device_count}</Table.Cell>
                  <Table.Cell>{policy.date_added}</Table.Cell>
                  <Table.Cell>{policy.date_modified}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
export default GetPolicies;
