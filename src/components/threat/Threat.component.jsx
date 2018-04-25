import React, { Component } from 'react';

import { config } from '../../config';

// third-party libraries
import { Dropdown, Button } from 'semantic-ui-react';
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
import GetThreatDevices from './subComponents/GetThreatDevices/GetThreatDevices.component';
import ThreatDownloadUrl from './subComponents/ThreatDownloadUrl/ThreatDownloadUrl.component';

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
      loading: true,
      disabled: true
    };
  }
  data = [
    { key: 'POST-threat', value: 'Get Threat', text: 'Get Threat' },
    { key: 'GET-threats', value: 'Get Threats', text: 'Get Threats' },
    {
      key: 'PUT-threats',
      value: 'Get Threat Devices',
      text: 'Get Threat Devices'
    },
    {
      key: 'GET-threat',
      value: 'Get Threat Download URL',
      text: 'Get Threat Download URL'
    }
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
  getThreats = () => {
    axios
      .get(`${config.API_BASE_URL}threats?company_name=${this.state.value}`)
      .then(res => {
        this.setState({ threats: res.data.data.policy.page_items });
      })
      .catch(err => {
        this.state.value.length === 0 && err
          ? iziToast.info({
              title: 'Error',
              message: 'Please Select a Company To Continue',
              position: 'topRight',
              transitionIn: 'bounceInLeft',
              timeout: 2000
            })
          : iziToast.error({
              title: 'Error',
              message: err.message,
              position: 'topRight',
              transitionIn: 'bounceInLeft'
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
      case 'Get Threats':
        this.setState({ method: 'GET' });
        break;
      case 'Get Threat':
        this.setState({ method: 'GET' });
        break;
      case 'Get Threat Devices':
        this.setState({ method: 'PUT' });
        this.getThreats();
        break;
      case 'Get Threat Download URL':
        this.setState({ method: 'GET' });
        this.getThreats();
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
            <GetThreat
              value={this.state.value}
            />
          </div>
        );
      case 'Get Threats':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            {this.state.threats.length === 0 ? (
              <LoaderGraphic />
            ) : (
              <GetThreats
                threats={this.state.threats}
                getThreats={this.state.threats}
              />
            )}
          </div>
        );
      case 'Get Threat Devices':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            <GetThreatDevices
              value={this.state.value}
              getThreats={this.state.threats}
            />
          </div>
        );
      case 'Get Threat Download URL':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            <ThreatDownloadUrl
              value={this.state.value}
              getThreats={this.state.threats}
            />
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
