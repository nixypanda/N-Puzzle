/* @flow */

import Board from "./board/Board";
import autoSolve from "./AI/Solver";

import type {
  AutosolvedAction,
  ChangeGameAction,
  ResetGameAction
} from "./types";

import {
  WON_GAME_AI,
  WON_GAME_USER,
  MAKE_MOVE,
  RESET_GAME,
  CHANGE_GAME,
  AUTOSOLVED_GAME,
  PRESENT_SOLUTION,
  START_AUTOSOLVING_THE_GAME
} from "./types";


/**
 * Generate an action to reset the game.
 *
 * @return {ActionType} Action to chage the game
 */
export const resetGame = (): ResetGameAction => ({
  type: RESET_GAME,
  payload: null
});

/**
 * Generate an action to auto-solve the game.
 *
 * @return {ActionType} Action to chage the game
 */
export const autosolveGame = (board: Board) =>
  (dispatch: Function) => {
    // Signifies start of autosolving.
    dispatch({ type: START_AUTOSOLVING_THE_GAME, payload: null });

    // Call in the autoSolve method with the board to be solved.
    // NOTE: make it async or atleast put a timeout.
    const solution = autoSolve(board);

    // Signifies that the game was solved but user was not presented with the solution.
    dispatch({ type: AUTOSOLVED_GAME, payload: solution });

    // Generate actions after a one second gap.
    let i = 1;
    const length = solution.length;
    dispatch({ type: PRESENT_SOLUTION, payload: null });

    // start dispatching actions per second towards the goal board
    const aiPlaying = setInterval(() => {
      // dispatch an action to change the present board
      dispatch({ type: MAKE_MOVE, payload: solution[i] });

      i += 1;
      if (i === length) {
        // when we reach the end of the solution then dispatch an action saying game was won
        dispatch({ type: WON_GAME_AI, payload: null })
        clearInterval(aiPlaying);
      }
    }, 1000);
  }

/**
 * Calls the move method on the board class when any of the numbers are pressed
 * on by the mouse.
 *
 * @param {number} index the index of the number that is pressed
 * @return {MakeMoveAction} Action to move board.
 */
export const moveOnIndexClick = (board, index) => ({
  type: MAKE_MOVE,
  payload: board.moveOnIndex(index)
});

/**
* Calls the appropriate method in board class on keydown event if the
* key pressed is one of the arrow keys.
*
* @param  {event} e An event object.
* @return {null} [nothing]
*/
export const moveOnKeyPress = (board, e) => {

  // Arrow key codes: LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
  // hence the function to call move on the blank tile is inverted so it
  // is more natural to the user.
  let moved = board.moveOnDirection(e.keyCode - 37);
  return { type: MAKE_MOVE, payload: moved };
}


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
