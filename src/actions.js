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
 *
 * @return {ActionType} The action signifying the start of autosolving.
 */
export const startAutosolving = () => ({
  type: START_AUTOSOLVING_THE_GAME
});


/**
 * Generate an action when AI finishes with the A* search algorithm.
 *
 * @param  {Array<Board>} solution The boards that lead to the final goal board.
 * @return {ActionType} Action object that will lead to solving of the board.
 */
export const autoSolved = (solution: Array<Board>) => ({
  type: AUTOSOLVED_GAME,
  payload: solution
});


/**
 * The action to signify that we need to show the solution to the user.
 *
 * @return {ActionType} The action object that will lead to presenting the solution to the user.
 */
export const presentSolution = () => ({
  type: PRESENT_SOLUTION
});


/**
 * Action signifying that we have shown the solution to the user.
 *
 * @return {ActionType} Action signifying that we have shown the solution to the user.
 */
export const donePresenting = () => ({
  type: WON_GAME_AI
});


/**
 * Given a board generate an action leading to replacement of the current board with the new one.
 *
 * @param  {Board} board The new board to which we want to move.
 * @return {ActionType} Action leading to replacement of the current board with the new one.
 */
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
