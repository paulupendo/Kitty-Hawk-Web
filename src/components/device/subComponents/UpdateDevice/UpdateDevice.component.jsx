import React, { Component } from 'react';
import { Input, Dropdown } from 'semantic-ui-react';

// styles
import './UpdateDevice.css';

class UpdateDevice extends Component {
  render() {
    const zoneOptions = [
      { key: 'User', value: 'User', text: 'User' },
      { key: 'Administrator', value: 'Administrator', text: 'Administrator' },
      { key: 'Zone Manager', value: 'Zone Manager', text: 'Zone Manager' }
    ];

    return (
      <div className="update-device-container">
        <div className="btns">
          <div className="btns-row">
            <div className="id">
              <span>Name</span>
              <br />
              <Input placeholder="(required):{string}" />
            </div>
            <div>
              <span>Policy ID</span>
              <br />
              <Input placeholder="(required):{string}" />
            </div>
            <div>
              <span>Add Zone</span> <br />
              <Dropdown
                selection
                placeholder="Select Zone"
                options={zoneOptions}
              />
            </div>
          </div>
          <div className="btns-row">
            <div>
              <span>Remove Zone</span>
              <br />
              <Input placeholder="(required):{string}" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateDevice;
