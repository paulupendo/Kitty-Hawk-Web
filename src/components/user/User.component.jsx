import React, { Component } from 'react';

// third-party libraries
import { Dropdown, Button, Segment } from 'semantic-ui-react';

// axios
// import http from '../../helpers/http.service';

// styles
import './User.css';

// components
import BreadcrumbComponent from '../../common/BreadCrumb.component';
import GetUsers from './subComponents/GetUsers/GetUsers.component';
import GetUser from './subComponents/GetUser/GetUser.component';
import SubHeader from './SubHeader.component';
import CreateUser from './subComponents/CreateUser/CreateUser.component';
import UpdateUser from './subComponents/UpdateUser/UpdateUser.component';

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      activeComponent: 'Create User',
      endpoint: '/users/v2',
      method: 'POST',
      selection: 'Create User',
      users: []
    };
  }

  data = [
    { key: 'POST-user', value: 'Create User', text: 'Create User' },
    { key: 'PUT', value: 'Update User', text: 'Update User' },
    { key: 'GET', value: 'Get Users', text: 'Get Users' },
    { key: 'POST', value: 'Get User', text: 'Get User' }
  ];

  /**
   * This method handles the get call for users
   */
  // componentDidMount() {
  //   http.get('https://protectapi-au.cylance.com/users/v2').then(res => {
  //     console.log('reeeeeeeeeees===>>>>>', res);
  //   });
  // }

  handleChange = (e, { value }) => {
    this.setState({
      activeComponent: value,
      selection: value
    });
    switch (value) {
      case 'Create User':
        this.setState({ method: 'POST' });
        break;
      case 'Get User':
        this.setState({ method: 'GET' });
        break;
      case 'Get Users':
        this.setState({ method: 'GET' });
        break;
      case 'Update User':
        this.setState({ method: 'PUT' });
      default:
        break;
    }
  };

  switchComponents = () => {
    switch (this.state.activeComponent) {
      case 'Get User':
        return (
          <div>
            <SubHeader
              info="Create a new User. This requires a unique email address for the
              User being created"
            />
            <GetUser />
          </div>
        );
      case 'Get Users':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of Users resources belonging to a Tenant" />
            <GetUsers />
          </div>
        );
      case 'Create User':
        return (
          <div>
            <SubHeader
              info="Create a new User. This requires a unique email address for the
            User being created"
            />
            <CreateUser />
            <div className="btn-bottom">
              <Button content="CREATE USER" />
            </div>
          </div>
        );
      case 'Update User':
        return (
          <div>
            <SubHeader info="Allows a caller to update an existing Console User resource." />
            <UpdateUser />
            <div className="btn-bottom">
              <Button content="UPDATE" />
            </div>
          </div>
        );

      case 'Get Users':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of Users resources belonging to a Tenant" />
            <GetUsers />
          </div>
        );
      case 'Get User':
        return (
          <div>
            <SubHeader info="Allows a caller to request User information by ID" />
            <GetUser />
          </div>
        );
      default:
        return (
          <div>
            <SubHeader
              info="Create a new User. This requires a unique email address for the
              User being created"
            />
            <CreateUser />
            <Button content="CREATE USER" />
          </div>
        );
    }
  };

  render() {
    return (
      <div className="user-container">
        <BreadcrumbComponent page="User API" selection={this.state.selection} />
        <div className="header-nav">
          <div className="dropdwn-nav">
            <div>
              <Dropdown placeholder="Select Company" search selection />
            </div>

            <div>
              <Dropdown
                placeholder="Create User"
                fluid
                selection
                options={this.data}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="call-btn">
            <Button content={this.state.method} />
            <span>{this.state.endpoint}</span>
          </div>
          <div />
        </div>
        {this.switchComponents()}
        <div />
      </div>
    );
  }
}
