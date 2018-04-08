import React, { Component, Fragment } from 'react';
import { config } from '../../config';

// third-party libraries
import { Dropdown, Button } from 'semantic-ui-react';
import iziToast from 'izitoast';

// axios
import axios from 'axios';

//styles
import './Global.css';

// components
import AddGlobalList from './subComponents/AddGlobalList/AddToGloabalList.component';
import BreadcrumbComponent from '../../common/BreadCrumb.component';
import SubHeader from '../../common/Subheader/SubHeader.component';
import LoaderGraphic from '../../common/Loader/loader.component';
import GetGlobalList from './subComponents/GetGlobalList/GetGlobalList.component';
import toaster from './../../common/Status/status.component';
import DeleteGlobal from './subComponents/DeleteGlobalList/DeleteGlobal.component';

export default class Global extends Component {
  constructor() {
    super();
    this.state = {
      activeComponent: 'Add To Global List',
      selection: 'Add To Global List',
      endpoint: '/users/v2',
      method: 'POST',
      globalist: [],
      companies: [],
      value: '',
      sha256: '',
      list_type: '',
      category: '',
      reason: '',
      loading: false,
      disabled: true,
      isLoadingCompanies: true
    };
  }
  data = [
    { key: 'POST', value: 'Add To Global List', text: 'Add To Global List' },
    { key: 'GET', value: 'Get Global List', text: 'Get Global List' },
    {
      key: 'DELETE',
      value: 'Delete Device Global List',
      text: 'Delete Device Global List'
    }
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
          isLoadingCompanies: false,
          companies: res.data.data.companies.map(company => {
            return {
              value: company,
              text: company
            };
          })
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
  getlists = () => {
    axios
      .get(
        `${config.API_BASE_URL}global-lists?company_name=${
          this.state.value
        }&list_typed_id=1`,
        this.setState({
          loading: true
        })
      )
      .then(res => {
        this.setState({
          globalist: res.data.data.page_items,
          loading: false
        });
        toaster('Global Lists fetched Successfully');
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  };

  createGlobalList = () => {
    let { sha256, list_type, category, reason } = this.state;
    let data = { sha256, list_type, category, reason };

    axios
      .post(
        `${config.API_BASE_URL}global-lists?company_name=${this.state.value}`,
        data
      )
      .then(res => toaster(res.data.data.message))
      .catch(err => {
        this.state.value.length === 0 && err
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

  handeleCreateGlobalList = (e, key) => {
    this.setState({ [key]: e.target.value });
  };

  handleDropDown = (e, key, { value }) => {
    this.setState({ [key]: value });
  };

  /**
   * Handles change of active dropdowns
   * @member of UserComponent
   * @param {object} value
   */
  handleChange = (e, { value }) => {
    this.setState({
      activeComponent: value,
      selection: value
    });
    switch (value) {
      case 'Add To Global List':
        this.setState({ method: 'POST' });
        break;
      case 'Get Global List':
        this.setState({ method: 'GET' });
        this.getlists();
        break;
      case 'Delete Device Global List':
        this.setState({ method: 'PUT' });
        break;
      default:
        break;
    }
  };

  /**
   * Switches selected Components
   * @member of UserComponets
   * @returns {objects} list of User components
   */
  switchGlobalComponents = () => {
    switch (this.state.activeComponent) {
      case 'Add To Global List':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            <AddGlobalList
              handleChange={this.handeleCreateGlobalList}
              handleDropDown={this.handleDropDown}
            />
            <div className="btn-bottom">
              <Button
                content="ADD GLOBAL LIST"
                onClick={this.createGlobalList}
              />
            </div>
          </div>
        );
      case 'Get Global List':
        if (this.state.loading) {
          return <LoaderGraphic />;
        }
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of global list resources for a Tenant, sorted by the date when the hash was added to the Global List, in descending order" />
            <Fragment>
              <div>
                <GetGlobalList globalist={this.state.globalist} />
              </div>
            </Fragment>
          </div>
        );
      case 'Delete Device Global List':
        return (
          <div>
            <SubHeader info="Allows a caller to request a page with a list of device resources belonging to a Tenant," />
            <DeleteGlobal value={this.state.value} />
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
      <div className="global-container">
        <BreadcrumbComponent
          page="Global List API"
          selection={this.state.selection}
        />
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
                loading={this.state.isLoadingCompanies}
              />
            </div>
            <div>
              <Dropdown
                placeholder="Add To Global List"
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
