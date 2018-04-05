import React, { Component } from 'react';
import { Tab, Button } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import iziToast from 'izitoast';

// Axios
import axios from 'axios';

//styles
import './Admin.css';

// components
import CompanyInfo from './SubComponents/CompanyInfo.component';

// common components
import BreadcrumbComponent from '../../common/BreadCrumb.component';
import formatStatus from '../../common/Status/status.component';

const BASE_URL = `https://cyapi-db.herokuapp.com`;
export default class Admin extends Component {
  state = {
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
    loading: false,
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
      comment: this.state.comment,
    };
    let url_ = `${BASE_URL}/api/company-info`;
    this.setState({ loading: true }, () => {
      axios
        .post(url_, data_)
        .then(res => {
          this.setState({
            loading: false,
            status: formatStatus(res.status),
            message: res.data.data.message,
          });
          iziToast.show({
            title: 'SUCCESS',
            message: res.data.data.message,
            position: 'topRight',
            color: 'green',
            progressBarColor: 'rgb(0, 255, 184)',
          });
        })
        .catch(err => {
          this.setState({ loading: false });
          iziToast.error({
            title: 'Error',
            message: 'An error occured!',
            position: 'topRight',
          });
        });
    });
  };
  showToaster = () => {
    let { status, message } = this.state;
    toast[status](message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  panes = [
    {
      menuItem: 'Company Info',
      render: () => (
        <Tab.Pane attached={false}>
          <CompanyInfo handleChange={this.handleChange} />
          {this.state.showToaster && this.showToaster()}
          <Button
            content="AUTHORIZE"
            onClick={this.handleClick}
            loading={this.state.loading}
          />
          <ToastContainer />
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
