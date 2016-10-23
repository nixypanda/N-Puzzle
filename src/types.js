/* @flow */

import Board from "./board/Board";

/* THE ACTIONS */

export type GameState =
    "SOLVED_AI"
  | "SOLVING_AI"
  | "UNSOLVABLE"
  | "SOLVED_USER"
  | "SOLVING_USER"
  | "SHOWED_SOLUTION"
  | "SHOWING_SOLUTION"
  | "SOLVING_FAILED_AI"
  ;

export const MAKE_MOVE = "MAKE_MOVE";
export const RESET_GAME = "RESET_GAME";
export const WON_GAME_AI = "WON_GAME_AI";
export const CHANGE_GAME = "CHANGE_GAME";
export const WON_GAME_USER = "WON_GAME_USER";
export const AUTOSOLVED_GAME = "AUTOSOLVED_GAME";
export const PRESENT_SOLUTION = "PRESENT_SOLUTION";
export const START_AUTOSOLVING_THE_GAME = "START_AUTOSOLVE_GAME";

export type MakeMoveAction = { type: "MAKE_MOVE", payload: Board };
export type ResetGameAction = { type: "RESET_GAME", payload: null };
export type WonGameAIAction = { type: "WON_GAME_AI", payload: null };
export type ChangeGameAction = { type: "CHANGE_GAME", payload: number };
export type WonGameUserAction = { type: "WON_GAME_USER", payload: null };
export type PresentSolutionAction = { type: "PRESENT_SOLUTION", payload: null };
export type AutosolvedAction = { type: "AUTOSOLVED_GAME", payload: Array<Board> };
export type StartAutosolveAction = { type: "START_AUTOSOLVE_GAME", payload: null };


export type ActionType =
    WonGameAIAction
  | WonGameUserAction
  | MakeMoveAction
  | ResetGameAction
  | ChangeGameAction
  | AutosolvedAction
  | StartAutosolveAction
  | PresentSolutionAction
  ;

/* THE MODEL */

export type ModelType = {
  N: number,
  board: Board,
  count: number,
  gameState: GameState,
  solution: ?Array<Board>
};
