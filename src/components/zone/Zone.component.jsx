import React, { Component } from 'react';

// third-part Libraries
import { Dropdown, Button } from 'semantic-ui-react';

//styles
import './Zone.css';

// components
import BreadcrumbComponent from '../../common/BreadCrumb.component';
import SubHeader from '../../common/Subheader/SubHeader.component';

export default class Policy extends Component {
  constructor() {
    super();
    this.state = {
      activeComponent: 'Create Zone',
      selection: 'Create Zone',
      endpoint: '/users/v2',
      method: 'GET'
    };
  }
  data = [
    { key: 'POST', value: 'Create Zone ', text: 'Create Zone' },
    { key: 'GET', value: 'Get Zones', text: 'Get Zones' },
    { key: 'PUT', value: 'Get Device Zones', text: 'Get Device Zones' },
    { key: 'GET', value: 'Get Zone', text: 'Get Zone' },
    { key: 'PUT', value: 'Update Zone', text: 'Update Zone' },
    { key: 'DELETE', value: 'Delete Zone', text: 'Delete Zone' },
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
      case 'Get Zones':
        this.setState({ method: 'GET' });
        break;
      case 'Create Zone':
        this.setState({ method: 'GET' });
        break;
      case 'Get Device Zones':
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
  switchGlobalComponents = () => {
    switch (this.state.activeComponent) {
      case 'Create Zone':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
          </div>
        );
      case 'Get Zones':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
          </div>
        );
      case 'Get Device Zones':
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
      <div className="zone-container">
        <BreadcrumbComponent page="Zone APi" selection={this.state.selection} />
        <div className="header-nav">
          <div className="dropdwn-nav">
            <div>
              <Dropdown placeholder="Select Company" search selection />
            </div>
            <div>
              <Dropdown
                placeholder="Create Zone"
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
        {this.switchGlobalComponents()}
      </div>
    );
  }
}
