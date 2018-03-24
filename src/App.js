import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Main from '../src/pages/Main.component';

// styles
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    );
  }
}

export default App;
