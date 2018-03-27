import React, { Component } from 'react';

// third-part Libraries
import { Dropdown, Button } from 'semantic-ui-react';

//styles
import './Device.css';

// components
import BreadcrumbComponent from '../../common/BreadCrumb.component';
import SubHeader from '../../common/Subheader/SubHeader.component';
import GetDevices from './subComponents/GetDevices/GetDevices.component';

export default class Device extends Component {
  constructor() {
    super();
    this.state = {
      activeComponent: 'Get Devices',
      selection: 'Get Devices',
      endpoint: '/users/v2',
      method: 'GET'
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
    { key: 'GET', value: 'Delete Devices', text: 'Delete Devices' }
  ];

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
        break;
      case 'Get Device':
        this.setState({ method: 'GET' });
        break;
      case 'Update Device':
        this.setState({ method: 'GET' });
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
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            <GetDevices />
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
              <Dropdown placeholder="Select Company" search selection />
            </div>
            <div>
              <Dropdown
                placeholder="Get Devices"
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
