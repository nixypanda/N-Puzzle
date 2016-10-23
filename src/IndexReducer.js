/* @flow */
import { combineReducers } from 'redux';

import type { ActionType, ModelType } from "./types";
import {
  MAKE_MOVE,
  RESET_GAME,
  CHANGE_GAME,
  WON_GAME_AI,
  WON_GAME_USER,
  AUTOSOLVED_GAME,
  PRESENT_SOLUTION,
  START_AUTOSOLVING_THE_GAME
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
  gameState: "SOLVING_USER"
});


const reducer = (state: ModelType = baseState(4), { type, payload }: ActionType): ModelType => {
  switch (type) {
    case MAKE_MOVE: {
      if (state.board.equals(payload)) {
        return state;
      } else if (payload.isGoal()) {
        return { ...state, board: payload, count: state.count + 1, gameState: "SOLVED_USER" };
      } else {
        return { ...state, board: payload, count: state.count + 1 };
      }
    }
    case WON_GAME_USER: {
      return { ...state, gameState: "SOLVED_USER" };
    }
    case WON_GAME_AI: {
      return { ...state, gameState: "SHOWED_SOLUTION" };
    }
    case PRESENT_SOLUTION: {
      return { ...state, gameState: "SHOWING_SOLUTION" };
    }
    case CHANGE_GAME: {
      return baseState(payload);
    }
    case RESET_GAME: {
      return baseState(state.N);
    }
    case AUTOSOLVED_GAME: {
      return { ...state, gameState: "SOLVED_AI", solution: payload };
    }
    case START_AUTOSOLVING_THE_GAME: {
      return { ...state, gameState: "SOLVING_AI" };
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  app: reducer
});
