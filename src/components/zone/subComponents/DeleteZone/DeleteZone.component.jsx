import React, { Component } from 'react';
import { Input, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';

// axios
import axios from 'axios';

// styles
import './DeleteZone.css';

class DeleteZone extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
    };
  }

  handleClick = () => {
    let data = {
      zone_id: this.state.searchTerm,
    };

    axios
      .delete(
        `${config.API_BASE_URL}zones/${this.state.searchTerm}?company_name=${
          this.props.value
        }`,
        data,
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log('E', err));
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

  render() {
    return (
      <div className="get-threat">
        <Segment>
          <span> Zone Id </span>
          <br />
          <Input placeholder="Enter Zone ID" onChange={this.handleInput} />
          <Button onClick={this.handleClick}>DELETE ZONE</Button>
        </Segment>
      </div>
    );
  }
}

export default DeleteZone;
