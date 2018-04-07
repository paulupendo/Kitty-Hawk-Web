import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';

// styles
import './GlobalList.css';

const AddGlobalList = ({ handleChange, handleDropDown }) => {
  const ListOptions = [
    { key: 'User', value: 'User', text: 'User' },
    { key: 'Administrator', value: 'Administrator', text: 'Administrator' },
    { key: 'Zone Manager', value: 'Zone Manager', text: 'Zone Manager' }
  ];

  return (
    <div className="add-global-list-container">
      <div className="btns">
        <div className="btns-row">
          <div>
            <span>Sha256</span>
            <br />
            <Input
              placeholder="(required):{string}"
              onChange={e => handleChange(e, 'sha256')}
            />
          </div>
          <div>
            <span>List Type</span>
            <br />
            <Dropdown
              selection
              placeholder="List Type"
              options={ListOptions}
              onChange={handleDropDown}
            />
          </div>
        </div>
        <div className="btns-row">
          <div>
            <span>Reason</span>
            <br />
            <Input
              placeholder="(required):{string}"
              onChange={e => handleChange(e, 'reason')}
            />
          </div>
          <div>
            <span>Category</span>
            <br />
            <Dropdown
              selection
              placeholder="Select Role"
              options={ListOptions}
              onChange={e => handleDropDown(e, 'category')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGlobalList;
