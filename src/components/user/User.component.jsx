import React, { Component, Fragment } from 'react';
import { config } from '../../config';

// third-party libraries
import { Dropdown, Button } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';

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
import formatStatus from '../../common/Status/status.component';

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
      value: '',
      showToaster: false,
      status: '',
      message: '',
      loading: true,
      disabled: true,
      toastId : null,
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
              value: company,
              text: company
            };
          })
        });
      })
      .catch(err => err);
  }

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
          showToaster: true,
          status: formatStatus(res.status),
          message: res.data.data.message
        });
      })
      .catch(err => err);
  };

  showToaster = () => {
    let { status, message } = this.state;
    if (!toast.isActive(this.toastId)){
      this.toastId = toast[status](message, { position : toast.POSITION.TOP_RIGHT
       });
    }
  }

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

  /**
   * Switches selected Components
   * @member of UserComponets
   * @returns {objects} list of User components
   */
  switchComponents = () => {
    switch (this.state.activeComponent) {
      case 'Get User':
        return (
          <div>
            <SubHeader
              info="Create a new User. This requires a unique email address for the
              User being created"
            />
            <GetUser value={this.state.value} />
          </div>
        );
      case 'Get Users':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of Users resources belonging to a Tenant" />
            {this.state.users.length === 0 ? (
              <LoaderGraphic />
            ) : (
              <Fragment>
                <div>
                  <GetUsers users={this.state.users} />
                  {this.state.showToaster && this.showToaster()}
                </div>
              </Fragment>
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

  /**
   * @returns {object}
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
                  this.setState({ value, disabled: false });
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
        <ToastContainer />
        <div />
      </div>
    );
  }
}
