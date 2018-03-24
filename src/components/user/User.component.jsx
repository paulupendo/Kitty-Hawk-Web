import React, { Component } from "react";
import { Dropdown, Button, Segment } from "semantic-ui-react";

// styles
import "./User.css";

// componnents
import BreadcrumbComponent from "../../common/BreadCrumb.component";
import { CallOptions } from "../../common/DropdownOptions.component";

export default class User extends Component {
  data = [
    { key: "POST", value: "Create User", text: "Create User" },
    { key: "GET", value: "Get Users", text: "Get Users" }
  ];
  render() {
    return (
      <div className="user-container">
        <BreadcrumbComponent page="User API" selection="Get Users" />
        <div className="header-nav">
          <div classNaame="dropdwn-nav">
            <Dropdown placeholder="Select Company" search selection/>
            <Dropdown placeholder="Create User" fluid selection options={this.data} />
          </div>
          <div className="call-btn">
            <Button content="GET" />
          </div>
        </div>
        <div />
      </div>
    );
  }
}
