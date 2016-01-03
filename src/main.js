import {$} from 'jquery';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('n_puzzle'));
