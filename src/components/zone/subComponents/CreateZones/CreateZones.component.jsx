import React, { Component } from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import { config } from '../../../../config';

// styles
import './CreateZones.css';

class CreateZones extends Component {
  constructor() {
    super();
    this.state = {
      selectedPolicies: [],
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
        <div className="create-input">
          <div className="btns-row">
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

export default CreateZones;
