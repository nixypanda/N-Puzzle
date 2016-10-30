/* @flow */
import { combineReducers } from 'redux';

import type { ActionType, ModelType } from "./types";
import {
  // ActionTypes
  MAKE_MOVE,
  CHANGE_GAME,
  WON_GAME_AI,
  WON_GAME_USER,
  AUTOSOLVED_GAME,
  PRESENT_SOLUTION,
  START_AUTOSOLVING_THE_GAME,

  // Game state
  SOLVED_AI,
  SOLVING_AI,
  SOLVED_USER,
  SOLVING_USER,
  SHOWED_SOLUTION,
  SHOWING_SOLUTION
} from "./types";
import newBoard from "./board/BoardFactory";


/**
 * The initial model of our application.
 * @type {ModelType}
 */
const baseState = (n: number = 4): ModelType => ({
  N: n,
  board: newBoard(n),
  count: 0,
  solution: null,
  gameState: SOLVING_USER
});


/**
 * The update/reducer funciton.
 *
 * @param {ModelType} state The old state of the application.
 * @param {ActionType} action The action which needs to be triggered.
 * @return {ModelType} The new state of the application after the action.
 */
const reducer = (state: ModelType = baseState(4), action: ActionType): ModelType => {
  switch (action.type) {
    // make a move on the board.
    case MAKE_MOVE: {
      let { payload } = action;

      if (state.board.equals(payload)) {
        return state;
      }
      else if (payload.isGoal()) {
        return {
          ...state,
          board: payload,
          count: state.count + 1,
          // A way to generate WON_GAME_USER action.
          gameState: state.gameState === SOLVING_USER ? SOLVED_USER : state.gameState
        };
      }
      else {
        return {
          ...state,
          board: payload,
          count: state.count + 1
        };
      }
    }
    // what to do when the user wins the game
    case WON_GAME_USER: {
      return {
        ...state,
        gameState: SOLVED_USER
      };
    }
    // Have shown the dumb user how it's done :P
    case WON_GAME_AI: {
      return {
        ...state,
        gameState: SHOWED_SOLUTION
      };
    }
    // start presenting the solution to the user
    case PRESENT_SOLUTION: {
      return {
        ...state,
        gameState: SHOWING_SOLUTION
      };
    }
    // change the game
    case CHANGE_GAME: {
      return baseState(action.payload);
    }
    // The AI is done solving the game and is ready to present the solution to the user.
    case AUTOSOLVED_GAME: {
      return {
        ...state,
        gameState: SOLVED_AI,
        solution: action.payload
      };
    }
    // Ask the AI to solve the game.
    case START_AUTOSOLVING_THE_GAME: {
      return {
        ...state,
        gameState: SOLVING_AI
      };
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  app: reducer
});
