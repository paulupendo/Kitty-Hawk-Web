import React, { Component } from 'react';
import { Dropdown, Button, Segment } from 'semantic-ui-react';

// styles
import './User.css';

// componnents
import BreadcrumbComponent from '../../common/BreadCrumb.component';
import { CallOptions } from '../../common/DropdownOptions.component';
import GetUsers from './subComponents/GetUsers.component';
import GetUser from './subComponents/GetUser.component';

export default class User extends Component {
  state = {
    activeComponent: 'Get User',
  };

  data = [
    { key: 'POST', value: 'Get User', text: 'Get User' },
    { key: 'GET', value: 'Get Users', text: 'Get Users' },
  ];

  handleChange = (e, { value }) => {
    this.setState({ activeComponent: value });
  };

  switchComponents = () => {
    switch (this.state.activeComponent) {
      case 'Get User':
        return <GetUser />;
      case 'Get Users':
        return <GetUsers />;
      default:
        return <GetUser />;
    }
  };

  render() {
    return (
      <div className="user-container">
        <BreadcrumbComponent page="User API" selection="Get Users" />
        <div className="header-nav">
          <div classNaame="dropdwn-nav">
            <Dropdown placeholder="Select Company" search selection />
            <Dropdown
              placeholder="Create User"
              fluid
              selection
              options={this.data}
              onChange={this.handleChange}
            />
          </div>
          <div className="call-btn">
            <Button content="GET" />
          </div>
        </div>
        {this.switchComponents()}
        <div />
      </div>
    );
  }
}
