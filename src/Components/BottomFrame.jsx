/* @flow */

import React from "react";
import RaisedButton from "material-ui/RaisedButton";

type BottomFramePropsType = {
  N: number,
  won: boolean,
  autosolve: boolean,
  activateAI: () => void,
  solvable: boolean
};

/**
 * The information that will be displayed at the bottom of the screen.
 *
 * @param {BottomFramePropsType} props Expected props
 * @return {React.Element<*>} Render info for what will be displayed at the bottom.
 */
const BottomFrame = (props: BottomFramePropsType): React.Element<*> => (
  (!props.won) ? (<SolvingFrame {...props}/>) : (<WinFrame {...props} />)
);


/*********************/
/* The Winning Frame */
/*********************/

/**
 * What to display when the board has reached the goal state.
 *
 * @param {{ autosolve: boolean }} { autosolve } Boolean indicating if the user used god mode.
 * @return {React.Element<*>} The render info of the win frame.
 */
const WinFrame = ({ autosolve }: { autosolve: boolean }): React.Element<*> => (
  <h2 className="centered text-center">
    {autosolve ? "And that's how you solve it" : "YOU WON!"}
  </h2>
);


/********************************/
/* The I am still solving Frame */
/********************************/

/**
 * The information that will be displayed at the bottom of the screen if the user is still solving the puzzle.
 *
 * @param {BottomFramePropsType} props Expected props
 * @return {React.Element<*>} Render info for what will be displayed at the bottom if still solving :(.
 */
const SolvingFrame = (props: BottomFramePropsType): React.Element<*> => (
  <div className="centered text-center">
    {!props.solvable ? "This puzzle is not solvable" : <InstructionsFrame N={props.N} />}
    {props.N < 4 ? (<SolveButton {...props} />) : (<div></div>)}
  </div>
);


/**
 * Playing instructions for the n-puzzle game.
 * @param {{ N: number }} { N } Number indicating the size of the board.
 * @return {React.Element<*>} The render info of the instructions frame.
 */
const InstructionsFrame = ({ N }: { N: number }): React.Element<*> => {
  const msg = N < 4 ? "On clicking solve you will get the solution in shortest number of moves." : null;

  return (
    <div className="container">
      <div className="span12">
        <p><b>Instructions:</b> Use the arrow keys to move tiles. {msg} </p>
      </div>
    </div>
  );
};


/**
 * Displays a button which can be used to trigger the god mode.
 *
 * @param {boolean} autosolve Boolean indicating if the AI has alredy been triggered.
 * @param {boolean} solvable Boolean indicating if the board is solvable.
 * @param {Function} activateAI Triggers the AI.
 * @return {React.Element<*>} Render information of the solve button.
 */
const SolveButton = ({ autosolve, solvable, activateAI }: BottomFramePropsType): React.Element<*> => (
  <div className="col-sm-12">
    <RaisedButton
      disabled={autosolve || !solvable}
      label="Solve"
      onClick={activateAI.bind(null, true)}
      secondary
    />
  </div>
);


export default BottomFrame;
