import React, { Component } from 'react';
import { Input, Dropdown } from 'semantic-ui-react';

// styles
import './UpdateDevice.css';

class UpdateDevice extends Component {
  render() {
    return (
      <div className="update-device-container">
        <div className="btns">
          <div className="btns-row">
            <div className="id">
              <span>Device Id</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => this.props.handleInputChange(e, 'device_id')}
              />
            </div>
            <div className="id">
              <span>Name</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => this.props.handleInputChange(e, 'name')}
              />
            </div>
            <div>
              <span>Policy Id</span>
              <br />
              <Input
                placeholder="(required):{string}"
                onChange={e => this.props.handleInputChange(e, 'policy_id')}
              />
            </div>
          </div>
          <div className="btns-row">
            <div>
              <span>Add Zone Ids</span>
              <br />
              <Input
                disabled
                placeholder="(optional):{string}"
                onChange={e => this.props.handleInputChange(e, 'add_zone_ids')}
              />
            </div>
            <div>
              <span>Remove Zone Ids</span>
              <br />
              <Input
                disabled
                placeholder="(optional):{string}"
                onChange={e =>
                  this.props.handleInputChange(e, 'remove_zone_ids')
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateDevice;
