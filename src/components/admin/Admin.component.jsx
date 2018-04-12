import React, { Component } from 'react';
import { Tab, Button } from 'semantic-ui-react';
import iziToast from 'izitoast';

// Axios
import axios from 'axios';
import { config } from '../../config';
//styles
import './Admin.css';

// components
import CompanyInfo from './SubComponents/CompanyInfo.component';
import AdminActions from './SubComponents/AdminActions.component';

// common components
import BreadcrumbComponent from '../../common/BreadCrumb.component';
import toaster from '../../common/Status/status.component';

const BASE_URL = `https://cyapi-db.herokuapp.com`;
export default class Admin extends Component {
  state = {
    companies: [],
    value: '',
    name: null,
    company: null,
    email: null,
    phone_number: null,
    tenant_id: null,
    app_id: null,
    app_secret: null,
    comment: null,
    status: '',
    message: ' ',
    showToaster: false,
    loading: false
  };

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

  handleDropdownchange = (_, { value }) => {
    this.setState({
      value
    });
  };

  handleDelete = () => {
    axios
      .delete(
        `${config.API_BASE_URL}company-info?company_name=${this.state.value}`
      )
      .then(res => {
        toaster(res.data.data.message);
      })
      .catch(err =>
        iziToast.error({
          title: 'Error',
          message: 'An error occured!',
          position: 'topRight'
        })
      );
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
      comment: this.state.comment
    };
    let url_ = `${BASE_URL}/api/company-info`;
    this.setState({ loading: true }, () => {
      axios
        .post(url_, data_)
        .then(res => {
          this.setState({
            loading: false,
            message: res.data.data.message
          });
          iziToast.show({
            title: 'SUCCESS',
            message: res.data.data.message,
            position: 'topRight',
            color: 'green',
            progressBarColor: 'rgb(0, 255, 184)'
          });
        })
        .catch(err => {
          this.setState({ loading: false });
          iziToast.error({
            title: 'Error',
            message: 'An error occured!',
            position: 'topRight'
          });
        });
    });
  };

  panes = [
    {
      menuItem: 'Company Info',
      render: () => (
        <Tab.Pane attached={false}>
          <CompanyInfo handleChange={this.handleChange} />
          <Button
            content="AUTHORIZE"
            onClick={this.handleClick}
            loading={this.state.loading}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Admin Actions',
      render: () => (
        <Tab.Pane attached={false}>
          <AdminActions
            companies={this.state.companies}
            handleDropdownchange={this.handleDropdownchange}
            deleteCompany={this.handleDelete}
          />
        </Tab.Pane>
      )
    }
  ];

  render() {
    return (
      <div className="admin-container">
        <BreadcrumbComponent page="Admin" selection="Company Info" />
        <div className="info-tabs">
          <Tab menu={{ secondary: true }} panes={this.panes} />
        </div>
      </div>
    );
  }
}
