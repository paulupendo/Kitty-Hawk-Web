import React, { Component } from 'react';
import { Input, Dropdown } from 'semantic-ui-react';

// styles
import './UpdateUser.css';

class UpdateUser extends Component {
  render() {
    const zoneOptions = [
      { key: 'User', value: 'User', text: 'User' },
      { key: 'Administrator', value: 'Administrator', text: 'Administrator' },
      { key: 'Zone Manager', value: 'Zone Manager', text: 'Zone Manager' },
    ];

    return (
      <div className="update-user-container">
        <div className="btns">
          <div className="btns-row">
            <div className="id">
              <span>User Id</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => this.props.handleInputChange(e, 'user_id')}
              />
            </div>
            <div>
              <span>First Name</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => this.props.handleInputChange(e, 'first_name')}
              />
            </div>
            <div>
              <span>Last Name</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => this.props.handleInputChange(e, 'last_name')}
              />
            </div>
          </div>
          <div className="btns-row">
            <div>
              <span>Email</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => this.props.handleInputChange(e, 'email')}
              />
            </div>
            <div>
              <span>Zone Id</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => this.props.handleInputChange(e, 'zoneId')}
              />
            </div>
            <div>
              <span>User Role</span> <br />
              <Dropdown
                selection
                placeholder="Select User Role"
                options={zoneOptions}
                onChange={this.props.handleUserRoleDropDown}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateUser;
