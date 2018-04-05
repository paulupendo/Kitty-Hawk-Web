import React, { Component } from 'react';
import { Input, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';

// axios
import axios from 'axios';

// styles
import './GetThreat.css';

class GetThreat extends Component {
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
          <Input
            placeholder="Enter threat ID to Search..."
            onChange={this.handleInput}
          />
          <Button onClick={this.handleClick}>SEARCH</Button>
        </Segment>
        <div className="threat-table">
          <Table color="green" striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Agent Version</Table.HeaderCell>
                <Table.HeaderCell>Date Fist Registered</Table.HeaderCell>
                <Table.HeaderCell>Date Modified</Table.HeaderCell>
                <Table.HeaderCell>Date Offline</Table.HeaderCell>
                <Table.HeaderCell>Host Name</Table.HeaderCell>
              </Table.Row>
              {/* {Object.keys(this.state.threat).length >= 1 &&
                [this.state.threat].map(threat => {
                  return (
                    <Table.Row key={threat.id}>
                      <Table.Cell>{threat.name || 'None'}</Table.Cell>
                      <Table.Cell>{threat.criticality}</Table.Cell>
                      <Table.Cell>{threat.policy_id}</Table.Cell>
                      <Table.Cell>{threat.update_type}</Table.Cell>
                      <Table.Cell>{threat.date_created}</Table.Cell>
                      <Table.Cell>{threat.date_modified}</Table.Cell>
                    </Table.Row>
                  );
                })} */}
            </Table.Header>
          </Table>
        </div>
      </div>
    );
  }
}

export default GetThreat;
