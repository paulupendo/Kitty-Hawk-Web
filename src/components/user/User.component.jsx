import React, { Component } from 'react';

// third-party libraries
import { Dropdown, Button } from 'semantic-ui-react';

// axios
import axios from 'axios';

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
      users: [],
      companies: [],
      value: ''
    };
  }
  populateCompanyDropdown = companies =>
    companies.map(company => {
      console.log('company = ', company);
    });
  data = [
    { key: 'POST-user', value: 'Create User', text: 'Create User' },
    { key: 'PUT', value: 'Update User', text: 'Update User' },
    { key: 'GET', value: 'Get Users', text: 'Get Users' },
    { key: 'POST', value: 'Get User', text: 'Get User' }
  ];

  componentDidMount() {
    axios
      .get('http://127.0.0.1:5000/api/company-info')
      .then(res => {
        this.setState({
          companies: res.data.data.companies.map(company => {
            return { value: company, text: company };
          })
        });
        console.log(this.state.companies);
      })
      .catch(err => console.log('ERR', err));

    this.populateCompanyDropdown(this.state.companies);
  }
  fetchUsers = () => {
    axios
      .get(
        `http://127.0.0.1:5000/api/all-users?company_name=${this.state.value}`
      )
      .then(res => {
        this.setState({
          users: res.data.data.users.page_items
        });
      });
  };
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
        this.fetchUsers();
        break;
      case 'Update User':
        this.setState({ method: 'PUT' });
        break;
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
            <GetUsers users={this.state.users} />
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
              <Dropdown
                placeholder="Select Company"
                search
                selection
                onChange={(_, { value }) => {
                  this.setState({ value });
                }}
                options={this.state.companies}
              />
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
