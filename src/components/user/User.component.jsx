import React, { Component, Fragment } from 'react';
import { config } from '../../config';

// third-party libraries
import { Dropdown, Button } from 'semantic-ui-react';
import iziToast from 'izitoast';

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
import LoaderGraphic from '../../common/Loader/loader.component';
import toaster from '../../common/Status/status.component';

export default class User extends Component {
  constructor() {
    super();

    this.state = {
      activeComponent: 'Create User',
      endpoint: '/users/v2',
      method: 'POST',
      selection: 'Create User',
      users: [],
      zones: [],
      companies: [],
      value: '',
      showToaster: false,
      status: '',
      message: '',
      loading: true,
      disabled: true,
      first_name: null,
      last_name: null,
      user_role: null,
      email: null,
      zoneId: null,
      user_id: null,
      zone_id: null,
      isLoading_: false
    };
  }

  data = [
    { key: 'POST-user', value: 'Create User', text: 'Create User' },
    { key: 'PUT-user', value: 'Update User', text: 'Update User' },
    { key: 'GET-users', value: 'Get Users', text: 'Get Users' },
    { key: 'GET-user', value: 'Get User', text: 'Get User' }
  ];

  /**
   * method to get all companies
   * @param {object} data  companies data
   * @returns {=>Promise<TResult2|TResult1>}
   */
  componentDidMount() {
    axios
      .get(`${config.API_BASE_URL}company-info`)
      .then(res => {
        this.setState({
          loading: false,
          companies: res.data.data.companies.map(company => {
            return {
              value: company.name,
              text: company.name
            };
          })
        });
      })
      .catch(err => err);
  }

  handleInputChange = (e, key) => {
    this.setState({ [key]: e.target.value });
  };

  handleDropDown = (e, key, { value }) => {
    this.setState({ [key]: value });
  };

  /**
   * method to get all users in a specific company
   * @returns {object} data Users
   * @member of GetUser Component
   * @returns {=>Promise<TResult2|TResult1>}
   */
  fetchUsers = () => {
    axios
      .get(`${config.API_BASE_URL}all-users?company_name=${this.state.value}`)
      .then(res => {
        this.setState({
          users: res.data.data.users.page_items,
          message: res.data.data.message
        });
      })
      .catch(err =>
        iziToast.error({
          title: 'Error',
          message: 'An error occured!',
          position: 'topRight'
        })
      );
  };

  /**
   * method to get all users in a specific company
   * @returns {object} data Users
   * @member of GetUser Component
   * @returns {=>Promise<TResult2|TResult1>}
   */
  getZones = () => {
    axios
      .get(`${config.API_BASE_URL}zones?company_name=${this.state.value}`)
      .then(res => {
        this.setState({
          zones: res.data.data.page_items
        });
      })
      .catch(err => console.log(err));
  };

  createUser = () => {
    let user_role;
    let { first_name, last_name, email } = this.state;

    this.state.user_role === 'User'
      ? (user_role = '00000000-0000-0000-0000-000000000001')
      : this.state.user_role === 'Administrator'
        ? (user_role = '00000000-0000-0000-0000-000000000002')
        : this.state.user_role === 'Zone Manager'
          ? (user_role = '00000000-0000-0000-0000-000000000003')
          : (user_role = '00000000-0000-0000-0000-000000000000');

    let data = {
      email,
      user_role,
      first_name,
      last_name,
      zones: [{ id: this.state.zone_id, role_type: user_role }]
    };

    axios
      .post(
        `${config.API_BASE_URL}users?company_name=${this.state.value}`,
        data,
        this.setState({
          isLoading_: true
        })
      )
      .then(res => {
        this.setState({ isLoading_: false });
        toaster(res.data.data.message);
      })
      .catch(err => {
        this.setState({ isLoading_: false });
        this.state.value.length === 0 && err
          ? iziToast.info({
              title: 'Error',
              message: 'Please Select a Company To Continue',
              position: 'topRight',
              transitionIn: 'bounceInLeft'
            })
          : iziToast.error({
              title: 'Error',
              message: err.response.data.message,
              position: 'topRight',
              transitionIn: 'bounceInLeft'
            });
      });
  };

