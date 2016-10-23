/* @flow */

import type { GameState } from "../types";

import React from "react";

import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from 'material-ui/CircularProgress';

type BottomFramePropsType = {
  N: number,
  gameState: GameState,
  activateAI: () => void
};

/**
 * The information that will be displayed at the bottom of the screen.
 *
 * @param {BottomFramePropsType} props Expected props
 * @return {React.Element<*>} Render info for what will be displayed at the bottom.
 */
const BottomFrame = ({ gameState, N, activateAI }: BottomFramePropsType): React.Element<*> => {
  let frame = (<div></div>);
  switch (gameState) {
    case "SOLVED_AI": {
      frame = (
        <h2 className="centered text-center">
          Solved (Initiating presentation)
        </h2>
      );
      break;
    }
    case "SOLVING_AI": {
      frame = (
        <div className="container">
          <div className="span12">
            <CircularProgress size={60} thickness={7} />
          </div>
        </div>
      );
      break;
    }
    case "UNSOLVABLE": {
      frame = (
        <h2 className="centered text-center">
          This one can't be solved
        </h2>
      );
      break;
    }
    case "SOLVED_USER": {
      frame = (
        <h2 className="centered text-center">
          YOU WON!!
        </h2>
      );
      break;
    }
    case "SOLVING_USER": {
      const msg = N < 4 ? "On clicking solve you will get the solution in shortest number of moves." : null;
      frame = (
        <div className="centered text-center">
          <div className="container">
            <div className="span12">
              <p><b>Instructions:</b> Use the arrow keys to move tiles. {msg} </p>
            </div>
          </div>
          <div className="col-sm-12">
            <RaisedButton
              label="Solve"
              onClick={activateAI.bind(null, true)}
              secondary
            />
          </div>
        </div>
      );
      break;
    }
    case "SHOWED_SOLUTION": {
      frame = (
        <h2 className="centered text-center">
          And that's how you solve it
        </h2>
      );
      break;
    }
    case "SHOWING_SOLUTION": {
      frame = (
        <h2 className="centered text-center">
          Look and Learn
        </h2>
      );
      break;
    }
    case "SOLVING_FAILED_AI": {
      frame = (
        <h2 className="centered text-center">
          Ha..Can't do it :P
        </h2>
      );
      break;
    }
    default: {
      frame = (<div></div>);
      break;
    }
  }
  return frame;
};


export default BottomFrame;
