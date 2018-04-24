import React, { Component } from 'react';
import { Dropdown, Segment, Button,} from 'semantic-ui-react';
import { config } from '../../../../config';
import iziToast from 'izitoast';

// axios
import axios from 'axios';

// styles
import './DeletePolicy.css';

// components
import toaster from '../../../../common/Status/status.component';

class DeletePolicy extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      selected: [],
      isLoadingProps_: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        isLoadingProps_: false,
        selected: nextProps.deletePolicy.map(zone => {
          return { value: zone.id, text: zone.id };
        })
      });
    }
  }

  handleClick = () => {
    let data = {
      policy_id: this.state.value
    };

    axios
      .delete(
        `${config.API_BASE_URL}policies/${this.state.value}?company_name=${
          this.props.value
        }`,
        data
      )
      .then(res => {
        toaster(res.data.message);
      })
      .catch(err =>
        iziToast.error({
          title: 'Error',
          message: 'An error occured!',
          position: 'topRight'
        })
      );
  };

  render() {
    return (
      <div className="get-threat">
        <Segment>
          <span> Policy Id </span>
          <br />
          <Dropdown
            placeholder="Select Zone"
            search
            selection
            onChange={(_, { value }) => {
              this.setState({ value });
            }}
            options={this.state.selected}
            loading={this.state.isLoadingProps_}
          />
          <Button onClick={this.handleClick}>DELETE POLICY</Button>
        </Segment>
      </div>
    );
  }
}

export default DeletePolicy;
