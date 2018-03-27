import React from 'react';
import { Input, Segment, Button } from 'semantic-ui-react';

import './GetUser.css';

const GetUser = () => {
  return <div>
      <Segment>
        <span> Device ID </span>
          <br />
        <Input placeholder="Enter User ID to Search..." />
        <Button>SEARCH</Button>
      </Segment>
    </div>;
};

export default GetUser;
