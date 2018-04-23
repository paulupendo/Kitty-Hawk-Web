import React, { Component } from 'react';
import { Dropdown, Segment, Button, Table, Icon } from 'semantic-ui-react';
import { config } from '../../../../config';
import Skeleton from 'react-loading-skeleton';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Third Party components
import iziToast from 'izitoast';

// axios
import axios from 'axios';

//styles
import './GetUser.css';

// components
import toaster from '../../../../common/Status/status.component';

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
      selected: [],
      value: '',
      loading: false,
      isLoadingProps_: true,
      copied: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        isLoadingProps_: false,
        selected: nextProps.fetchUsers.map(user => {
          return { value: user.id, text: user.id };
        })
      });
    }
  }

  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}users/${this.state.value}?company_name=${
          this.props.value
        }`,
        this.setState({
          loading: true
        })
      )
      .then(res => {
        this.setState({ user: res.data.data.user, loading: false });
        iziToast.show({
          title: 'SUCCESS',
          message: res.data.data.message,
          position: 'topRight',
          color: 'green',
          progressBarColor: 'rgb(0, 255, 184)'
        });
      })
      .catch(err => {
        this.setState({ loading: false });
        iziToast.error({
          title: 'Error',
          message: 'An error occured!',
          position: 'topRight'
        });
      });
  };
 
  render() {
    const buttonToShow = this.state.loading ? 'SEARCHING....' : 'SEARCH';
    return (
      <div className="user">
        <Segment>
          <span> Select User ID</span>
          <br />
          <Dropdown
            placeholder="Select User"
            search
            selection
            onChange={(_, { value }) => {
              this.setState({ value });
            }}
            options={this.state.selected}
            loading={this.state.isLoadingProps_}
          />
          <Button onClick={this.handleClick}>{buttonToShow}</Button>
        </Segment>
        {this.state.loading ? (
          <Skeleton count={4} duration={2} />
        ) : (
          Object.keys(this.state.user).length >= 1 &&
          [this.state.user].map(user => {
            return (
              <div className="user-table">
                <Table color="green" striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>First Name</Table.HeaderCell>
                      <Table.HeaderCell>Last Name</Table.HeaderCell>
                      <Table.HeaderCell>User ID</Table.HeaderCell>
                      <Table.HeaderCell>Email</Table.HeaderCell>
                      <Table.HeaderCell>Role Name</Table.HeaderCell>
                      <Table.HeaderCell>
                        Default Zone Role Name
                      </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row key={user.id}>
                      <Table.Cell>{user.first_name || 'None'} </Table.Cell>
                      <Table.Cell>{user.last_name || 'None'}</Table.Cell>
                      <Table.Cell>
                        {user.id}{' '}
                        <Icon
                          name="copy"
                          color="green"
                        />
                      </Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.role_name}</Table.Cell>
                      <Table.Cell>{user.default_zone_role_name}</Table.Cell>
                    </Table.Row>
                  </Table.Header>
                </Table>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default GetUser;
