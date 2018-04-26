import React, { Component } from 'react';
import { Button, Tab } from 'semantic-ui-react';
import axios from 'axios';
import iziToast from 'izitoast';
import { config } from '../../../config';
import toaster from '../../../common/Status/status.component'
// styles
import './AdminActions.css';

// components
import DeleteCompanies from './AdminSubComponents/DeleteCompanies/DeleteCompany.component';
import ListAdmins from './AdminSubComponents/ListAdmins/ListAdmins.component';
import ChangeAdmin from './AdminSubComponents/ChangeAdmin/ChangeAdmin.component';

class AdminActions extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      value: ''
    };
  }

  componentDidMount() {
    axios
      .get(`${config.API_BASE_URL}company-info`)
      .then(res => {
        this.setState({
          loading: false,
          companies: res.data.data.companies.map(company => {
            return {
              value: company.name,
              text: company.name
            };
          })
        });
      })
      .catch(err => err);
  }

  handleDropdownchange = (_, { value }) => {
    this.setState({ value });
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

  actionPanes = [
    {
      menuItem: 'Delete Company',
      render: () => (
        <Tab.Pane attached={false}>
          <DeleteCompanies 
          companies={this.state.companies}
          handleDropdownchange={this.handleDropdownchange}
          handleChange={this.handleChange}
          deleteCompany={this.deleteCompany}
          />
          {/* <Button
            content="AUTHORIZE"
            // onClick={this.handleClick}
            // loading={this.state.loading}
          /> */}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'List Admins',
      render: () => (
        <Tab.Pane attached={false}>
          <ListAdmins />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Change Admin',
      render: () => (
        <Tab.Pane attached={false}>
          <ChangeAdmin />
          <Button content="Upadate" />
        </Tab.Pane>
      )
    }
  ];
  render() {
    return (
      <div className="actions-container">
        <div className="action-tabs">
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={this.actionPanes}
          />
        </div>
      </div>
    );
  }
}

export default AdminActions;
