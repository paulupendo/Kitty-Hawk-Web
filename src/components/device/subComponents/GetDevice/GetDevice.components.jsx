import React, { Component } from 'react';
import { Dropdown, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';
import Skeleton from 'react-loading-skeleton';

// axios
import axios from 'axios';

// styles
import './GetDevice.css';

class GetDevice extends Component {
  constructor() {
    super();
    this.state = {
      device: {},
      selected: [],
      value: '',
      loading: false,
      isLoadingProps_: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        isLoadingProps_: false,
        selected: nextProps.getDevices.map(device => {
          return { value: device.id, text: device.name };
        })
      });
    }
  }

  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}single-device/${this.state.value}?company_name=${
          this.props.value
        }`,
        this.setState({
          loading: true
        })
      )
      .then(res => {
        this.setState({ device: res.data.data.device, loading: false });
      });
  };

  render() {
    const buttonToShow = this.state.loading ? 'SEARCHING....' : 'SEARCH';
    return (
      <div className="get-device">
        <Segment>
          <span> Device ID </span>
          <br />
          <Dropdown
            placeholder="Select Threat"
            search
            selection
            onChange={(_, { value }) => {
              this.setState({ value });
            }}
            options={this.state.selected}
            loading={this.state.isLoadingProps_}
          />
          <Button onClick={this.handleClick}>{buttonToShow}</Button>
        </Segment>
        {this.state.loading ? (
          <Skeleton count={4} duration={2} />
        ) : (
          Object.keys(this.state.device).length >= 1 &&
          [this.state.device].map((device, index) => {
            return (
              <div className="device-table">
                <Table color="green" striped >
                  <Table.Header>
                    <Table.Row >
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Agent Version</Table.HeaderCell>
                      <Table.HeaderCell>Date Fist Registered</Table.HeaderCell>
                      <Table.HeaderCell>Date Modified</Table.HeaderCell>
                      <Table.HeaderCell>Date Offline</Table.HeaderCell>
                      <Table.HeaderCell>Host Name</Table.HeaderCell>
                      <Table.HeaderCell>Last Looged In User</Table.HeaderCell>
                      <Table.HeaderCell>State</Table.HeaderCell>
                      <Table.HeaderCell>Host Name</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row key={device.id}>
                      <Table.Cell>{device.name || 'None'}</Table.Cell>
                      <Table.Cell>{device.agent_version}</Table.Cell>
                      <Table.Cell>{device.date_first_registered}</Table.Cell>
                      <Table.Cell>{device.date_last_modified}</Table.Cell>
                      <Table.Cell>{device.date_offline}</Table.Cell>
                      <Table.Cell>{device.host_name}</Table.Cell>
                      <Table.Cell>{device.last_logged_in_user}</Table.Cell>
                      <Table.Cell>{device.state}</Table.Cell>
                    </Table.Row>
                  </Table.Header>
                </Table>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default GetDevice;
