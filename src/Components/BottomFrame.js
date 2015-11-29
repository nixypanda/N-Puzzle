"use strict";

var React = require('react');
var PropTypes = React.PropTypes;
const RaisedButton = require('material-ui/lib/raised-button');

/**
*  This class handles the button that the app displays
*/
var BottomFrame = React.createClass({
  /**
  * Handles the rendering of the button.
  * @return button The markup for the button
  */
  render: function() {
    var disabled = false;
    if (this.props.autosolve) {
      disabled = true;
    }
    if (this.props.processing) {
      return (<p>processing</p>);
    }
    else {
      if (! this.props.won) {
        return (
          <div className='centered text-center'>
            <RaisedButton label='Solve' primary={true} disabled={disabled}
              onClick={this.props.activateAI.bind(null, true)} />
          </div>
        );
      }
      else {
        return (<h1 className='centered text-center'>YOU WON!!</h1>);
      }
    }
  }
});

module.exports = BottomFrame;
