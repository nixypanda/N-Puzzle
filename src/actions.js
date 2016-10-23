/* @flow */

import Board from "./board/Board";

import type {
  ChangeGameAction,
  MakeMoveAction
} from "./types";

import {
  WON_GAME_AI,
  MAKE_MOVE,
  CHANGE_GAME,
  AUTOSOLVED_GAME,
  PRESENT_SOLUTION,
  START_AUTOSOLVING_THE_GAME
} from "./types";

/**
 * Action to start autosolving the game.
 * @return {[type]} [description]
 */
export const startAutosolving = () => ({
  type: START_AUTOSOLVING_THE_GAME
});

export const autoSolved = (solution: Array<Board>) => ({
  type: AUTOSOLVED_GAME,
  payload: solution
});

export const presentSolution = () => ({
  type: PRESENT_SOLUTION
});

export const donePresenting = () => ({
  type: WON_GAME_AI
});

export const makeMove = (board: Board): MakeMoveAction => ({
  type: MAKE_MOVE,
  payload: board
});

/**
 * Generate an action to changes the game to different n-by-n grid
 *
 * @param  {number} n governs the size of the board
 * @return {ActionType} Action to chage the game
 */
export const changeGame = (size: number): ChangeGameAction => ({
  type: CHANGE_GAME,
  payload: size
})
