import React, { Component } from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { config } from '../../../../config';

// styles
import './CreateUser.css';

class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      isLoadingProps_: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      axios
        .get(
          `${config.API_BASE_URL}zones?company_name=${nextProps.value}`,
          this.setState({
            isLoadingProps_: true
          })
        )
        .then(res => {
          this.setState({
            isLoadingProps_: false,
            selected: res.data.data.page_items.map(zone => {
              return {
                value: zone.id,
                text: zone.id
              };
            })
          });
        })
        .catch(err => this.setState({ isLoadingProps_: false }));
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
      <div className="create-user-container">
        <div className="create-input">
          <div className="btns-row">
            <div>
              <span>First Name</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => handleChange(e, 'first_name')}
              />
            </div>
            <div>
              <span>Last Name</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => handleChange(e, 'last_name')}
              />
            </div>
          </div>
          <div className="btns-row">
            <div>
              <span>Email</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => handleChange(e, 'email')}
              />
            </div>
            <div>
              <span>Zone Id</span> <br />
              <Dropdown
                search
                selection
                placeholder="Select Zone Id"
                options={this.state.selected}
                loading={this.state.isLoadingProps_}
                onChange={(e, value) => handleDropDown(e, 'zone_id', value)}
              />
            </div>
          </div>
          <div className="btns-row">
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

export default CreateUser;
