import React, { Component } from 'react';
import { Input, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';
import iziToast from 'izitoast';

// axios
import axios from 'axios';

// styles
import './DeleteDevices.css';

// components
import toaster from '../../../../common/Status/status.component'

class DeleteDevices extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: ''
    };
  }

  handleClick = () => {
    let data = {
      device_ids: [this.state.searchTerm]
    };

    console.log(data);
    axios
      .delete(
        `${config.API_BASE_URL}all-device?company_name=${this.props.value}`,
        data
      )
      .then(res => {
        toaster(res.data.data.message);
      })
      .catch(err =>
        iziToast.error({
          title: 'Error',
          message: 'An error occured!',
          position: 'topRight'
        })
      );
  };
  /**
   * This method handles adding input for name, description, level and paths properties
   *
   * @param {string} name the property the value should be added to
   * @returns {function} that sets the value for the property [name] provided
   */
  handleInput = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  render() {
    return (
      <div className="delete-device">
        <Segment>
          <span> Device Id </span>
          <br />
          <Input placeholder="Enter Device ID" onChange={this.handleInput} />
          <Button onClick={this.handleClick}>DELETE DEVICE</Button>
        </Segment>
      </div>
    );
  }
}

export default DeleteDevices;
