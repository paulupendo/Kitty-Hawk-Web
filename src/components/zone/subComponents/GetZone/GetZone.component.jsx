import React, { Component } from 'react';
import { Dropdown, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';

// axios
import axios from 'axios';
import iziToast from 'izitoast';

// styles
import './GetZone.css';

// components
import toaster from '../../../../common/Status/status.component';

class GetZone extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      zone: {},
      selected: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        selected: nextProps.getZone.map(zone => {
          return { value: zone.id, text: zone.name };
        })
      });
    }
  }

  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}zones/${this.state.value}?company_name=${
          this.props.value
        }`
      )
      .then(res => {
        this.setState({ zone: res.data.data });
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
  /**
   * This method handles adding input for name, description, level and paths properties
   *
   * @param {string} name the property the value should be added to
   * @returns {function} that sets the value for the property [name] provided
   */
  handleInput = event => {
    this.setState({
      value: event.target.value
    });
  };

  render() {
    return (
      <div className="get-zone">
        <Segment>
          <span> zone ID </span>
          <br />
          <Dropdown
            placeholder="Select Zone"
            search
            selection
            onChange={(_, { value }) => {
              this.setState({ value });
            }}
            options={this.state.selected}
          />
          <Button onClick={this.handleClick}>SEARCH</Button>
        </Segment>
        <div className="zone-table">
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
              {Object.keys(this.state.zone).length >= 1 &&
                [this.state.zone].map(zone => {
                  return (
                    <Table.Row key={zone.id}>
                      <Table.Cell>{zone.name || 'None'}</Table.Cell>
                      <Table.Cell>{zone.criticality}</Table.Cell>
                      <Table.Cell>{zone.policy_id}</Table.Cell>
                      <Table.Cell>{zone.update_type}</Table.Cell>
                      <Table.Cell>{zone.date_created}</Table.Cell>
                      <Table.Cell>{zone.date_modified}</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Header>
          </Table>
        </div>
      </div>
    );
  }
}

export default GetZone;
