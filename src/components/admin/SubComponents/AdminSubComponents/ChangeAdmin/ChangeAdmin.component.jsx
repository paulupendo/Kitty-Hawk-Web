import React from 'react';
import { Dropdown, Button, Image } from 'semantic-ui-react';

// styles
// import './ChangeAdmin.css';

const ChangeAdmin = props => {
  return (
    <div className="change-adimin-container">
      <div className="list-admin">
        <Image
          src="https://ucarecdn.com/08571ec3-06f7-45a5-b1ec-f373becefff9/-/stretch/off/-/resize/3000x/-/quality/lighter/"
          avatar
          size="tiny"
        />
        <span>Danielle Costa</span>
        <div className="change-admin">
          <h5>Change</h5>
        </div>
      </div>
      <div className="change-admin-btn">
        <Button content="Save Changes" />
      </div>
    </div>
  );
};

export default ChangeAdmin;
