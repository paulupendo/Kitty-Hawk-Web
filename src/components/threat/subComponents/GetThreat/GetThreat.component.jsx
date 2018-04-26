import React, { Component } from 'react';
import { Dropdown, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';
import Skeleton from 'react-loading-skeleton';

// axios
import axios from 'axios';
import iziToast from 'izitoast';

// styles
import './GetThreat.css';

class GetThreat extends Component {
  constructor() {
    super();
    this.state = {
      threat: {},
      selected: [],
      value: '',
      loading: false,
      isLoadingProps_: true
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      axios
        .get(
          `${config.API_BASE_URL}threats?company_name=${nextProps.value}`,
          this.setState({
            isLoadingProps_: true
          })
        )
        .then(res => {
          this.setState({
            isLoadingProps_: false,
            selected: res.data.data.policy.page_items.map(threat => ({
              value: threat.sha256,
              text: threat.sha256
            }))
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}threats/${this.state.value}?company_name=${
          this.props.value
        }`,
        this.setState({
          loading: true
        })
      )
      .then(res => {
        this.setState({ threat: res.data.data.threat, loading: false });
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

  render() {
    const buttonToShow = this.state.loading ? 'SEARCHING....' : 'SEARCH';
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
            loading={this.state.isLoadingProps_}
          />
          <Button onClick={this.handleClick}>{buttonToShow}</Button>
        </Segment>

        {this.state.loading ? (
          <Skeleton count={4} />
        ) : (
          Object.keys(this.state.threat).length >= 1 &&
          [this.state.threat].map(threat => {
            return (
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
                    <Table.Row key={threat.id}>
                      <Table.Cell>{threat.name}</Table.Cell>
                      <Table.Cell>{threat.classification}</Table.Cell>
                      <Table.Cell>{threat.cylance_score}</Table.Cell>
                      <Table.Cell>{threat.detected_by}</Table.Cell>
                      <Table.Cell>{threat.sub_classification}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default GetThreat;
