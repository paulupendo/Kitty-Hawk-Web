import React, { Component, Fragment } from 'react';
import { config } from '../../config';

// third-party libraries
import { Dropdown, Button } from 'semantic-ui-react';
import iziToast from 'izitoast';

// axios
import axios from 'axios';

//styles
import './Policy.css';

// components
import BreadcrumbComponent from '../../common/BreadCrumb.component';
import SubHeader from '../../common/Subheader/SubHeader.component';
import toaster from '../../common/Status/status.component';
import LoaderGraphic from '../../common/Loader/loader.component';
import GetPolicies from './subComponents/GetPolicies/GetPolicies.component';

export default class Policy extends Component {
  constructor() {
    super();
    this.state = {
      activeComponent: 'Create Policy',
      selection: 'Create Policy',
      endpoint: '/users/v2',
      method: 'GET',
      policies: [],
      companies: [],
      value: '',
      showToaster: false,
      status: '',
      message: '',
      loading: true,
      disabled: true
    };
  }
  data = [
    { key: 'POST-policy', value: 'Create Policy', text: 'Create Policy' },
    { key: 'GET-policy', value: 'Get Policy', text: 'Get Policy' },
    { key: 'GET-policies', value: 'Get Policies', text: 'Get Policies' },
    { key: 'PUT-policy', value: 'Update Policy', text: 'Update Policy' },
    { key: 'DELETE-policy', value: 'Delete Policy', text: 'Delete Policy' },
    {
      key: 'DELETE-policies',
      value: 'Delete Policies',
      text: 'Delete Policies'
    }
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
   * method to get all policies in a specific company
   * @returns {object} data Users
   * @member of GetUser Component
   * @returns {=>Promise<TResult2|TResult1>}
   */
  getpolicies = () => {
    axios
      .get(`${config.API_BASE_URL}policies?company_name=${this.state.value}`)
      .then(res => {
        this.setState({ policies: res.data.data.page_items });
        toaster(res.data.data.message);
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
      case 'Create Policy':
        this.setState({ method: 'GET' });
        break;
      case 'Add To Global List':
        this.setState({ method: 'GET' });
        break;
      case 'Get Policies':
        this.setState({ method: 'PUT' });
        this.getpolicies();
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
  switchPolicyComponents = () => {
    switch (this.state.activeComponent) {
      case 'Add To Global List':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
          </div>
        );
      case 'Create Policy':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
          </div>
        );
      case 'Get Policies':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of Users resources belonging to a Tenant" />
            {this.state.policies.length === 0 ? (
              <LoaderGraphic />
            ) : (
              <Fragment>
                <GetPolicies policies={this.state.policies} />
                {this.state.showToaster && this.showToaster()}
              </Fragment>
            )}
          </div>
        );
    }
  };

  /**
   * @returns
   * @member of DeviceComponent
   */
  render() {
    return (
      <div className="global-container">
        <BreadcrumbComponent
          page="Policy API"
          selection={this.state.selection}
        />
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
                placeholder="Add To Global List"
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
        {this.switchPolicyComponents()}
      </div>
    );
  }
}
