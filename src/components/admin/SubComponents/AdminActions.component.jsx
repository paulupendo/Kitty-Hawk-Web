import React, { Component } from 'react';
import { Dropdown, Button, Tab } from 'semantic-ui-react';
import axios from 'axios';
import { config } from '../../../config';
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
      companies: []
    };
  }

  componentDidMount() {
    axios
      .get(`${config.API_BASE_URL}company-info`)
      .then(res => {
        this.setState({
          loading: false,
          companies: res.data.data.companies
        });
      })
      .catch(err => err);
  }

  actionPanes = [
    {
      menuItem: 'Delete Company',
      render: () => (
        <Tab.Pane attached={false}>
          <DeleteCompanies />
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
