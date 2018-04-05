import React, { Component } from 'react';

import { config } from '../../config';

// third-party libraries
import { Dropdown, Button } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import iziToast from 'izitoast';

// axios
import axios from 'axios';

//styles
import './Threat.css';

// components
import BreadcrumbComponent from '../../common/BreadCrumb.component';
import SubHeader from '../../common/Subheader/SubHeader.component';
import LoaderGraphic from '../../common/Loader/loader.component';
import toaster from '../../common/Status/status.component';
import GetThreat from './subComponents/GetThreat/GetThreat.component';
import GetThreats from './subComponents/GetThreats/GetThreats.component';

export default class Threat extends Component {
  constructor() {
    super();
    this.state = {
      activeComponent: 'Get Threat',
      selection: 'Get Threat',
      endpoint: '/users/v2',
      method: 'GET',
      threats: [],
      companies: [],
      value: '',
      showToaster: false,
      status: '',
      message: '',
      loading: true,
      disabled: true,
    };
  }
  data = [
    { key: 'POST-threat', value: 'Get Threat', text: 'Get Threat' },
    { key: 'GET-threats', value: 'Get Threats', text: 'Get Threats' },
    {
      key: 'PUT-threats',
      value: 'Get Threat Devices',
      text: 'Get Threat Devices',
    },
    {
      key: 'GET-threat',
      value: 'Get Threat Download URL',
      text: 'Get Threat Download URL',
    },
  ];

  /**
   * method to get all companies
   * @param {object} data  companies data
   * @returns {=>Promise<TResult2|TResult1>}
   */
  componentWillMount() {
    axios
      .get(`${config.API_BASE_URL}company-info`)
      .then(res => {
        this.setState({
          loading: false,
          companies: res.data.data.companies.map(company => {
            return {
              value: company,
              text: company,
            };
          }),
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
  getThreats = () => {
    axios
      .get(`${config.API_BASE_URL}threats?company_name=${this.state.value}`)
      .then(res => {
        this.setState({ threats: res.data.data.policy.page_items });
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

  showToaster = () => {
    let { status, message } = this.state;
    toast[status](message, {
      position: toast.POSITION.TOP_RIGHT,
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
      selection: value,
    });
    switch (value) {
      case 'Get Threats':
        this.setState({ method: 'GET' });
        this.getThreats();
        break;
      case 'Get Threat':
        this.setState({ method: 'GET' });
        break;
      case 'Get Threat Devices':
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
  switchThreatComponents = () => {
    switch (this.state.activeComponent) {
      case 'Get Threat':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            <GetThreat />
          </div>
        );
      case 'Get Threats':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            <GetThreats threats={this.state.threats} />
          </div>
        );
      case 'Get Threatg Devices':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
          </div>
        );
    }
  };

  /**
   * @returns {object}
   * @member of DeviceComponent
   */
  render() {
    return (
      <div className="threat-container">
        <BreadcrumbComponent
          page="Threat API"
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
                placeholder="Get Threat"
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
        {this.switchThreatComponents()}
      </div>
    );
  }
}
