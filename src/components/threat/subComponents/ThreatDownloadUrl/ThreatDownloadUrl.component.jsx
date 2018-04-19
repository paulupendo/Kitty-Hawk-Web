import React, { Component } from 'react';
import { Input, Segment, Button, Table } from 'semantic-ui-react';
import { config } from '../../../../config';

// axios
import axios from 'axios';
import LoaderGraphic from '../../../../common/Loader/loader.component';
import iziToast from 'izitoast';
import toaster from '../../../../common/Status/status.component';

// styles
import './ThreatDownload.css';

class ThreatDownloadUrl extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      threat_url: {},
      loading: false
    };
  }

  handleClick = () => {
    axios
      .get(
        `${config.API_BASE_URL}threat-download-url/${
          this.state.searchTerm
        }/?company_name=${this.props.value}`,
        this.setState({
          loading: true
        })
      )
      .then(res => {
        this.setState({
          threat_url: res.data.data.threat_download_url,
          loading: false
        });
        toaster(res.data.data.message);
      })
      .catch(err => {
        this.setState({ loading: false });
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
    const buttonToShow = this.state.loading ? 'SEARCHING....' : 'SEARCH';
    return <div className="get-threat-url">
        <Segment>
          <span> Threat ID </span>
          <br />
          <Input placeholder="Enter threat ID to Search..." onChange={this.handleInput} />
          <Button onClick={this.handleClick}>{buttonToShow}</Button>
        </Segment>
        <div className="threat-table">
          <Table color="green" striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Cert Issuer</Table.HeaderCell>
                <Table.HeaderCell>Cert Publisher</Table.HeaderCell>
                <Table.HeaderCell>Classification</Table.HeaderCell>
                <Table.HeaderCell>Cylance Score</Table.HeaderCell>
                <Table.HeaderCell>Detected By</Table.HeaderCell>
                <Table.HeaderCell>File Size</Table.HeaderCell>
                <Table.HeaderCell>Global Quarantined</Table.HeaderCell>
                <Table.HeaderCell>Running</Table.HeaderCell>
                <Table.HeaderCell>Safelisted</Table.HeaderCell>
                <Table.HeaderCell>Sub Classification</Table.HeaderCell>
                <Table.HeaderCell>Signed</Table.HeaderCell>
                <Table.HeaderCell>Unique to Cylance</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.keys(this.state.threat_url).length >= 1 && [this.state.threat_url].map(
                  (threat, i) => {
                    return (
                      <Table.Row key={i}>
                        <Table.Cell>{threat.name}</Table.Cell>
                        <Table.Cell>{threat.cert_issuer}</Table.Cell>
                        <Table.Cell>{threat.cert_publisher}</Table.Cell>
                        <Table.Cell>{threat.classification}</Table.Cell>
                        <Table.Cell>{threat.cylance_score}</Table.Cell>
                        <Table.Cell>{threat.detected_by}</Table.Cell>
                        <Table.Cell>{threat.file_size}</Table.Cell>
                        <Table.Cell>
                          {threat.global_quarantined.toString()}
                        </Table.Cell>
                        <Table.Cell>{threat.running.toString()}</Table.Cell>
                        <Table.Cell>
                          {threat.safelisted.toString()}
                        </Table.Cell>
                        <Table.Cell>{threat.sub_classification}</Table.Cell>
                        <Table.Cell>{threat.signed.toString()}</Table.Cell>
                        <Table.Cell>
                          {threat.unique_to_cylance.toString()}
                        </Table.Cell>
                      </Table.Row>
                    );
                  }
                )}
            </Table.Body>
          </Table>
        </div>
      </div>;
  }
}

export default ThreatDownloadUrl;
