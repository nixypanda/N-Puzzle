/* @flow */

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import injectTapEventPlugin from "react-tap-event-plugin";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

import App from "../Components/App";
import DevTools from "./ReduxDevtools";

import "../index.css";

import configureStore from "../store/configureStore";

const store = configureStore();

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
