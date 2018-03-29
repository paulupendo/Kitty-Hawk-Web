import React, { Component } from 'react';

// third-part Libraries
import { Dropdown, Button } from 'semantic-ui-react';

//styles
import './Global.css';

// components
import BreadcrumbComponent from '../../common/BreadCrumb.component';
import SubHeader from '../../common/Subheader/SubHeader.component';
import AddGlobalList from './subComponents/AddGlobalList/AddToGloabalList.component';

export default class Global extends Component {
  constructor() {
    super();
    this.state = {
      activeComponent: 'Add To Global List',
      selection: 'Add To Global List',
      endpoint: '/users/v2',
      method: 'POST'
    };
  }
  data = [
    { key: 'POST', value: 'Add To Global List ', text: 'Add To Global List' },
    { key: 'GET', value: 'Get Global List', text: 'Get Global List' },
    {
      key: 'PUT',
      value: 'Delete Device Global List',
      text: 'Delete Device Global List'
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
      case 'Add To Global List':
        this.setState({ method: 'POST' });
        break;
      case 'Get Global List':
        this.setState({ method: 'GET' });
        break;
      case 'Delete Device Global List':
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
            <AddGlobalList value={this.state.value}/>
          </div>
        );
      // case 'Get Global List':
      //   return (
      //     <div>
      //       <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
      //     </div>
      //   );
      // case 'Delete Device Global List':
      //   return (
      //     <div>
      //       <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
      //     </div>
      //   );
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
          page="Global List API"
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
