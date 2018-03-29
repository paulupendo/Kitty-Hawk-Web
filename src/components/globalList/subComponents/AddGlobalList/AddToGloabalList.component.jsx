import React from 'react';
import { Input } from 'semantic-ui-react';

// styles
import './GlobalList.css';

const AddGlobalList = () => {
  return (
    <div className="add-global-list-container">
      <div className="btns">
        <div className="btns-row">
          <div>
            <span>Sha256</span>
            <br />
            <Input placeholder="(required):{string}" />
          </div>
          <div>
            <span>List Type</span>
            <br />
            <Input placeholder="(required):{string}" />
          </div>
        </div>
        <div className="btns-row">
          <div>
            <span>Reason</span>
            <br />
            <Input placeholder="(required):{string}" />
          </div>
          <div>
            <span>Category</span>
            <br />
            <Input placeholder="(required):{string}" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGlobalList;
