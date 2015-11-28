"use strict";

var React = require('react');
var PropTypes = React.PropTypes;
const RaisedButton = require('material-ui/lib/raised-button');

/**
 *  This class handles the button that the app displays
 */
var ButtonFrame = React.createClass({
  /**
   * Handles the rendering of the button.
   * @return button The markup for the button 
   */
  render: function() {
    return (
      <div className='centered text-center'>
        <RaisedButton label='Solve' primary={true}/>
      </div>
    );
  }
});

module.exports = ButtonFrame;
