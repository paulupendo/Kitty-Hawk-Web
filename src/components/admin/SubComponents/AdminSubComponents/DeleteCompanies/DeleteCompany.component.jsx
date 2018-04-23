import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react';

// styles
// import './DeleteCompanies.css';

const DeleteCompanies = props => {
  const {
    handleChange,
    companies,
    handleDropdownchange,
    deleteCompany
  } = props;
  return (
    <div className="delete-company-container">
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
        <Button content="DELETE COMPANY" onClick={deleteCompany} />
      </div>
    </div>
  );
};

export default DeleteCompanies;
