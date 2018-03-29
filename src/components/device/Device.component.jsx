import React, { Component, Fragment } from 'react';
import { config } from '../../config';

// third-part Libraries
import { Dropdown, Button } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';

// axios
import axios from 'axios';

//styles
import './Device.css';

// components
import BreadcrumbComponent from '../../common/BreadCrumb.component';

import SubHeader from '../../common/Subheader/SubHeader.component';
import formatStatus from '../../common/Status/status.component';
import LoaderGraphic from '../../common/Loader/loader.component';
import GetDevices from './subComponents/GetDevices/GetDevices.component';
import GetDevice from '../device/subComponents/GetDevice/GetDevice.components';
import GetDeviceThreats from '../device/subComponents/GetDeviceThreats/GetDeviceThreats.component';
import GetZoneDevices from '../device/subComponents/GetZoneDevices/GetZoneDevices.component';
import GetByMACAddress from '../device/subComponents/GetDevicebyMACAddress/GetByMACAddress.componet';

export default class Device extends Component {
  constructor() {
    super();
    this.state = {
      activeComponent: 'Update Device',
      selection: 'Update Device',
      endpoint: '/users/v2',
      method: 'GET',
      showToaster: true,
      companies: [],
      value: '',
      loading: true,
      devices: []
    };
  }
  data = [
    { key: 'POST', value: 'Get Devices', text: 'Get Devices' },
    { key: 'GET', value: 'Get Device', text: 'Get Device' },
    { key: 'PUT', value: 'Update Device', text: 'Update Device' },
    { key: 'GET', value: 'Get Device Threats', text: 'Get Device Threats' },
    {
      key: 'GET',
      value: 'Update Device Threat ',
      text: 'Update Device Threat'
    },
    { key: 'GET', value: 'Get Zone Devices', text: 'Get Zone Devices' },
    {
      key: 'GET',
      value: 'Get Agent Installer Link',
      text: 'Get Agent Installer Link'
    },
    { key: 'GET', value: 'Delete Devices', text: 'Delete Devices' },
    { key: 'GET', value: 'Get By MAC Address', text: 'Get By MAC Address' }
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
  fetchDevices = () => {
    axios
      .get(
        `${config.API_BASE_URL}all-devices?company_name=${
          this.state.value
        }&page=1&limit=1`
      )
      .then((res, status) => {
        this.setState({
          devices: res.data.data.device.page_items,
          showToaster: true,
          status: formatStatus(res.status),
          message: res.data.data.message
        });
      })
      .catch(err => console.log('ERR', JSON.stringify(err)));
  };

  showToaster = () => {
    let { status, message } = this.state;
    toast[status](message, {
      position: toast.POSITION.TOP_RIGHT
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
      case 'Get Devices':
        this.setState({ method: 'GET' });
        this.fetchDevices();
        break;
      case 'Get Device':
        this.setState({ method: 'GET' });
        break;
      case 'Update Device':
        this.setState({ method: 'PUT' });
        break;
      case 'Get Device Threats':
        this.setState({ method: 'GET' });
        break;
      case 'Update Device Threat':
        this.setState({ method: 'GET' });
        break;
      case 'Get Zone Devices':
        this.setState({ method: 'GET' });
        break;
      case 'Get Agent Installer Link':
        this.setState({ method: 'GET' });
        break;
      case 'Delete Device':
        this.setState({ method: 'GET' });
        break;
      case 'Get By MAC Address':
        this.setState({ method: 'GET' });
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
  switchDeviceComponents = () => {
    switch (this.state.activeComponent) {
      case 'Get Devices':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of Users resources belonging to a Tenant" />
            {this.state.devices.length === 0 ? (
              <LoaderGraphic />
            ) : (
              <Fragment>
                <GetDevices devices={this.state.devices} />
                {this.state.showToaster && this.showToaster()}
              </Fragment>
            )}
          </div>
        );
      case 'Get Device':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            <GetDevice />
          </div>
        );

      case 'Get Device Threats':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            <GetDeviceThreats />
          </div>
        );
      case 'Get Zone Devices':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            <GetZoneDevices />
          </div>
        );
      case 'Get By MAC Address':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            <GetByMACAddress />
          </div>
        );
    }
  };

  /**
   * @returns {object}
   * @member of DeviceComponent
   */
  render() {
    console.log(this.state);
    return (
      <div className="device-container">
        <BreadcrumbComponent page="Devices API" selection="Devices" />
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
                    disabled: false
                  });
                }}
                options={this.state.companies}
                loading={this.state.loading}
              />
            </div>
            <div>
              <Dropdown
                placeholder="Update Device"
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
        </div>
        {this.switchDeviceComponents()}
        <ToastContainer />
      </div>
    );
  }
}
