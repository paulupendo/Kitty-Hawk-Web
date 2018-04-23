import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import './GetThreats.css';

class GetThreats extends Component {
  render() {
    const { threats } = this.props;
    const length = 30;
    return (
      <div className="Threats table">
        <Table color="green" striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Av Industry</Table.HeaderCell>
              <Table.HeaderCell>Classfication</Table.HeaderCell>
              <Table.HeaderCell>Cylance Score</Table.HeaderCell>
              <Table.HeaderCell>File Size</Table.HeaderCell>
              <Table.HeaderCell>Global Quarantined</Table.HeaderCell>
              <Table.HeaderCell>Safe Listed</Table.HeaderCell>
              <Table.HeaderCell>Sub Classfication</Table.HeaderCell>
              <Table.HeaderCell>Unique to Cylance</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {threats.map(threat => {
              return (
                <Table.Row key={threat.id}>
                  <Table.Cell>{threat.name.substring(0, 18)}</Table.Cell>
                  <Table.Cell>{threat.av_industry || 'None'}</Table.Cell>
                  <Table.Cell>{threat.classification}</Table.Cell>
                  <Table.Cell>{threat.cylance_score}</Table.Cell>
                  <Table.Cell>{threat.file_size}</Table.Cell>
                  <Table.Cell>{threat.global_quarantined.toString()}</Table.Cell>
                  <Table.Cell>{threat.safelisted.toString()}</Table.Cell>
                  <Table.Cell>{threat.sub_classification}</Table.Cell>
                  <Table.Cell>{threat.unique_to_cylance.toString()}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
export default GetThreats;
