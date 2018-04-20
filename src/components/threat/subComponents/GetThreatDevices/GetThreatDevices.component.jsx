import React, { Component } from 'react';
import { Dropdown, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';

// axios
import axios from 'axios';
import iziToast from 'izitoast';

// styles
import './GetThreatDevices.css';

class GetThreatDevices extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      threat_devices: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        selected: nextProps.getThreats.map(threats => {
          return { value: threats.sha256, text: threats.name };
        })
      });
    }
  }

  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}threat-devices/${
          this.state.value
        }/devices?company_name=${this.props.value}`
      )
      .then(res => {
        this.setState({
          threat_devices: res.data.data.device_threats.page_items
        });
      })
      .catch(err => {
        this.props.value.length === 0 && err
          ? iziToast.info({
              title: 'Error',
              message: 'Please Select a Company To Continue',
              position: 'topRight',
              transitionIn: 'bounceInLeft',
              timeout: 2000
            })
          : iziToast.error({
              title: 'Error',
              message: err.message,
              position: 'topRight',
              transitionIn: 'bounceInLeft'
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
      value: event.target.value
    });
  };

  render() {
    return (
      <div className="get-threat-devices">
        <Segment>
          <span> Threat Hash ID </span>
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
          <Button onClick={this.handleClick}>SEARCH</Button>
        </Segment>
        <div className="threat_devices-table">
          <Table color="green" striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Agent Version</Table.HeaderCell>
                <Table.HeaderCell>File Status</Table.HeaderCell>
                <Table.HeaderCell>State</Table.HeaderCell>
                <Table.HeaderCell>Mac Addresses</Table.HeaderCell>
                <Table.HeaderCell>Ip Adresses</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.threat_devices.map(threat_devices => {
                return (
                  <Table.Row key={threat_devices.id}>
                    <Table.Cell>{threat_devices.name}</Table.Cell>
                    <Table.Cell>{threat_devices.agent_version}</Table.Cell>
                    <Table.Cell>{threat_devices.file_status}</Table.Cell>
                    <Table.Cell>{threat_devices.state}</Table.Cell>
                    <Table.Cell>{threat_devices.mac_addresses}</Table.Cell>
                    <Table.Cell>{threat_devices.ip_addresses}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

export default GetThreatDevices;
