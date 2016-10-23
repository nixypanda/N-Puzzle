/* @flow */

import type { GameState } from "../types";

import React from "react";

import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from 'material-ui/CircularProgress';

import {
  SOLVED_AI,
  SOLVING_AI,
  UNSOLVABLE,
  SOLVED_USER,
  SOLVING_USER,
  SHOWED_SOLUTION,
  SHOWING_SOLUTION,
  SOLVING_FAILED_AI
} from "../types";


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
    case SOLVED_AI: {
      frame = "Solved (Initiating presentation)"
      break;
    }
    case SOLVING_AI: {
      frame = (<CircularProgress size={60} thickness={7} />);
      break;
    }
    case UNSOLVABLE: {
      frame = "This one can't be solved"
      break;
    }
    case SOLVED_USER: {
      frame = "YOU WON!!"
      break;
    }
    case SOLVING_USER: {
      frame = (
        <div>
          <p>
            <b>Instructions:</b>
            Use the arrow keys to move tiles.
            {N < 4 ? "On clicking solve you will get the solution in shortest number of moves." : null}
          </p>
          {N < 4 ? (<RaisedButton label="Solve" onClick={activateAI.bind(null, true)} secondary />) : (<div></div>)}
        </div>
      );
      break;
    }
    case SHOWED_SOLUTION: {
      frame = "And that's how you solve it"
      break;
    }
    case SHOWING_SOLUTION: {
      frame = "Look and Learn"
      break;
    }
    case SOLVING_FAILED_AI: {
      frame = "Ha..Can't do it :P"
      break;
    }
    default: {
      frame = (<div></div>);
      break;
    }
  }
  return (
    <div className="centered text-center">
      {frame}
    </div>
  );
};


export default BottomFrame;
