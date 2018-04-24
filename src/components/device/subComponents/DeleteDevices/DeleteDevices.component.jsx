import React, { Component } from 'react';
import { Dropdown, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';
import iziToast from 'izitoast';

// axios
import axios from 'axios';

// styles
import './DeleteDevices.css';

// components
import toaster from '../../../../common/Status/status.component';

class DeleteDevices extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      selected: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        selected: nextProps.getDevices.map(device => {
          return { value: device.id, text: device.name };
        })
      });
    }
  }

  handleClick = () => {
    let data = {
      device_ids: [this.state.value]
    };
    
    axios
      .delete(
        `${config.API_BASE_URL}device-delete?company_name=${
          this.props.value
        }`,
        { data: data }
      )
      .then(res => {
        toaster(res.data.data.message);
      })
      .catch(err =>
        iziToast.error({
          title: 'Error',
          message: err.response.data.message,
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
          <span> Select Device </span>
          <br />
          <Dropdown
            placeholder="Select Threat"
            search
            selection
            onChange={(_, { value }) => {
              this.setState({ value });
            }}
            options={this.state.selected}
          />
          <Button onClick={this.handleClick}>DELETE DEVICE</Button>
        </Segment>
      </div>
    );
  }
}

export default DeleteDevices;
