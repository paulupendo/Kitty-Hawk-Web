import React, { Component } from 'react';
import { Segment, Button, Checkbox } from 'semantic-ui-react';
import { config } from '../../../../config';
import iziToast from 'izitoast';

// axios
import axios from 'axios';

// styles
import './DeletePolicies.css';

// components
import toaster from '../../../../common/Status/status.component';

class DeletePolicies extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      active: true
    };
  }

  handleClick = () => {
    let data = {
      policy_id: this.state.value
    };

    axios
      .delete(
        `${config.API_BASE_URL}policies/${this.state.value}?company_name=${
          this.props.value
        }`,
        data
      )
      .then(res => {
        toaster(res.data.message);
      })
      .catch(err =>
        iziToast.error({
          title: 'Error',
          message: 'An error occured!',
          position: 'topRight'
        })
      );
  };

  render() {
    return (
      <div className="get-threat">
        <Segment>
          <span> Policy Id </span>
          <br />
          <Checkbox
            label="Delete All Policies ?"
          />
          <Button onClick={this.handleClick} disabled={this.state.active}>
            DELETE POLICIES
          </Button>
        </Segment>
      </div>
    );
  }
}

export default DeletePolicies;
