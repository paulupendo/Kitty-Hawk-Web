import React, { Component } from 'react';
import { config } from '../../../../config';
import Skeleton from 'react-loading-skeleton';

// Third party libraries
import iziToast from 'izitoast';
import { Dropdown, Segment, Button, Table } from 'semantic-ui-react';

// axios
import axios from 'axios';

// styles
import './DeviceThreats.css';

// Components
import toaster from '../../../../common/Status/status.component';
class GetDeviceThreats extends Component {
  constructor() {
    super();
    this.state = {
      deviceThreats: [],
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
        selected: nextProps.getThreatDevice.map(threats => {
          return { value: threats.id, text: threats.id };
        })
      });
    }
  }

  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}device-threats/${
          this.state.value
        }?company_name=${this.props.value}&page=<1>&limit=<1>`,
        this.setState({
          loading: true
        })
      )
      .then(res => {
        this.setState({
          deviceThreats: res.data.data.device.page_items,
          loading: false
        });
        toaster(res.data.data.message);
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
  loadSkeleton = () => {
    if (this.state.loading) {
      return       <Skeleton />
    }
  }

  render() {
    const buttonToShow = this.state.loading ? 'SEARCHING....' : 'SEARCH';
    return (
      <div className="get-device-threats">
        <Segment>
          <span> Unique Device ID </span>
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
        <div className="user-table">
          <Table color="green" striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Classification</Table.HeaderCell>
                <Table.HeaderCell>Clyance Score</Table.HeaderCell>
                <Table.HeaderCell>Date Found</Table.HeaderCell>
                <Table.HeaderCell>File Status</Table.HeaderCell>
                <Table.HeaderCell>Sub Classification</Table.HeaderCell>
              </Table.Row>
              {this.state.deviceThreats.map((threats, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{threats.name.substring(0,14)}</Table.Cell>
                    <Table.Cell>{ this.state.loading ? <Skeleton/> :
                      threats.classification} </Table.Cell>
                    <Table.Cell>{threats.cylance_score}</Table.Cell>
                    <Table.Cell>{threats.date_found}</Table.Cell>
                    <Table.Cell>{threats.file_status}</Table.Cell>
                    <Table.Cell>{threats.sub_classification}</Table.Cell>
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

export default GetDeviceThreats;
