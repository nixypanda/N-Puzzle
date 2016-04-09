import React, { PropTypes } from 'react';
import MUI, { RaisedButton, Toolbar, ToolbarGroup } from 'material-ui';

const Colors = MUI.Styles.Colors;

// Returns the styling for the div enclosing the counter and the reset button
const __topFrameStyle__ = (N, cellWidth) => ({
  width: N * cellWidth + 80,
  margin: 'auto',
  backgroundColor: Colors.grey50
});

/*
 * This class displays the counter and the reset button at the top of the
 * board.
 */
const TopFrame = (props) => (
    <Toolbar style={__topFrameStyle__(props.N, props.cellWidth)} >
      <ToolbarGroup firstChild={true} float="left">
        <RaisedButton label={'Moves: ' + props.count} />
      </ToolbarGroup>
      <ToolbarGroup float='right' lastChild={true}>
        <RaisedButton
          label='Reset'
          onClick={props.reset}
          primary={true} />
      </ToolbarGroup>
    </Toolbar>
  );

TopFrame.defaultProps = {
  cellWidth: 100
};

TopFrame.propTypes = {
  N: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  cellWidth: PropTypes.number
};

export default TopFrame;
