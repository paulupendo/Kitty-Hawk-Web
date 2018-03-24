import React, { Component } from 'react';
import {Tab, Button } from 'semantic-ui-react';

//styles
import './Admin.css';

// component
import CompanyInfo from './SubComponents/CompanyInfo.component';
import Credentials from './SubComponents/Credentials.component';

// common components
import BreadcrumbComponent from '../../common/BreadCrumb.component';

const panes = [
  {
    menuItem: 'Company Info',
    render: () => (
      <Tab.Pane attached={false}>
        <CompanyInfo />
        <Button content="NEXT" />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Credentials',
    render: () => (
      <Tab.Pane attached={false}>
        <Credentials />
        <Button content="AUTHORIZE" />
      </Tab.Pane>
    ),
  },
];

export default class Admin extends Component {
  render() {
    return (
      <div className="admin-container">
        <BreadcrumbComponent page="Admin" selection="Company Info" />
        <div className="info-tabs">
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </div>
      </div>
    );
  }
}
