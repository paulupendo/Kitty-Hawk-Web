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
            <Input />
          </div>
          <div>
            <span>Company</span>
            <br />
            <Input />
          </div>
        </div>
        <div className="btns-row">
          <div>
            <span>Email</span>
            <br />
            <Input />
          </div>
          <div>
            <span>Phone</span>
            <br />
            <Input />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
