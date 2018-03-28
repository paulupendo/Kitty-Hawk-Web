import React, { Component } from 'react';

// third-part Libraries
import { Dropdown, Button } from 'semantic-ui-react';

//styles
import './Policy.css';

// components
import BreadcrumbComponent from '../../common/BreadCrumb.component';
import SubHeader from '../../common/Subheader/SubHeader.component';

export default class Global extends Component {
  constructor() {
    super();
    this.state = {
      activeComponent: 'Get Global List',
      selection: 'Get Global List',
      endpoint: '/users/v2',
      method: 'GET'
    };
  }
  data = [
    { key: 'POST', value: 'Create Policy', text: 'Create Policy' },
    { key: 'GET', value: 'Get Policy', text: 'Get Policy' },
    { key: 'GET', value: 'Get Policies', text: 'Get Policies' },
    { key: 'GET', value: 'Update Policy', text: 'Update Policy' },
    { key: 'GET', value: 'Delete Policy', text: 'Delete Policy' },
    { key: 'GET', value: 'Delete Policies', text: 'Delete Policies' }
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
      case 'Get Global List':
        this.setState({ method: 'GET' });
        break;
      case 'Add To Global List':
        this.setState({ method: 'GET' });
        break;
      case 'Get Policies':
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
      case 'Add To Global List':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
          </div>
        );
      case 'Get Global List':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
          </div>
        );
      case 'Get Policies':
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
      <div className="global-container">
        <BreadcrumbComponent
          page="Policy API"
          selection={this.state.selection}
        />
        <div className="header-nav">
          <div className="dropdwn-nav">
            <div>
              <Dropdown placeholder="Select Company" search selection />
            </div>
            <div>
              <Dropdown
                placeholder="Add To Global List"
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
