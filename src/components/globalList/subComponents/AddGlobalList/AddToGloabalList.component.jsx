import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';

// styles
import './GlobalList.css';

const AddGlobalList = ({ handleChange, handleDropDown }) => {
  const ListOptions = [
    {
      key: 'GlobalQuarantine',
      value: 'GlobalQuarantine',
      text: 'Global Quarantine'
    },
    { key: 'GlobalSafe', value: 'GlobalSafe', text: 'Global Safe' }
  ];
  const Category = [
    { key: 'Admin Tool', value: 'Admin Tool', text: 'Admin Tool' },
    {
      key: 'Commercial Software',
      value: 'Commercial Software',
      text: 'Commercial Software'
    },
    { key: 'Drivers', value: 'Drivers', text: 'Drivers' },
    {
      key: 'Internal Application',
      value: 'Internal Application',
      text: 'Internal Application'
    },
    {
      key: 'Operating System',
      value: 'Operating System',
      text: 'Operating System'
    },
    {
      key: 'Security Software',
      value: 'Security Software',
      text: 'Security Software'
    },
    { key: 'None', value: 'None', text: 'None' }
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
              onChange={(e, value) => handleDropDown(e, 'list_type', value)}
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
              placeholder="Select Category"
              options={Category}
              onChange={(e, value) => handleDropDown(e, 'category', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGlobalList;
