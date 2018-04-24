import React, { Component } from 'react';
import { Dropdown, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';

// axios
import axios from 'axios';
import iziToast from 'izitoast';
import toaster from '../../../../common/Status/status.component';

// styles
import './GetPolicy.css';

class GetPolicy extends Component {
  constructor() {
    super();
    this.state = {
      policies: {},
      loading: false,
      isLoadingProps_: true,
      selected: [],
      value: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        isLoadingProps_: false,
        selected: nextProps.getPolicy.map(policy => {
          return { value: policy.id, text: policy.id };
        })
      });
    }
  }

  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}policies/${this.state.value}?company_name=${
          this.props.value
        }`,
        this.setState({
          loading: true
        })
      )
      .then(res => {
        this.setState({
          policies: res.data.data,
          loading: false
        });
        toaster(res.data.message);
      })
      .catch(err => {
        this.setState({ loading: false });
        iziToast.error({
          title: 'Error',
          position: 'topRight',
          transitionIn: 'bounceInLeft'
        });
      });
  };

  render() {
    const buttonToShow = this.state.loading ? 'SEARCHING....' : 'SEARCH';
    return (
      <div className="get-threat-url">
        <Segment>
          <span> Policy ID </span>
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
        <div className="policy-table">
          <Table color="green" striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Policy ID</Table.HeaderCell>
                <Table.HeaderCell>Policy UTC Timestamp</Table.HeaderCell>
                <Table.HeaderCell>Checksum</Table.HeaderCell>
                <Table.HeaderCell>Suspicious File Type Action</Table.HeaderCell>
                <Table.HeaderCell>
                  Suspicious Threat Type Action
                </Table.HeaderCell>
                <Table.HeaderCell>Max Log size</Table.HeaderCell>
                <Table.HeaderCell>Retention Days</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.keys(this.state.policies).length >= 1 &&
                [this.state.policies].map((policy, i) => {
                  return (
                    <Table.Row key={i}>
                      <Table.Cell>
                        {policy.filetype_actions.suspicious_files[0].file_type}
                      </Table.Cell>
                      <Table.Cell>{policy.policy_id}</Table.Cell>
                      <Table.Cell>{policy.policy_utctimestamp}</Table.Cell>
                      <Table.Cell>{policy.checksum}</Table.Cell>
                      <Table.Cell>
                        {policy.filetype_actions.suspicious_files[0].file_type}
                      </Table.Cell>
                      <Table.Cell>
                        {policy.filetype_actions.threat_files[0].file_type}
                      </Table.Cell>
                      <Table.Cell>{policy.logpolicy.maxlogsize}</Table.Cell>
                      <Table.Cell>{policy.logpolicy.retentiondays}</Table.Cell>
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

export default GetPolicy;
