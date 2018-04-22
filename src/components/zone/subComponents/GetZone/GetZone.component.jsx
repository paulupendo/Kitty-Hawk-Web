import React, { Component } from 'react';
import { Dropdown, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';
import Skeleton from 'react-loading-skeleton';

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
      selected: [],
      loading: false,
      isLoadingProps_: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        isLoadingProps_: false,
        selected: nextProps.getZone.map(zone => {
          return { value: zone.id, text: zone.id};
        })
      });
    }
  }

  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}zones/${this.state.value}?company_name=${
          this.props.value
        }`,
        this.setState({
          loading: true
        })
      )
      .then(res => {
        this.setState({ zone: res.data.data, loading: false });
        toaster(res.data.message);
      })
      .catch(err => {
        this.setState({ loading: false });
        iziToast.error({
          title: 'Error',
          message: 'An error occured!',
          position: 'topRight'
        });
      });
  };

  render() {
    const buttonToShow = this.state.loading ? 'SEARCHING....' : 'SEARCH';
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
            loading={this.state.isLoadingProps_}
          />
          <Button onClick={this.handleClick}>{buttonToShow}</Button>
        </Segment>
        {this.state.loading ? (
          <Skeleton count={3} duration={2} />
        ) : (
          Object.keys(this.state.zone).length >= 1 &&
          [this.state.zone].map(zone => {
            return (
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
                    <Table.Row key={zone.id}>
                      <Table.Cell>{zone.name || 'None'}</Table.Cell>
                      <Table.Cell>{zone.criticality}</Table.Cell>
                      <Table.Cell>{zone.policy_id}</Table.Cell>
                      <Table.Cell>{zone.update_type}</Table.Cell>
                      <Table.Cell>{zone.date_created}</Table.Cell>
                      <Table.Cell>{zone.date_modified}</Table.Cell>
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

export default GetZone;
