import React from 'react';
import { Input } from 'semantic-ui-react';

// styles
import './CompanyInfo.css';

const CompanyInfo = props => {
  const { handleChange } = props;
  return (
    <div className="company-container">
      <div className="btns">
        <div className="btns-row">
          <div>
            <span>Name</span>
            <br />
            <Input
              placeholder="(optional):{string}"
              onChange={e => handleChange(e, 'name')}
            />
          </div>
          <div>
            <span>Company</span>
            <br />
            <Input
              placeholder="(optional):{string}"
              onChange={e => handleChange(e, 'company')}
            />
          </div>
          <div>
            <span>Email</span>
            <br />
            <Input
              placeholder="(optional):{string}"
              onChange={e => handleChange(e, 'email')}
            />
          </div>
        </div>
        <div className="btns-row">
          <div>
            <span>Phone</span>
            <br />
            <Input
              placeholder="(optional):{string}"
              onChange={e => handleChange(e, 'phone_number')}
            />
          </div>
          <div>
            <span>Tenant ID</span>
            <br />
            <Input
              placeholder="(required):{string}"
              onChange={e => handleChange(e, 'tenant_id')}
            />
          </div>
          <div>
            <span>Application ID</span>
            <br />
            <Input
              placeholder="(required):{string}"
              onChange={e => handleChange(e, 'app_id')}
            />
          </div>
        </div>
        <div className="btns-row">
          <div>
            <span>Application Secret</span>
            <br />
            <Input
              type="password"
              placeholder="(required):{string}"
              onChange={e => handleChange(e, 'app_secret')}
            />
          </div>
          <div>
            <span>Comment</span>
            <br />
            <Input
              placeholder="(required):{string}"
              onChange={e => handleChange(e, 'comment')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
