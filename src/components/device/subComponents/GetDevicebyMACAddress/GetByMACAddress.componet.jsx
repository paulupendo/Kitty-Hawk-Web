import React, { Component } from 'react';
import { Dropdown, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';
import Skeleton from 'react-loading-skeleton';

// axios
import axios from 'axios';

// styles
import './getbyMacAddress.css';

import toaster from '../../../../common/Status/status.component';

class GetByMACAddress extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      deviceMac: [],
      selected: [],
      loading: false,
      isLoadingProps_: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        isLoadingProps_: false,
        selected: nextProps.getDevices.map(device => {
          return { value: device.mac_addresses[0], text: device.name };
        })
      });
    }
  }

  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}devices/mac-address/${
          this.state.value
        }?company_name=${this.props.value}`,
        this.setState({
          loading: true
        })
      )
      .then(res => {
        this.setState({ deviceMac: res.data.data.device, loading: false });
        toaster(res.data.data.message);
      })
      .catch(err => err);
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
    const buttonToShow = this.state.loading ? 'SEARCHING....' : 'SEARCH';
    return (
      <div className="mac-devices">
        <Segment>
          <span> Mac Address</span>
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
          <div className="user-table">
            <Table color="green" striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Agent Version</Table.HeaderCell>
                  <Table.HeaderCell>Host</Table.HeaderCell>
                  <Table.HeaderCell>last_logged_in_user</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>State</Table.HeaderCell>
                </Table.Row>
                {this.state.deviceMac.map(mac => {
                  return (
                    <Table.Row key={mac.id}>
                      <Table.Cell>{mac.name}</Table.Cell>
                      <Table.Cell>{mac.agent_version}</Table.Cell>
                      <Table.Cell>{mac.host_name}</Table.Cell>
                      <Table.Cell>{mac.last_logged_in_user}</Table.Cell>
                      <Table.Cell>{mac.state}</Table.Cell>
                      <Table.Cell>{mac.update_available}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Header>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

export default GetByMACAddress;
