import React from 'react';
import { Input, Dropdown } from 'semantic-ui-react';

// styles
import './GlobalList.css';

const AddGlobalList = () => {
  return (
    <div className="add-global-list-container">
      <div className="btns">
        <div className="btns-row">
          <div>
            <span>First Name</span>
            <br />
            <Input placeholder="(required):{string}" />
          </div>
          <div>
            <span>Last Name</span>
            <br />
            <Input placeholder="(required):{string}" />
          </div>
          <div>
            <span>Email</span>
            <br />
            <Input placeholder="(required):{string}" />
          </div>
        </div>
        <div className="btns-row">
          <div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGlobalList;
