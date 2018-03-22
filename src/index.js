import React from 'react';
import ReactDOM from 'react-dom';
// styles
import './index.css';
import 'semantic-ui-css/semantic.min.css';

// components
import App from './App';

// service worker
import registerServiceWorker from './registerServiceWorker';

const MOUNT_NODE = document.getElementById('root')
ReactDOM.render(<App />, MOUNT_NODE );
registerServiceWorker();
