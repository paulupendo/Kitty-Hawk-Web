import React, { Component } from 'react';
import { Table, Pagination } from 'semantic-ui-react';

import './GetUsers.css';

class GetUsers extends Component {
  render() {
    const { users } = this.props;
    return (
      <div className="user-table">
        <Table color="green" striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>User Id</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users.map(user => {
              return (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.id || 'No Id'}</Table.Cell>
                  <Table.Cell>{user.first_name || 'No Name'}</Table.Cell>
                  <Table.Cell>{user.last_name || 'No Name'}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.role_name}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default GetUsers;
