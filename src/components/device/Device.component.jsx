import React, { Component, Fragment } from 'react';
import { config } from '../../config';

// third-part Libraries
import { Dropdown, Button } from 'semantic-ui-react';
import iziToast from 'izitoast';

// axios
import axios from 'axios';

//styles
import './Device.css';

// components
import BreadcrumbComponent from '../../common/BreadCrumb.component';

import SubHeader from '../../common/Subheader/SubHeader.component';
import toaster from '../../common/Status/status.component';
import LoaderGraphic from '../../common/Loader/loader.component';
import GetDevices from './subComponents/GetDevices/GetDevices.component';
import GetDevice from '../device/subComponents/GetDevice/GetDevice.components';
import GetDeviceThreats from '../device/subComponents/GetDeviceThreats/GetDeviceThreats.component';
import GetZoneDevices from '../device/subComponents/GetZoneDevices/GetZoneDevices.component';
import GetByMACAddress from '../device/subComponents/GetDevicebyMACAddress/GetByMACAddress.componet';
import UpdateDevice from './subComponents/UpdateDevice/UpdateDevice.component';
import DeleteDevices from './subComponents/DeleteDevices/DeleteDevices.component';

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
      devices: [],
      name: null,
      policy_id: null,
      add_zone_ids: '',
      remove_zone_ids: ''
    };
  }

  data = [
    { key: 'POST-device', value: 'Get Devices', text: 'Get Devices' },
    { key: 'GET-device', value: 'Get Device', text: 'Get Device' },
    { key: 'PUT-device', value: 'Update Device', text: 'Update Device' },
    {
      key: 'GET-device-threats',
      value: 'Get Device Threats',
      text: 'Get Device Threats'
    },
    {
      key: 'GET-device-zone',
      value: 'Get Zone Devices',
      text: 'Get Zone Devices'
    },
    { key: 'DELETE-devices', value: 'Delete Devices', text: 'Delete Devices' },
    {
      key: 'GET-device-MAC',
      value: 'Get By MAC Address',
      text: 'Get By MAC Address'
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

  handleInputChange = (e, key) => {
    this.setState({ [key]: e.target.value });
  };

  updateDevice_ = () => {
    let {
      name,
      policy_id,
      add_zone_ids,
      remove_zone_ids,
      device_id
    } = this.state;

    let data = {
      name,
      policy_id
    };

    let url_ = `${config.API_BASE_URL}single-device/${device_id}?company_name=${
      this.state.value
    }`;

    axios
      .put(url_, data)
      .then(res => console.log(res))
      .catch(err => console.log('E', err));
  };

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
      .then(res => {
        this.setState({
          devices: res.data.data.device.page_items
        });
        // toaster(res.data.data.message);
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
      case 'Get Devices':
        this.setState({ method: 'GET' });
        this.fetchDevices();
        break;
      case 'Get Device':
        this.setState({ method: 'GET' });
        this.fetchDevices();
        break;
      case 'Update Device':
        this.setState({ method: 'PUT' });
        break;
      case 'Get Device Threats':
        this.setState({ method: 'GET' });
        this.fetchDevices();
        break;
      case 'Update Device Threat':
        this.setState({ method: 'GET' });
        break;
      case 'Get Zone Devices':
        this.setState({ method: 'GET' });
        break;
      case 'Delete Devices':
        this.setState({ method: 'GET' });
        this.fetchDevices();
        break;
      case 'Get By MAC Address':
        this.setState({ method: 'GET' });
        this.fetchDevices();
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
      case 'Update Device':
        return (
          <div>
            <SubHeader info="Allows a caller to update a specific Console device resource belonging to a Tenant." />
            <UpdateDevice handleInputChange={this.handleInputChange} />
            <div className="btn-bottom">
              <Button content="UPDATE DEVICE" onClick={this.updateDevice_} />
            </div>
          </div>
        );
      case 'Get Devices':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of Users resources belonging to a Tenant" />
            {this.state.devices.length === 0 ? (
              <LoaderGraphic />
            ) : (
              <Fragment>
                <GetDevices devices={this.state.devices} />
              </Fragment>
            )}
          </div>
        );
      case 'Get Device':
        return (
          <div>
            <SubHeader info="Allows a caller to request a specific device resource belonging to a Tenant." />
            <GetDevice
              value={this.state.value}
              getDevices={this.state.devices}
            />
          </div>
        );

      case 'Get Device Threats':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            <GetDeviceThreats
              value={this.state.value}
              getThreatDevice={this.state.devices}
            />
          </div>
        );
      case 'Get Zone Devices':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of Console device resources belonging to a Zone," />
            <GetZoneDevices value={this.state.value} />
          </div>
        );
      case 'Get By MAC Address':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            <GetByMACAddress
              value={this.state.value}
              getDevices={this.state.devices}
            />
          </div>
        );
      case 'Delete Devices':
        return (
          <div>
            <SubHeader info="Allows a caller to delete one or more devices from an organization." />
            <DeleteDevices
              value={this.state.value}
              getDevices={this.state.devices}
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
      </div>
    );
  }
}
