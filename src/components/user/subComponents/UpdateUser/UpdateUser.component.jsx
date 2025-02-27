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
              <span>ID</span>
              <br />
              <Input placeholder="(required):{string}" />
            </div>
            <div>
              <span>First Name</span>
              <br />
              <Input placeholder="(required):{string}" />
            </div>
            <div>
              <span>Last Name</span>
              <br />
              <Input placeholder="(required):{string}" />
            </div>
          </div>
          <div className="btns-row">
            <div>
              <span>User Role</span>
              <br />
              <Input placeholder="(required):{string}" />
            </div>
            <div>
              <span>Email</span>
              <br />
              <Input placeholder="(required):{string}" />
            </div>
            <div>
              <span>Zone</span> <br />
              <Dropdown
                selection
                placeholder="Select Zone"
                options={zoneOptions}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateUser;