  updateUser = () => {
    let user_role;
    let { user_id, first_name, last_name, email } = this.state;

    this.state.user_role === 'User'
      ? (user_role = '00000000-0000-0000-0000-000000000001')
      : this.state.user_role === 'Administrator'
        ? (user_role = '00000000-0000-0000-0000-000000000002')
        : this.state.user_role === 'Zone Manager'
          ? (user_role = '00000000-0000-0000-0000-000000000003')
          : (user_role = '00000000-0000-0000-0000-000000000000');

    let data = {
      email,
      user_role,
      first_name,
      last_name,
      zones: [{ id: this.state.zone_id, role_type: user_role }]
    };

    axios
      .put(
        `${config.API_BASE_URL}users/${user_id}?company_name=${
          this.state.value
        }`,
        data,
        this.setState({
          isLoading_: true
        })
      )
      .then(res => {
        this.setState({
          isLoading_: false
        });
        iziToast.show({
          title: 'SUCCESS',
          message: res.data.message,
          position: 'topRight',
          color: 'green',
          progressBarColor: 'rgb(0, 255, 184)',
          transitionIn: 'fadeInUp'
        });
      })
      .catch(err => {
        this.setState({ isLoading_: false });
        iziToast.error({
          title: 'Error',
          message: err.response.data.message,
          position: 'topRight'
        });
      });
  };

  /**
   * Handles change of active dropdowns
   * @member of UserComponent
   * @param {object} value
   */
  handleChange = (e, { value }) => {
    this.setState({
      activeComponent: value,
      selection: value
    });
    switch (value) {
      case 'Create User':
        this.setState({ method: 'POST' });
        this.getZones();
        break;
      case 'Get User':
        this.setState({ method: 'GET' });
        this.fetchUsers();
        break;
      case 'Get Users':
        this.setState({ method: 'GET' });
        this.fetchUsers();
        break;
      case 'Update User':
        this.setState({ method: 'PUT' });
        this.fetchUsers();
        this.getZones();
        break;
      default:
        break;
    }
  };

  /**
   * Switches selected Components
   * @member of UserComponets
   * @returns {objects} list of User components
   */
  switchComponents = () => {
    let updateButton = this.state.isLoading_ ? 'UPDATING....' : 'UPDATE';
    let createButton = this.state.isLoading_ ? 'LOADING....' : 'CREATE';
    switch (this.state.activeComponent) {
      case 'Get User':
        return (
          <div>
            <SubHeader info="Allows a caller to request a specific Console User resource belonging to a Tenant." />
            <GetUser value={this.state.value} fetchUsers={this.state.users} />
          </div>
        );
      case 'Get Users':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of Users resources belonging to a Tenant" />
            {this.state.users.length === 0 ? (
              <LoaderGraphic />
            ) : (
              <GetUsers users={this.state.users} />
            )}
          </div>
        );
      case 'Create User':
        return (
          <div>
            <SubHeader
              info="Create a new User. This requires a unique email address for the
            User being created"
            />
            <CreateUser
              handleChange={this.handleInputChange}
              // getZone={this.state.zones}
              value={this.state.value}
              handleDropDown={this.handleDropDown}
            />
            <div className="btn-bottom">
              <Button content={createButton} onClick={this.createUser} />
            </div>
          </div>
        );
      case 'Update User':
        return (
          <div>
            <SubHeader info="Allows a caller to update an existing Console User resource." />
            <UpdateUser
              handleChange={this.handleInputChange}
              handleDropDown={this.handleDropDown}
              getZones={this.state.zones}
              fetchUsers={this.state.users}
            />
            <div className="btn-bottom">
              <Button content={updateButton} onClick={this.updateUser} />
            </div>
          </div>
        );
      default:
        return (
          <div>
            <SubHeader
              info="Create a new User. This requires a unique email address for the
              User being created"
            />
            <CreateUser
              handleChange={this.handleInputChange}
              handleDropDownChange={this.handleUserRoleDropDown}
            />
            <Button content="CREATE USER" onClick={this.createUser} />
          </div>
        );
    }
  };

  /**
   * @member of USer Component
   */
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
                  this.setState({
                    value,
                    disabled: false,
                    showToaster: false
                  });
                }}
                options={this.state.companies}
                loading={this.state.loading}
              />
            </div>

            <div>
              <Dropdown
                placeholder="Create User"
                fluid
                selection
                options={this.data}
                onChange={this.handleChange}
                disabled={this.state.disabled}
              />
            </div>
          </div>
          <div className="call-btn">
            <Button content={this.state.method} />
            <span>{this.state.endpoint}</span>
          </div>
        </div>
        {this.switchComponents()}
        <div />
      </div>
    );
  }
}
