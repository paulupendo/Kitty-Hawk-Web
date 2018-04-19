import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react';

// styles
import './AdminActions.css';

const AdminActions = props => {
  const { handleChange, companies, handleDropdownchange, deleteCompany } = props;
  return (
    <div className="actions-container">
      <div className="dropdown-nav">
        <Dropdown
          placeholder="Select Company"
          search
          selection
          options={companies}
          onChange={handleDropdownchange}
        />
      </div>
      <div className="admin-btn">
        <Button content="DELETE COMPANY"
        onClick={deleteCompany}
        />
      </div>
    </div>
  );
};

export default AdminActions;