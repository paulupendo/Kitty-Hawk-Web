import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';

// styles
import './CreateUser.css';

const CreateUser = () => {
  return (
    <div className="create-user-container">
      <div className="btns">
        <div className="btns-row">
          <div>
            <span>First Name</span>
            <br />
            <Input />
          </div>
          <div>
            <span>Last Name</span>
            <br />
            <Input />
          </div>
        </div>
        <div className="btns-row">
          <div>
            <span>User Role</span>
            <br />
            <Input />
          </div>
          <div>
            <span>Email</span>
            <br />
            <Input />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
