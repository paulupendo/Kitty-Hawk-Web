import React, { Component } from 'react';
import { Input, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';

import { ToastContainer, toast } from 'react-toastify';
import iziToast from 'izitoast';

// axios
import axios from 'axios';

//styles
import './GetUser.css';

// components
import formatStatus from '../../../../common/Status/status.component';

class GetUser extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      user: {},
      error: false,
      showToaster: false,
      status: '',
      message: '',
      toastId: null,
    };
  }

  handleClick = () => {
    this.state.searchTerm.length === 0
      ? this.setState({
          error: true,
        })
      : // /users/<user-id>?company_name=<name>
        axios
          .get(
            `${config.API_BASE_URL}users/${
              this.state.searchTerm
            }?company_name=${this.props.value}`,
          )
          .then(res => {
            this.setState({
              user: res.data.data.user,
              error: false,
              status: formatStatus(res.status),
              message: res.data.data.message,
            });
            iziToast.show({
              title: 'SUCCESS',
              message: res.data.data.message,
              position: 'topRight',
              color: 'green',
              progressBarColor: 'rgb(0, 255, 184)',
            });
          })
          .catch(err => {
            this.setState({
              error: false,
              status: formatStatus('500'),
              message: err.message,
            });
            iziToast.error({
              title: 'Error',
              message: 'An error occured!',
              position: 'topRight',
            });
          });
  };

  showToaster = () => {
    let { status, message } = this.state;
    if (!toast.isActive(this.toastId)) {
      this.toastId = toast[status](message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /**
   * This method handles adding input for name, description, level and paths properties
   *
   * @param {string} name the property the value should be added to
   * @returns {function} that sets the value for the property [name] provided
   */
  handleInput = event => {
    this.setState({
      searchTerm: event.target.value,
      error: false,
    });
  };

  render() {
    return (
      <div className="user">
        <Segment>
          <span> User ID </span>
          <br />
          <Input
            placeholder="Enter User ID to Search..."
            onChange={this.handleInput}
            error={this.state.error}
          />
          <Button onClick={this.handleClick}>SEARCH</Button>
        </Segment>
        <div className="user-table">
          <Table color="green" striped>
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
                    <Table.Row key={user.id}>
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
          {this.state.showToaster && this.showToaster()}
          <ToastContainer />
        </div>
      </div>
    );
  }
}

export default GetUser;
