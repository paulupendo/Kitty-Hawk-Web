import React, { Component } from 'react';
import { Input, Dropdown } from 'semantic-ui-react';

// styles
import './UpdateUser.css';

class UpdateUser extends Component {
  constructor() {
    super();
    this.state = {
      selectedUsers: [],
      selectedZones: [],
      isLoadingProps_: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        isLoadingProps_: false,
        selectedZones: nextProps.getZones.map(zone => {
          return {
            value: zone.id,
            text: zone.id
          };
        }),
        selectedUsers: nextProps.fetchUsers.map(user => {
          return { value: user.id, text: user.id };
        })
      });
    }
  }

  render() {
    const zoneOptions = [
      { key: 'User', value: 'User', text: 'User' },
      { key: 'Administrator', value: 'Administrator', text: 'Administrator' },
      { key: 'Zone Manager', value: 'Zone Manager', text: 'Zone Manager' }
    ];
    const { handleChange, handleDropDown } = this.props;
    return (
      <div className="update-user-container">
        <div className="btns">
          <div className="btns-row">
            <div className="id">
              <span>User Id</span>
              <br />
              <Dropdown
                selection
                placeholder="Select User ID"
                options={this.state.selectedUsers}
                onChange={(e, value) => handleDropDown(e, 'user_id', value)}
              />
            </div>
            <div>
              <span>First Name</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => this.props.handleChange(e, 'first_name')}
              />
            </div>
          </div>
          <div className="btns-row">
            <div>
              <span>Last Name</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => this.props.handleChange(e, 'last_name')}
              />
            </div>
            <div>
              <span>Email</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => this.props.handleChange(e, 'email')}
              />
            </div>
          </div>
          <div className="btns-row">
            <div>
              <span>Zone Id</span>
              <br />
              <Dropdown
                search
                selection
                placeholder="Select Zone Id"
                options={this.state.selectedZones}
                loading={this.state.isLoadingProps_}
                onChange={(e, value) => handleDropDown(e, 'zone_id', value)}
              />
            </div>
            <div>
              <span>User Role</span>
              <br />
              <Dropdown
                selection
                placeholder="Select Role"
                options={zoneOptions}
                onChange={(e, value) => handleDropDown(e, 'user_role', value)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateUser;
