import React from 'react';
import { Image } from 'semantic-ui-react';

// styles
// import './ListAdmins.css';

const ListAdmins = props => {
  return (
    <div className="list-adimin-container">
      <div className="list-admin">
        <Image
          src="https://ucarecdn.com/08571ec3-06f7-45a5-b1ec-f373becefff9/-/stretch/off/-/resize/3000x/-/quality/lighter/"
          avatar
          size="tiny"
          circular="true"
        />
        <span>Danielle Costa</span>
        <div className="delete-admin">
          <h6>Remove</h6>
        </div>
      </div>
    </div>
  );
};

export default ListAdmins;
