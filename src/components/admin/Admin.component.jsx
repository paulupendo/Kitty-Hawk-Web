import React, { Component } from 'react';
import { Tab, Button } from 'semantic-ui-react';
import axios from 'axios';

//styles
import './Admin.css';

// components
import CompanyInfo from './SubComponents/CompanyInfo.component';

// common components
import BreadcrumbComponent from '../../common/BreadCrumb.component';

export default class Admin extends Component {
  state = {
    name: null,
    company: null,
    email: null,
    phone_number: null,
    tenant_id: null,
    app_id: null,
    app_secret: null,
  };

  handleChange = (e, key) => {
    this.setState({ [key]: e.target.value });
  };

  handleClick = () => {
    let data_ = {
      name: this.state.name,
      email: this.state.email,
      phone_number: this.state.phone_number,
      company: this.state.company,
      tenant_id: this.state.tenant_id,
      app_id: this.state.app_id,
      app_secret: this.state.app_secret,
    };
    let url_ = 'http://127.0.0.1:5000/api/company-info';

    axios
      .post(url_, data_)
      .then(res => {
        console.log('RES', res);
        localStorage.setItem('access_token', res.data.access_token);
      })
      .catch(err => console.log('ERR', err));
  };

  panes = [
    {
      menuItem: 'Company Info',
      render: () => (
        <Tab.Pane attached={false}>
          <CompanyInfo handleChange={this.handleChange} />
          <Button content="AUTHORIZE" onClick={this.handleClick} />
        </Tab.Pane>
      ),
    },
  ];

  render() {
    return (
      <div className="admin-container">
        <BreadcrumbComponent page="Admin" selection="Company Info" />
        <div className="info-tabs">
          <Tab menu={{ secondary: true, pointing: true }} panes={this.panes} />
        </div>
      </div>
    );
  }
}
