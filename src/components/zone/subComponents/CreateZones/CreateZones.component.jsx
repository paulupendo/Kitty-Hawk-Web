import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';

// styles
import './CreateZones.css';

const CreateZones = ({ handleChange, handleDropDownChange }) => {
  const zoneOptions = [
    { key: 'High', value: 'High', text: 'High' },
    { key: 'Normal', value: 'Normal', text: 'Normal' },
    { key: 'Low', value: 'Low', text: 'Low' },
  ];

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
            <Input
              placeholder="(required):{string}"
              onChange={e => handleChange(e, 'policyId')}
            />
          </div>
          <div>
            <span>Zone</span> <br />
            <Dropdown
              selection
              placeholder="Criticality"
              options={zoneOptions}
              onChange={handleDropDownChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateZones;
