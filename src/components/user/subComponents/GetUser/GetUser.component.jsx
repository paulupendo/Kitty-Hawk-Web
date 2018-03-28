import React, { Component } from 'react';
import { Input, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';

// axios
import axios from 'axios';

import './GetUser.css';

class GetUser extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      user: {}
    };
  }

  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}users?user_id=${
          this.state.searchTerm
        }&company_name=${this.props.value}`
      )
      .then(res => {
        this.setState({ user: res.data.data.user });
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
    console.log('state======>', this.state.user);
    // const { user } = this.state.user;
    return (
      <div className="user">
        <Segment>
          <span> User ID </span>
          <br />
          <Input
            placeholder="Enter User ID to Search..."
            onChange={this.handleInput}
          />
          <Button onClick={this.handleClick}>SEARCH</Button>
        </Segment>
        <div className="user-table">
          <Table  color="green" striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Role Name</Table.HeaderCell>
                <Table.HeaderCell>Default Zone Role Name</Table.HeaderCell>
              </Table.Row>
              {Object.keys(this.state.user).length >= 1 &&
                [this.state.user].map(user => {
                  return (
                    <Table.Row>
                      <Table.Cell>{user.first_name || 'None'}</Table.Cell>
                      <Table.Cell>{user.last_name || 'None'}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.role_name}</Table.Cell>
                      <Table.Cell>{user.default_zone_role_name}</Table.Cell>
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

export default GetUser;
