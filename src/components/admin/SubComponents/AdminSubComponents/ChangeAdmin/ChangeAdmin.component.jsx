import React from 'react';
import { Input, Dropdown, Image } from 'semantic-ui-react';

// styles
// import './ChangeAdmin.css';

const ChangeAdmin = props => {
  return (
    <div className="company-container">
      <div className="btns">
        <div className="btns-row">
          <div>
            <span>ID</span>
            <br />
            <Dropdown
              placeholder="Select Company"
              search
              selection
              options={props.companies_id}
              onChange={props.handleDropdownchange}
            />
          </div>
          <div>
            <span>Name</span>
            <br />
            <Input
              placeholder="(optional):{string}"
              onChange={e => props.handleChange(e, 'name')}
            />
          </div>
          <div>
            <span>Company</span>
            <br />
            <Input
              placeholder="(optional):{string}"
              onChange={e => props.handleChange(e, 'company')}
            />
          </div>
        </div>
        <div className="btns-row">
          <div>
            <span>Phone</span>
            <br />
            <Input
              placeholder="(optional):{string}"
              onChange={e => props.handleChange(e, 'phone_number')}
            />
          </div>
          <div>
            <span>Email</span>
            <br />
            <Input
              placeholder="(optional):{string}"
              onChange={e => props.handleChange(e, 'email')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAdmin;
