import React, { Component } from 'react';

import { config } from '../../config';

// third-party libraries
import { Dropdown, Button } from 'semantic-ui-react';
import iziToast from 'izitoast';

// axios
import axios from 'axios';

//styles
import './Zone.css';

// components
import BreadcrumbComponent from '../../common/BreadCrumb.component';
import SubHeader from '../../common/Subheader/SubHeader.component';
import LoaderGraphic from '../../common/Loader/loader.component';
import toaster from '../../common/Status/status.component';
import CreateZones from '../zone/subComponents/CreateZones/CreateZones.component';
import GetZones from '../zone/subComponents/GetZones/GetZones.component';
import GetZone from './subComponents/GetZone/GetZone.component';
import DeviceZones from './subComponents/DeviceZones/DeviceZones.component';
import DeleteZone from './subComponents/DeleteZone/DeleteZone.component';
import UpdateZones from './subComponents/UpdateZones/UpdateZones.component';

export default class Zones extends Component {
  constructor() {
    super();

    this.state = {
      activeComponent: 'Create Zone',
      selection: 'Create Zone',
      endpoint: '/zones/v2',
      method: 'POST',
      zones: [],
      companies: [],
      value: '',
      showToaster: false,
      status: '',
      message: '',
      loading: true,
      disabled: true,
      name: null,
      policyId: null,
      criticality: null,
      zone_id: null,
    };
  }

  data = [
    { key: 'POST-zone', value: 'Create Zone', text: 'Create Zone' },
    { key: 'GET-zones', value: 'Get Zones', text: 'Get Zones' },
    { key: 'PUT-zones', value: 'Get Device Zones', text: 'Get Device Zones' },
    { key: 'GET-zone', value: 'Get Zone', text: 'Get Zone' },
    { key: 'PUT-zone', value: 'Update Zone', text: 'Update Zone' },
    { key: 'DELETE-zone', value: 'Delete Zone', text: 'Delete Zone' },
  ];

  /**
   * method to get all companies
   * @param {object} data  companies data
   * @returns {=>Promise<TResult2|TResult1>}
   */
  componentDidMount() {
    axios
      .get(`${config.API_BASE_URL}company-info`)
      .then(res => {
        this.setState({
          loading: false,
          companies: res.data.data.companies.map(company => {
            return {
              value: company,
              text: company,
            };
          }),
        });
      })
      .catch(err => err);
  }

  /**
   * method to get all users in a specific company
   * @returns {object} data Users
   * @member of GetUser Component
   * @returns {=>Promise<TResult2|TResult1>}
   */
  getZones = () => {
    axios
      .get(`${config.API_BASE_URL}zones?company_name=${this.state.value}`)
      .then(res => {
        this.setState({
          zones: res.data.data.page_items,
        });
        toaster(res.data.data.message);
      })
      .catch(err =>
        iziToast.error({
          title: 'ERROR',
          message: 'An error occured!',
          position: 'topRight',
        }),
      );
  };

  postZones = () => {
    let data = {
      name: this.state.name,
      policy_id: this.state.policyId,
      criticality: this.state.criticality,
    };

    axios
      .post(
        `${config.API_BASE_URL}zones?company_name=${this.state.value}`,
        data,
      )
      .then(res => {
        toaster(res.data.data.message);
      })
      .catch(err => {
        this.state.value.length === 0 && err
          ? iziToast.info({
              title: 'Error',
              message: 'Please Select a Company To Continue',
              position: 'topRight',
              transitionIn: 'bounceInLeft',
              timeout: 2000,
            })
          : iziToast.error({
              title: 'Error',
              message: err.message,
              position: 'topRight',
              transitionIn: 'bounceInLeft',
            });
      });
  };

  updateZones_ = () => {
    let data = {
      name: this.state.name,
      policy_id: this.state.policyId,
      criticality: this.state.criticality,
    };

    let url_ = `${config.API_BASE_URL}zones/${
      this.state.zone_id
    }?company_name=${this.state.value}`;
    axios
      .put(url_, data)
      .then(res => toaster(res.data.data.message))
      .catch(err =>
        iziToast.error({
          title: 'Error',
          message: err.message,
          position: 'topRight',
          transitionIn: 'bounceInLeft',
        }),
      );
  };

  /**
   * Handles change of active dropdowns
   * @member of UserComponent
   * @param {object} value
   */
  handleChange = (e, { value }) => {
    this.setState({
      activeComponent: value,
      selection: value,
    });

    switch (value) {
      case 'Get Zones':
        this.setState({ method: 'GET' });
        this.getZones();
        break;
      case 'Create Zone':
        this.setState({ method: 'POST' });
        break;
      case 'Get Device Zones':
        this.setState({ method: 'GET' });
        break;
      case 'Get Zone':
        this.setState({ method: 'GET' });
        break;
      case 'Delete Zone':
        this.setState({ method: 'DELETE' });
        break;
      case 'Update Zone':
        this.setState({ method: 'PUT' });
        break;
      default:
        break;
    }
  };

  handleZonesChange = (e, key) => {
    this.setState({ [key]: e.target.value });
  };

  handleDropDownChange = (e, { value }) => {
    this.setState({ criticality: value });
  };

  /**
   * Switches selected Components
   * @member of UserComponets
   * @returns {objects} list of User components
   */
  switchGlobalComponents = () => {
    switch (this.state.activeComponent) {
      case 'Create Zone':
        return (
          <div>
            <SubHeader info="Create (add) a zone to your Console." />
            <CreateZones
              handleChange={this.handleZonesChange}
              handleDropDownChange={this.handleDropDownChange}
            />
            <div className="btn-bottom">
              <Button content="CREATE ZONE" onClick={this.postZones} />
            </div>
          </div>
        );
      case 'Get Zones':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            {this.state.zones.length === 0 ? (
              <LoaderGraphic />
            ) : (
              <GetZones zones={this.state.zones} />
            )}
          </div>
        );
      case 'Get Device Zones':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            <DeviceZones value={this.state.value} />
          </div>
        );
      case 'Get Zone':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            <GetZone value={this.state.value} />
          </div>
        );
      case 'Delete Zone':
        return (
          <div>
            <SubHeader info="Delete (remove) a zone from your Console." />
            <DeleteZone value={this.state.value} />
          </div>
        );
      case 'Update Zone':
        return (
          <div>
            <SubHeader info="Delete (remove) a zone from your Console." />
            <UpdateZones
              value={this.state.value}
              handleChange={this.handleZonesChange}
              handleDropDownChange={this.handleDropDownChange}
            />
            <div className="btn-bottom">
              <Button content="UPDATE ZONE" onClick={this.updateZones_} />
            </div>
          </div>
        );
    }
  };

  /**
   * @returns {object}
   * @member of DeviceComponent
   */
  render() {
    return (
      <div className="zone-container">
        <BreadcrumbComponent page="Zone API" selection={this.state.selection} />
        <div className="header-nav">
          <div className="dropdwn-nav">
            <div>
              <Dropdown
                placeholder="Select Company"
                search
                selection
                onChange={(_, { value }) => {
                  this.setState({ value, disabled: false });
                }}
                options={this.state.companies}
                loading={this.state.loading}
              />
            </div>

            <div>
              <Dropdown
                placeholder="Create Zones"
                fluid
                selection
                options={this.data}
                onChange={this.handleChange}
                disabled={this.state.disabled}
              />
            </div>
          </div>
          <div className="call-btn">
            <Button content={this.state.method} />
            <span>{this.state.endpoint}</span>
          </div>
        </div>
        {this.switchGlobalComponents()}
      </div>
    );
  }
}
