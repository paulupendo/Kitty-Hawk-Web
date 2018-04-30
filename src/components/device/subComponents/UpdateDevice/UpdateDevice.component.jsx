import React, { Component } from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { config } from '../../../../config';

// styles
import './UpdateDevice.css';

class UpdateDevice extends Component {
  constructor() {
    super();
    this.state = {
      selectedPolicies: [],
      selectedDevices: [],
      isLoadingProps_: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      axios
        .get(
          `${config.API_BASE_URL}policies?company_name=${nextProps.value}`,
          this.setState({
            isLoadingProps_: true
          })
        )
        .then(res => {
          this.setState({
            isLoadingProps_: false,
            selectedPolicies: res.data.data.page_items.map(policy => {
              return {
                value: policy.id,
                text: policy.id
              };
            })
          });
        })
        .catch(err => console.log(err));
      axios
        .get(
          `${config.API_BASE_URL}all-devices?company_name=${
            nextProps.value
          }&page=1&limit=1`,
          this.setState({
            isLoadingProps_: true
          })
        )
        .then(res => {
          this.setState({
            isLoadingProps_: false,
            selectedDevices: res.data.data.device.page_items.map(device => {
              return {
                value: device.id,
                text: device.id
              };
            })
          });
        })
        .catch(err => console.log(err));
    }
  }
  
  render() {
    const { handleChange, handleDropDown } = this.props;
    return (
      <div className="update-device-container">
        <div className="btns">
          <div className="btns-row">
            <div className="id">
              <span>Device Id</span>
              <br />
              <Dropdown
                search
                selection
                placeholder="Select device Id"
                options={this.state.selectedDevices}
                loading={this.state.isLoadingProps_}
                onChange={(e, value) => handleDropDown(e, 'device_id', value)}
              />
            </div>
            <div className="id">
              <span>Name</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => handleChange(e, 'name')}
              />
            </div>
          </div>
          <div className="btns-row">
            <div>
              <span>Policy Id</span>
              <br />
              <Dropdown
                search
                selection
                placeholder="Select policy Id"
                options={this.state.selectedPolicies}
                loading={this.state.isLoadingProps_}
                onChange={(e, value) => handleDropDown(e, 'policy_id', value)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateDevice;
