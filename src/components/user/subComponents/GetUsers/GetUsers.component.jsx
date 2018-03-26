import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import './GetUsers.css';

class GetUsers extends Component {
  render() {
    return (
      <div className="user-table">
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role Name</Table.HeaderCell>
              <Table.HeaderCell>Zone</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>John Lilki</Table.Cell>
              <Table.Cell>September 14, 2013</Table.Cell>
              <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
              <Table.Cell>No</Table.Cell>
              <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Jamie Harington</Table.Cell>
              <Table.Cell>January 11, 2014</Table.Cell>
              <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
              <Table.Cell>Yes</Table.Cell>
              <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default GetUsers;
