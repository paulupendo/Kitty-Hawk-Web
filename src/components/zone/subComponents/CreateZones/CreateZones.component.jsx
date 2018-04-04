import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';

// styles
import './CreateZones.css';

const CreateZones = () => {
  const zoneOptions = [{ key: 'High', value: 'High', text: 'High' }];

  return (
    <div className="create-zones-container">
      <div className="create-input">
        <div className="btns-row">
          <div>
            <span>Name</span>
            <br />
            <Input placeholder="(required):{string}" />
          </div>
          <div>
            <span>Policy Id</span>
            <br />
            <Input placeholder="(required):{string}" />
          </div>
          <div>
            <span>Zone</span> <br />
            <Dropdown
              selection
              placeholder="Criticality"
              options={zoneOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateZones;
