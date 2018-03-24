import React, { Component } from 'react';

// common components
import Header from '../common/Header.component';
import SideBar from '../common/SideBar.component';

// api components
import Admin from '../components/admin/Admin.component';
import User from '../components/user/User.component';
import Device from '../components/device/Device.component';
import Global from '../components/globalList/GlobalList.component';
import Policy from '../components/policy/Policy.component';
import Zone from '../components/zone/Zone.component';
import Threat from '../components/threat/Threat.component';

// styles
import './Main.css';

export default class Main extends Component {
  state = { activeItem: 'user' };

  handleItemClick = (e, { name }) => {
    let names_sub = name.split(' ');
    this.setState({ activeItem: names_sub[0] });
  };

  componentSwitch = () => {
    switch (this.state.activeItem) {
      case 'admin':
        return <Admin />;
      case 'user':
        return <User />;
      case 'device':
        return <Device />;
      case 'global':
        return <Global />;
      case 'policy':
        return <Policy />;
      case 'zone':
        return <Zone />;
      case 'threat':
        return <Threat />;

      default:
        return null; /** Have a 4Oh4 Page here */
    }
  };

  render() {
    return (
      <div className="container">
        <Header />
        <div className="inner-conatiner">
          <div>
            <SideBar
              activeItem={this.state.activeItem}
              handleItemClick={this.handleItemClick}
            />
          </div>
          <div className="container-right">{this.componentSwitch()}</div>
        </div>
      </div>
    );
  }
}
