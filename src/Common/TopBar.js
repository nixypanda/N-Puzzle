"use strict";

import React, {Component} from 'react'
/** Importing the appbar from material-ui */
import AppBar from 'material-ui/lib/app-bar';

/**
 * React class to display a top bar
 */
export default class TopBar extends Component {
  /**
   * The required function for every react class it returns how
   * the top bar will look like.
   * @return {AppBar} A react class form material-ui theme
   */
  render() {
    return <AppBar title='N-Puzzle' />
  }
}
