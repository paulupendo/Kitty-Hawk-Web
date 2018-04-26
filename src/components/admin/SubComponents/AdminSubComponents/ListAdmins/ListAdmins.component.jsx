import React, { Component } from 'react';
import { Table, Loader } from 'semantic-ui-react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { config } from '../../../../../config';
class ListAdmins extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      loading: false
    };
  }
  componentDidMount() {
    axios
      .get(
        `${config.API_BASE_URL}company-info`,
        this.setState({
          loading: true
        })
      )
      .then(res => {
        debugger;
        this.setState({
          companies: res.data.data.companies,
          loading: false
        });
      })
      .catch(err => err);
  }

  render() {
    return (
      <div className="list-adimin-container">
        <Table color="green" striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>App Secret</Table.HeaderCell>
              <Table.HeaderCell>Company Name</Table.HeaderCell>
              <Table.HeaderCell>App ID</Table.HeaderCell>
              <Table.HeaderCell>Phome Number</Table.HeaderCell>
              <Table.HeaderCell>Tenant ID</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.loading ? (
              <Loader active inline="centered" className="loader" />
            ) : (
              this.state.companies.map(admin => {
                return (
                  <Table.Row key={admin.id}>
                    <Table.Cell>{admin.name}</Table.Cell>
                    <Table.Cell>{admin.app_secret}</Table.Cell>
                    <Table.Cell>{admin.company}</Table.Cell>
                    <Table.Cell>{admin.app_id}</Table.Cell>
                    <Table.Cell>{admin.phone_number}</Table.Cell>
                    <Table.Cell>{admin.tenant_id}</Table.Cell>
                  </Table.Row>
                );
              })
            )}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default ListAdmins;
