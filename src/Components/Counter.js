"use strict";

var React = require('react');
var PropTypes = React.PropTypes;

const RaisedButton = require('material-ui/lib/raised-button');
const Paper = require('material-ui/lib/paper');

var Counter = React.createClass({

  render: function() {
    return (
      <div className='misc'>
        <Paper className='counter' zDepth={1}>
          <p >Moves: {this.props.count}</p>
        </Paper>
        <RaisedButton className='reset-button'
          onClick={this.props.reset} label='Reset' primary={true}/>
      </div>
    );
  }

});

module.exports = Counter;
