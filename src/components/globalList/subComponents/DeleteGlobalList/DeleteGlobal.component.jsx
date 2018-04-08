import React, { Component } from 'react';
import { Input, Segment, Button, Dropdown } from 'semantic-ui-react';
import { config } from '../../../../config';

// axios
import axios from 'axios';

// styles
import './DeleteGlobal.css';

const ListOptions = [
  {
    key: 'GlobalQuarantine',
    value: 'GlobalQuarantine',
    text: 'Global Quarantine'
  },
  { key: 'GlobalSafe', value: 'GlobalSafe', text: 'Global Safe' }
];

class DeleteGlobal extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      list_options: ''
    };
  }

  handleClick = () => {
    let data = {
      sha256: this.state.searchTerm,
      list_type: this.state.list_options
    };

    console.log(data);
    axios
      .delete(
        `${config.API_BASE_URL}global-lists?company_name=${this.props.value}`,
        data
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('E', err);
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
      searchTerm: event.target.value
    });
  };

  handleDropDown = (e, key, { value }) => {
    this.setState({ [key]: value });
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
            onChange={(e, value) =>
              this.handleDropDown(e, 'list_options', value)
            }
          />
          <Button onClick={this.handleClick}>DELETE</Button>
        </Segment>
      </div>
    );
  }
}

export default DeleteGlobal;
