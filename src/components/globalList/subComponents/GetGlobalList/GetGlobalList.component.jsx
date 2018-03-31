import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import './GetGlobal.css';

const GetGlobalList = () => {
  return (
    <div className="devices table">
      <Table color="green" striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Sha256</Table.HeaderCell>
            <Table.HeaderCell>Md5</Table.HeaderCell>
            <Table.HeaderCell>Cylance Score</Table.HeaderCell>
            <Table.HeaderCell>Av Industry</Table.HeaderCell>
            <Table.HeaderCell>Clasficaton</Table.HeaderCell>
            <Table.HeaderCell>List Type</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Added</Table.HeaderCell>
            <Table.HeaderCell>Added By</Table.HeaderCell>
            <Table.HeaderCell>Reason</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>John Lilki</Table.Cell>
            <Table.Cell>September 14, 2013</Table.Cell>
            <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
            <Table.Cell>No</Table.Cell>
            <Table.Cell>No</Table.Cell>
            <Table.Cell>No</Table.Cell>
            <Table.Cell>none</Table.Cell>
            <Table.Cell>none</Table.Cell>
            <Table.Cell>none</Table.Cell>
            <Table.Cell>none</Table.Cell>
            <Table.Cell>none</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
export default GetGlobalList;
