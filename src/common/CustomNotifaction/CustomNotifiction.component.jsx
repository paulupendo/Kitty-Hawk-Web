import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

class Notifaction extends Component {
  notify = () => toast('Wow so easy !');

  render() {
    return (
      <div>
        <button onClick={this.notify}>Notify !</button>
        <ToastContainer />
      </div>
    );
  }
}
export default Notifaction;