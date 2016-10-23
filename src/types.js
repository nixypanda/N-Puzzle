/* @flow */

import Board from "./board/Board";

/* ACTION TYPE DECLARATIONS */

export type MakeMoveActionType = "MAKE_MOVE";
export type WonGameAIActionType = "WON_GAME_AI";
export type ChangeGameActionType = "CHANGE_GAME";
export type WonGameUserActionType = "WON_GAME_USER";
export type AutosolvedActionType = "AUTOSOLVED_GAME";
export type PresentSolutionActionType = "PRESENT_SOLUTION";
export type StartAutosolveActionType = "START_AUTOSOLVE_GAME";

export const MAKE_MOVE: MakeMoveActionType = "MAKE_MOVE";
export const WON_GAME_AI: WonGameAIActionType = "WON_GAME_AI";
export const CHANGE_GAME: ChangeGameActionType = "CHANGE_GAME";
export const WON_GAME_USER: WonGameUserActionType = "WON_GAME_USER";
export const AUTOSOLVED_GAME: AutosolvedActionType = "AUTOSOLVED_GAME";
export const PRESENT_SOLUTION: PresentSolutionActionType = "PRESENT_SOLUTION";
export const START_AUTOSOLVING_THE_GAME: StartAutosolveActionType = "START_AUTOSOLVE_GAME";


/* THE ACTIONS */

export type WonGameAIAction = { type: WonGameAIActionType };
export type WonGameUserAction = { type: WonGameAIActionType };
export type PresentSolutionAction = { type: PresentSolutionActionType };
export type StartAutosolveAction = { type: StartAutosolveActionType };
export type MakeMoveAction = { type: MakeMoveActionType, payload: Board };
export type ChangeGameAction = { type: ChangeGameActionType, payload: number };
export type AutosolvedAction = { type: AutosolvedActionType, payload: Array<Board> };


/**
 * All the valid actions our game can generate.
 * @type {ActionType}
 */
export type ActionType =
    WonGameAIAction
  | WonGameUserAction
  | MakeMoveAction
  | ChangeGameAction
  | AutosolvedAction
  | StartAutosolveAction
  | PresentSolutionAction
  ;


/* THE MODEL */

type SolvedAIState = "SOLVED_AI";
type SolvingAIState = "SOLVING_AI";
type UnsolvableState = "UNSOLVABLE";
type SolvedUserState = "SOLVED_USER";
type SolvingUserState = "SOLVING_USER";
type ShowedSolutionState = "SHOWED_SOLUTION";
type ShowingSolutionState = "SHOWING_SOLUTION";
type SolvingFailedAIState = "SOLVING_FAILED_AI";

export const SOLVED_AI: SolvedAIState = "SOLVED_AI";
export const SOLVING_AI: SolvingAIState = "SOLVING_AI";
export const UNSOLVABLE: UnsolvableState = "UNSOLVABLE";
export const SOLVED_USER: SolvedUserState = "SOLVED_USER";
export const SOLVING_USER: SolvingUserState = "SOLVING_USER";
export const SHOWED_SOLUTION: ShowedSolutionState = "SHOWED_SOLUTION";
export const SHOWING_SOLUTION: ShowingSolutionState = "SHOWING_SOLUTION";
export const SOLVING_FAILED_AI: SolvingFailedAIState = "SOLVING_FAILED_AI";


/**
 * All the states our game can be in.
 * @type {[type]}
 */
export type GameState =
    SolvedAIState
  | SolvingAIState
  | UnsolvableState
  | SolvedUserState
  | SolvingUserState
  | ShowedSolutionState
  | ShowingSolutionState
  | SolvingFailedAIState
  ;

/**
 * The type of State/Model of our application.
 * @type {ModelType}
 */
export type ModelType = {
  N: number,
  board: Board,
  count: number,
  gameState: GameState,
  solution: ?Array<Board>
};
