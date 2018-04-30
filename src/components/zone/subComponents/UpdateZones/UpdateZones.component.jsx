import React, { Component } from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { config } from '../../../../config';

// styles
import './UpdateZones.css';
class UpdateZones extends Component {
  constructor() {
    super();
    this.state = {
      selectedPolicies: [],
      selectedZones: [],
      isLoadingProps_: false
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
        selectedPolicies: nextProps.getPolicies.map(policy => {
          return { value: policy.id, text: policy.id };
        })
      });
    }
  }

  render() {
    const zoneOptions = [
      { key: 'High', value: 'High', text: 'High' },
      { key: 'Normal', value: 'Normal', text: 'Normal' },
      { key: 'Low', value: 'Low', text: 'Low' }
    ];
    const { handleChange, handleDropDown } = this.props;
    return (
      <div className="create-zones-container">
        <div className="update-input">
          <div className="btns-row">
            <div>
              <span>Zone Id</span>
              <br />
              <Dropdown
                search
                selection
                placeholder="Select policy Id"
                options={this.state.selectedZones}
                loading={this.state.isLoadingProps_}
                onChange={(e, value) => handleDropDown(e, 'zone_id', value)}
              />
            </div>
            <div>
              <span>Name</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => handleChange(e, 'name')}
              />
            </div>
            <div>
              <span>Policy Id</span>
              <br />
              <Dropdown
                search
                selection
                placeholder="Select policy Id"
                options={this.state.selectedPolicies}
                loading={this.state.isLoadingProps_}
                onChange={(e, value) => handleDropDown(e, 'policyId', value)}
              />
            </div>
          </div>
          <div className="btns-row">
            <div>
              <span>Criticality</span> <br />
              <Dropdown
                selection
                placeholder="Criticality"
                options={zoneOptions}
                onChange={(e, value) => handleDropDown(e, 'criticality', value)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateZones;
