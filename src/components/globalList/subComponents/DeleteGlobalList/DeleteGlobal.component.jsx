import React, { Component } from 'react';
import { Input, Segment, Button, Dropdown } from 'semantic-ui-react';
import { config } from '../../../../config';
import toaster from '../../../../common/Status/status.component';

// axios
import axios from 'axios';

// styles
import './DeleteGlobal.css';

// third party libraries
import iziToast from 'izitoast';

const ListOptions = [
  {
    key: 'GlobalQuarantine',
    value: 'GlobalQuarantine',
    text: 'Global Quarantine',
  },
  { key: 'GlobalSafe', value: 'GlobalSafe', text: 'Global Safe' },
];

class DeleteGlobal extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      list_options: '',
    };
  }

  handleClick = () => {
    let data = {
      sha256: this.state.searchTerm,
      list_type: this.state.list_options,
    };

    axios
      .delete(
        `${config.API_BASE_URL}global-lists?company_name=${this.props.value}`,
        { data: data },
      )
      .then(res => {
        toaster('Global List deleted successfully');
      })
      .catch(err => {
        iziToast.error({
          title: 'Error',
          message: 'An error occured',
          position: 'topRight',
        });
      });
  };

  /**
   * This method handles adding input for name, description, level and paths properties
   *
   * @param {string} name the property the value should be added to
   * @returns {function} that sets the value for the property [name] provided
   */
  handleInput = event => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  handleDropDown = (e, { value }) => {
    this.setState({ list_options: value });
  };

  render() {
    return (
      <div className="delete-global">
        <Segment>
          <span> Hash Key</span>
          <br />
          <Input placeholder="Enter Hash Key" onChange={this.handleInput} />
          <Dropdown
            selection
            placeholder="Select Category"
            options={ListOptions}
            onChange={this.handleDropDown}
          />
          <Button onClick={this.handleClick}>DELETE</Button>
        </Segment>
      </div>
    );
  }
}

export default DeleteGlobal;
