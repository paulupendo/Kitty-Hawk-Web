import React, { Component } from 'react';
import { Breadcrumb } from 'semantic-ui-react';

//styles
import './Admin.css';

// common components
import BreadcrumbComponent from '../../common/BreadCrumb.component';

export default class Admin extends Component {
  render() {
    return (
      <div className="admin-container">
        <BreadcrumbComponent page="Admin" selection="Company Info" />
      </div>
    );
  }
}
