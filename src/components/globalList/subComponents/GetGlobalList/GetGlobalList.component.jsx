import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import './GetGlobal.css';

const GetGlobalList = props => {
  const { globalist } = props;
  return (
    <div className="devices table">
      <Table color="green" striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Cylance Score</Table.HeaderCell>
            <Table.HeaderCell>Av Industry</Table.HeaderCell>
            <Table.HeaderCell>Clasficaton</Table.HeaderCell>
            <Table.HeaderCell>Sub Clasficaton</Table.HeaderCell>
            <Table.HeaderCell>List Type</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Added</Table.HeaderCell>
            <Table.HeaderCell>Reason</Table.HeaderCell>
            <Table.HeaderCell>MD5</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {globalist.map(global => {
            return (
              <Table.Row key={global.md5}>
                <Table.Cell>{global.name}</Table.Cell>
                <Table.Cell>{global.cylance_score}</Table.Cell>
                <Table.Cell>{global.av_industry || 'None'}</Table.Cell>
                <Table.Cell>{global.classification}</Table.Cell>
                <Table.Cell>{global.sub_classification}</Table.Cell>
                <Table.Cell>{global.list_type}</Table.Cell>
                <Table.Cell>{global.category}</Table.Cell>
                <Table.Cell>{global.added}</Table.Cell>
                <Table.Cell>{global.reason}</Table.Cell>
                <Table.Cell>{global.md5}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};
export default GetGlobalList;
