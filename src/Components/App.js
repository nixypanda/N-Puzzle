"use strict";

var React = require('react');
var PropTypes = React.PropTypes;

var TopBar = require('../Common/TopBar');
var TheBoard = require('./TheBoard');
var ButtonFrame = require('./ButtonFrame');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <TopBar />
        <TheBoard />
        <ButtonFrame />
      </div>
    );
  }
});

module.exports = App;
