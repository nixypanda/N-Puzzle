/* @flow */

import React from 'react';
import { grey50 } from 'material-ui/styles/colors';

import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';


type TopFramePropsType = {
  N: number,
  reset: () => void,
  count: number,
  cellWidth: number
};


/**
 * Returns the styling for the div enclosing the counter and the reset button
 * @param  {number} N The size of the board
 * @param  {number} cellWidth The size (horizontal) of the cell
 * @return {object} The style object
 */
const __topFrameStyle__ = (N: number, cellWidth: number) => ({
  width: N * cellWidth + 80,
  margin: 'auto',
  backgroundColor: grey50
});


/**
 * This class displays the counter and the reset button at the top of the board.
 *
 * @param {TopFramePropsType} props The props object
 * @return {React.Element<*>} Render information of the TopFrame
 */
const TopFrame = (props: TopFramePropsType): React.Element<*> => (
  <Toolbar style={__topFrameStyle__(props.N, props.cellWidth)}>
    <ToolbarGroup firstChild={true} float="left">
      <RaisedButton label={'Moves: ' + props.count} />
    </ToolbarGroup>
    <ToolbarGroup float='right' lastChild={true}>
      <RaisedButton
        label='Reset'
        onClick={props.reset}
        secondary
      />
    </ToolbarGroup>
  </Toolbar>
);


TopFrame.defaultProps = {
  cellWidth: 100
};

export default TopFrame;
