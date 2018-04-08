import React, { Component } from 'react';
import { config } from '../../../../config';

// Third party libraries
import iziToast from 'izitoast';
import { Input, Segment, Button, Table } from 'semantic-ui-react';

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
      searchTerm: '',
      deviceThreats: [],
    };
  }
  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}device-threats/${
          this.state.searchTerm
        }?company_name=${this.props.value}&page=<1>&limit=<1>`,
      )
      .then(res => {
        this.setState({ deviceThreats: res.data.data.device.page_items });
        toaster(res.data.data.message);
      })
      .catch(err =>
        iziToast.error({
          title: 'Error',
          message: 'An error occured!',
          position: 'topRight',
        }),
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
      searchTerm: event.target.value,
    });
  };

  render() {
    return (
      <div className="get-device-threats">
        <Segment>
          <span> Unique Device ID </span>
          <br />
          <Input
            placeholder="Enter User ID to Search..."
            onChange={this.handleInput}
          />
          <Button onClick={this.handleClick}>SEARCH</Button>
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
              {this.state.deviceThreats.map(threats => {
                return (
                  <Table.Row key={threats.id}>
                    <Table.Cell>{threats.name}</Table.Cell>
                    <Table.Cell>{threats.classification} </Table.Cell>
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
