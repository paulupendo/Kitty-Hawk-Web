import React, { Component } from 'react';
import { Dropdown, Button, Segment } from 'semantic-ui-react';

// styles
import './User.css';

// components
import BreadcrumbComponent from '../../common/BreadCrumb.component';
import { CallOptions } from '../../common/DropdownOptions.component';
import GetUsers from "./subComponents/GetUsers/GetUsers.component";
import GetUser from './subComponents/GetUser/GetUser.component'
import SubHeader from './SubHeader.component';
import CreateUser from './subComponents/CreateUser/CreateUser.component';

export default class User extends Component {
  state = {
    activeComponent: 'Get User',
  };

  data = [
    { key: 'POST', value: 'Get User', text: 'Get User' },
    { key: 'GET', value: 'Get Users', text: 'Get Users' },
    { key: 'POST-user', value: 'Create User', text: 'Create User' },
  ];

  handleChange = (e, { value }) => {
    this.setState({ activeComponent: value });
  };

  switchComponents = () => {
    switch (this.state.activeComponent) {
      case 'Get User':
        return <div>
            <SubHeader info="Create a new User. This requires a unique email address for the
              User being created" />
            <GetUser />
          </div>;
      case 'Get Users':
        return <div>
            <SubHeader info="Allows a caller to request a page with a list of Users resources belonging to a Tenant" />
            <GetUsers />
          </div>;
      case 'Create User':
        return (
          <div>
            <SubHeader
              info="Create a new User. This requires a unique email address for the
              User being created"
            />
            <CreateUser />
          </div>
        );
      default:
        return (
          <div>
            <SubHeader
              info="Create a new User. This requires a unique email address for the
              User being created"
            />
            <GetUser />
          </div>
        );
    }
  };

  render() {
    return (
      <div className="user-container">
        <BreadcrumbComponent page="User API" selection="Get Users" />
        <div className="header-nav">
          <div className="dropdwn-nav">
            <div>
              <Dropdown placeholder="Select Company" search selection />
            </div>

            <div>
              <Dropdown
                placeholder="Select Endpoint"
                fluid
                selection
                options={this.data}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="call-btn">
            <Button content="GET" />
            <span>/users/v2</span>
          </div>
        </div>
        {this.switchComponents()}
        <div />
      </div>
    );
  }
}
