import React, { Component } from 'react';
import { Dropdown, Button, Tab } from 'semantic-ui-react';

// styles
import './AdminActions.css';
// components
import DeleteCompanies from './AdminSubComponents/DeleteCompanies/DeleteCompany.component';
import ListAdmins from './AdminSubComponents/ListAdmins/ListAdmins.component';
import ChangeAdmin from './AdminSubComponents/ChangeAdmin/ChangeAdmin.component';

class AdminActions extends Component {
  // const {
  //   handleChange,
  //   companies,
  //   handleDropdownchange,
  //   deleteCompany
  // } = props;
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
          <ListAdmins />
          <ListAdmins />
          <ListAdmins />
          <ListAdmins />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Change Admin',
      render: () => (
        <Tab.Pane attached={false}>
          <ChangeAdmin />
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
