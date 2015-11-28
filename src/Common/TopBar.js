"use strict";

var React = require('react');

/** Importing the appbar from material-ui */
const AppBar = require('material-ui/lib/app-bar');

/**
 * React class to display a top bar
 */
var TopBar = React.createClass({
  /**
   * The required function for every react class it returns how
   * the top bar will look like.
   * @return {AppBar} A react class form material-ui theme
   */
  render: function() {
    return (
        <AppBar title='N-Puzzle' />
    );
  }
});

// exporting the module so it becomes available to other classess
module.exports = TopBar;
