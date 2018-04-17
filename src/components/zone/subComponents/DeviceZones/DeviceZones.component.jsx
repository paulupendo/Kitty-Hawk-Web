import React, { Component } from 'react';
import { Input, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';

// axios
import axios from 'axios';
import iziToast from 'izitoast';

// styles
import './DeviceZones.css';

// components
import toaster from '../../../../common/Status/status.component';

class DeviceZones extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      zone: {}
    };
  }

  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}device-zones/${
          this.state.searchTerm
        }?company_name=${this.props.value}`
      )
      .then(res => {
        this.setState({ zone: res.data.data });
        toaster(res.data.data.message);
      })
      .catch(err => {
        err.message === 'Request failed with status code 404'
          ? iziToast.error({
              title: '404',
              message: 'No Device Zones found',
              position: 'topRight'
            })
          : iziToast.error({
              title: 'Error:',
              message: 'An error occured',
              position: 'topRight'
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
      <div className="get-device-zone">
        <Segment>
          <span> zone ID </span>
          <br />
          <Input
            placeholder="Enter zone ID to Search..."
            onChange={this.handleInput}
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

export default DeviceZones;
