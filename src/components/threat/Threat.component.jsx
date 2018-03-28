import React, { Component } from 'react';

// third-part Libraries
import { Dropdown, Button } from 'semantic-ui-react';

//styles
import './Threat.css';

// components
import BreadcrumbComponent from '../../common/BreadCrumb.component';
import SubHeader from '../../common/Subheader/SubHeader.component';

export default class Policy extends Component {
  constructor() {
    super();
    this.state = {
      activeComponent: 'Get Threats',
      selection: 'Get Threats',
      endpoint: '/users/v2',
      method: 'GET'
    };
  }
  data = [
    { key: 'POST', value: 'Get Threat ', text: 'Get Threat' },
    { key: 'GET', value: 'Get Threats', text: 'Get Threats' },
    { key: 'PUT', value: 'Get Threat Devices', text: 'Get Threat Devices' },
    {
      key: 'GET',
      value: 'Get Threat Download URL',
      text: 'Get Threat Download URL'
    }
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
      case 'Get Threats':
        this.setState({ method: 'GET' });
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
          </div>
        );
      case 'Get Threats':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
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
      <div className="policy-container">
        <BreadcrumbComponent
          page="Threat API"
          selection={this.state.selection}
        />
        <div className="header-nav">
          <div className="dropdwn-nav">
            <div>
              <Dropdown placeholder="Select Company" search selection />
            </div>
            <div>
              <Dropdown
                placeholder="Get Threat"
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
        {this.switchThreatComponents()}
      </div>
    );
  }
}
