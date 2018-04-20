import React, { Component } from 'react';
import { Dropdown, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';

// axios
import axios from 'axios';
import LoaderGraphic from '../../../../common/Loader/loader.component';
import iziToast from 'izitoast';

// styles
import './GetThreat.css';

class GetThreat extends Component {
  constructor() {
    super();
    this.state = {
      threat: {},
      selected: [],
      value: ''
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps) {
  //     this.setState({
  //       selected: nextProps.getThreats.map(threats => {
  //         return { value: threats.sha256, text: threats.name };
  //       })
  //     });
  //   }
  // }

  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}threats/${this.state.value}?company_name=${
          this.props.value
        }`
      )
      .then(res => {
        this.setState({
          threat: res.data.data.threat
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
      searchTerm: event.target.value
    });
  };

  render() {
    return (
      <div className="get-threat">
        <Segment>
          <span> Threat ID </span>
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
          // loading={this.state.loading}
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
            </Table.Header>
            <Table.Body>
              {Object.keys(this.state.threat).length >= 1 &&
                [this.state.threat].map(threat => {
                  return (
                    <Table.Row key={threat.id}>
                      <Table.Cell>{threat.name}</Table.Cell>
                      <Table.Cell>{threat.classification}</Table.Cell>
                      <Table.Cell>{threat.cylance_score}</Table.Cell>
                      <Table.Cell>{threat.detected_by}</Table.Cell>
                      <Table.Cell>{threat.sub_classification}</Table.Cell>
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

export default GetThreat;
