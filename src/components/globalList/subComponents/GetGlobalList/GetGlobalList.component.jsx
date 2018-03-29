import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import './GetGlobal.css';

const GetGlobalList = () => {
  return (
    <div className="devices table">
      <Table color="green" striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>State</Table.HeaderCell>
            <Table.HeaderCell>Agent_version</Table.HeaderCell>
            <Table.HeaderCell>Date First Registred</Table.HeaderCell>
            <Table.HeaderCell>Ip Address</Table.HeaderCell>
            <Table.HeaderCell>Ip Address</Table.HeaderCell>
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
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jamie Harington</Table.Cell>
            <Table.Cell>January 11, 2014</Table.Cell>
            <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
            <Table.Cell>No</Table.Cell>
            <Table.Cell>No</Table.Cell>
            <Table.Cell>none</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jill Lewis</Table.Cell>
            <Table.Cell>May 11, 2014</Table.Cell>
            <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
            <Table.Cell>Yes</Table.Cell>
            <Table.Cell>No</Table.Cell>
            <Table.Cell>No</Table.Cell>
            <Table.Cell>none</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
export default GetGlobalList;
