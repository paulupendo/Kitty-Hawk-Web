import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';

// styles
import './CreateUser.css';

const CreateUser = ({ handleChange, handleDropDownChange }) => {
  const zoneOptions = [
    { key: 'User', value: 'User', text: 'User' },
    { key: 'Administrator', value: 'Administrator', text: 'Administrator' },
    { key: 'Zone Manager', value: 'Zone Manager', text: 'Zone Manager' },
  ];

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
            <Input
              placeholder="(required):{string}"
              onChange={e => handleChange(e, 'zoneId')}
            />
          </div>
          <div>
            <span>User Role</span>
            <br />
            <Dropdown
              selection
              placeholder="Select Role"
              options={zoneOptions}
              onChange={handleDropDownChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
