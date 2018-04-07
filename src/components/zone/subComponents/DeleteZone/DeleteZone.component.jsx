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
      threat: {}
    };
  }

  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}threats/${this.state.searchTerm}?company_name=${
          this.props.value
        }`
      )
      .then(res => {
        this.setState({
          threat: res.data.data
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
      searchTerm: event.target.value
    });
  };

  render() {
    return (
      <div className="get-threat">
        <Segment>
          <span> threat ID </span>
          <br />
          <Input placeholder="Enter Device ID" onChange={this.handleInput} />
          <Button onClick={this.handleClick}>DELETE ZONE</Button>
        </Segment>
      </div>
    );
  }
}

export default DeleteZone;
