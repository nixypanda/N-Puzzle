import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './css/style.css';
import App from './Components/App';
import MyRawTheme from './Common/theme';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

class AppWrapper extends React.Component {

  // the key passed through context must be called "muiTheme"
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  getChildContext() {
    return {
      muiTheme: getMuiTheme(MyRawTheme)
    };
  }

  render() {
    return (<App />);
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
