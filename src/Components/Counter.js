import React, { PropTypes } from 'react';
import { RaisedButton, Toolbar, ToolbarGroup } from 'material-ui';

import Colors from 'material-ui/lib/styles/colors';


/**
 * This class displays the counter and the reset button at the top of the
 * board.
 */
export default class Counter extends React.Component {

  static defaultProps = {
    cellWidth: 100
  };

  static propTypes = {
    N: PropTypes.number.isRequired,
    reset: PropTypes.func.isRequired,
    count: PropTypes.numer.isRequired,
    cellWidth: PropTypes.number
  };

  // Returns the styling for the div enclosing the counter and the reset button
  __topFrameStyle__() {
    return {
      width: this.props.N * this.props.cellWidth + 80,
      margin: 'auto',
      backgroundColor: Colors.grey50
    };
  }

  // Returns the styling for the counter.
  __counterStyle__() {
    return {
      display: 'inline-block',
      width: 100,
      height: 40,
      textAlign: 'center'
    };
  }

  // the rendre method
  render() {
    return (
      <Toolbar style={this.__topFrameStyle__()} >
        <ToolbarGroup firstChild={true} float="left">
          <RaisedButton label={'Moves: ' + this.props.count} />
        </ToolbarGroup>
        <ToolbarGroup float='right' lastChild={true}>
          <RaisedButton
            label='Reset'
            onClick={this.props.reset}
            primary={true} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
