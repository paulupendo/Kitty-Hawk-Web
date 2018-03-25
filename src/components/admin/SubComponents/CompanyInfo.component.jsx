import React from 'react';
import { Input } from 'semantic-ui-react';

// styles
import './CompanyInfo.css';

const CompanyInfo = () => {
  return (
    <div className="company-container">
      <div className="btns">
        <div className="btns-row">
          <div>
            <span>Name</span>
            <br />
            <Input placeholder="(optional):{string}" />
          </div>
          <div>
            <span>Company</span>
            <br />
            <Input placeholder="(optional):{string}" />
          </div>
          <div>
            <span>Email</span>
            <br />
            <Input placeholder="(optional):{string}" />
          </div>
        </div>
        <div className="btns-row">
          <div>
            <span>Phone</span>
            <br />
            <Input placeholder="(optional):{string}" />
          </div>
          <div>
            <span>Tenant ID</span>
            <br />
            <Input placeholder="(required):{string}" />
          </div>
          <div>
            <span>Application ID</span>
            <br />
            <Input placeholder="(required):{string}" />
          </div>
        </div>
        <div className="btns-row">
          <div>
            <span>Application Secret</span>
            <br />
            <Input type="password" placeholder="(required):{string}" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
