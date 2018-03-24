import React from 'react';
import { Input } from 'semantic-ui-react';

// styles
import './Credentials.css';

const Credentials = () => {
  return (
    <div className="credentials-container">
      <div className="btns">
        <div className="btns-row">
          <div>
            <span>Tenant ID</span>
            <br />
            <Input />
          </div>
          <div>
            <span>Application ID</span>
            <br />
            <Input />
          </div>
        </div>
        <div className="btns-row">
          <div>
            <span>Application Secret</span>
            <br />
            <Input type="password" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credentials;
