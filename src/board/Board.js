/* @flow */

import { inversionCount } from '../helpers/Helpers';
import R from 'ramda';

const RIGHT = 0;
const DOWN = 1;
const LEFT = 2;
const UP = 3;


/**
 * The board class represents the state of the board at a given
 * point of time it also contains functions compute the neighbours of the
 * current state, it's twin and hamming and manhattan distance to the goal
 * state.
 */
export default class Board {
  board: Array<number>;
  goalBoard: Array<number>;
  N: number;
  zeroIndex: number;

  constructor(board: Array<number>): void {
    this.N = Math.sqrt(board.length);
    this.board = board;
    // tracking index of zero to reduce move operation from O(n) -> O(1)
    this.zeroIndex = this.board.indexOf(0);
    this.goalBoard = R.range(0, this.N * this.N).map(i => (i + 1) % (this.N * this.N));
  }

  /**
   * Check if the board has reached the final goal state
   * @return {Boolean} [true if board in final state]
   */
  isGoal(): boolean {
    return (
      R.zipWith((a, b) => a === b, this.board, this.goalBoard)
        .reduce((a, b) => a && b, true)
    );
  }

  equals(that: Board): boolean {
    return (
      R.zipWith((a, b) => a === b, this.board, that.board)
        .reduce((a, b) => a && b, true)
    );
  }

  /**
   * Moves the board in the specified direction why these number it's keycode(arrow key - left arrow key)
   * left-right, and up-down are inverted so it's more intutive to operate
   * 0 -> right
   * 1 -> downward
   * 2 -> left
   * 3 -> up
   *
   * @param  {[type]} direction [description]
   * @return {[type]}           [description]
   */
  moveOnDirection(direction: number): boolean {
    let tile = -1;
    switch (direction) {
      case RIGHT: { tile = this.zeroIndex + 1; break; }
      case DOWN: { tile = this.zeroIndex + this.N; break; }
      case LEFT: { tile = this.zeroIndex - 1; break; }
      case UP: { tile = this.zeroIndex - this.N; break; }
      default: { break; }
    }
    if (this.__makeMove__(this.zeroIndex, tile)) {
      this.zeroIndex = tile;
      return true;
    }
    return false;
  }

  /**
   * Makes an appropriate move based on the key
   * that is passed to it
   * @param  {number} index [the index of the number that is supposed to move to the locaation of 0]
   * @return {boolean}     [true if the move is possible and was made]
   */
  moveOnIndex(index: number): boolean {
    for (let zeroIndex of [ 1, -1, this.N, -this.N ].map(i => index + i)) {
      if (this.zeroIndex === zeroIndex) {
        this.__makeMove__(this.zeroIndex, index);
        this.zeroIndex = index;
        return true;
      }
    }
    return false;
  }

  // AI (A*) Helper methods //

  /**
   * Finds if the given board is solvable or not in tiem proportional O(n^4)
   * where n is the size of the board
   *
   * @return {[null]} [nothing]
   */
  isSolvable(): boolean {
    let zeroIndex = this.board.indexOf(0);
    let zeroLoc = this.N - Math.floor(zeroIndex / this.N);
    let inversions = inversionCount(this.board.slice()) - zeroIndex;

    if (this.N % 2 === 1) {
      return inversions % 2 === 0;
    }
    return zeroLoc % 2 === 1 ? inversions % 2 === 0 : inversions % 2 === 1;
  }

  /**
   * Calculate the hamming distance to the goal state (i.e. the number
   * of tiles out of place)
   * e.g [8, 1, 3, 4, 0, 2, 7, 6, 5] : 5
   *
   * @return {number} [the hamming distance from the present board to the goal state]
   */
  hamming(): number {
    return (
      this.board
        .map((x, i) => x !== i + 1)
        .reduce((a, b) => a + b, 0) - 1
    );
  }

  /**
   * Returns the manhattan/taxi-cab distance from current board state to
   * the goal state. (i.e.) the cumulative distance of every tile to it's
   * final position
   * e.g [8, 1, 3, 4, 0, 2, 7, 6, 5] : 10
   *
   * @return {number} [the manhattan distance from the present board to the goal state]
   */
  manhattan(): number {
    const manhattanOfTile = (value, index) => {
      if (value === 0) {
        return 0;
      }

      // final position of the ith-tile
      let fy = Math.floor(index / this.N);
      let fx = Math.floor(index % this.N);

      // initial position of the ith-tile
      let iy = Math.floor((value - 1) / this.N);
      let ix = Math.floor((value - 1) % this.N);

      // diff bw the initial and the final position
      return Math.abs(ix - fx) + Math.abs(iy - fy);
    };

    return (
      this.board
        .map(manhattanOfTile)
        .reduce((a, b) => a + b, 0)
    );
  }

  // Obselete
  /**
   * Returns a board that is the copy of the board with two tiles swaped.
   * (tiles belong to the same row)
   * One of the original and twin is solvable the other is not.
   *
   * @return {board} [the twin of the present board]
   */
  twin(): Board {
    let condition = (this.board[0] !== 0) && (this.board[1] !== 0);
    let x = condition ? 0 : this.N;
    let y = condition ? 1 : this.N + 1;

    return this.__exchBoard__(x, y);
  }

  /**
   * Returns the list of all the configurations that are possible after
   * a single move of the tile.(min 1, max 4)
   *
   * @return {[board]} the list of neighbours of the present board
   */
  neighbours(): Array<Board> {
    // board by exchanging empty tile with the tile above it
    // include if the empty tile is not in first row
    let top = null;
    let left = null;
    let bottom = null;
    let right = null;

    if (this.zeroIndex > this.N - 1) {
      top = this.__exchBoard__(this.zeroIndex, this.zeroIndex - this.N);
    }

    // board by exchanging empty tile with the tile to left it
    // include if the empty tile is not in first column
    if (this.zeroIndex % this.N !== 0) {
      left = this.__exchBoard__(this.zeroIndex, this.zeroIndex - 1);
    }

    // board by exchanging empty tile with the tile bottom of it
    // include if the empty tile is not in last row
    if (this.zeroIndex < this.board.length - this.N) {
      bottom = this.__exchBoard__(this.zeroIndex, this.zeroIndex + this.N);
    }

    // board by exchanging empty tile with the tile to the right of it
    // include if the empty tile is not in last column
    if (this.zeroIndex % this.N !== this.N - 1) {
      right = this.__exchBoard__(this.zeroIndex, this.zeroIndex + 1);
    }

    return [top, left, bottom, right].filter(b => b !== null);
  }

  // Private Helper functions //

  // swaps the given tiles of the original board and returns the resulting
  // board
  __exchBoard__(zi: number, nzi: number): Board {
    let newBoard = this.board.slice(0);

    // if (zi >= 0 && nzi >= 0 && zi < this.board.length && nzi < this.board.length) {
    let temp = newBoard[zi];
    newBoard[zi] = newBoard[nzi];
    newBoard[nzi] = temp;
    return new Board(newBoard);
    // }
    // return null;
  }

  // private helper to exchange the board tiles
  __makeMove__(i: number, j: number): boolean {
    // do not make a move for tiles if one is at the edge of a row and another is at the start of the next row
    if ((Math.min(i, j) % this.N === this.N - 1) && (Math.max(i, j) % this.N === 0)) {
      return false;
    }
    if (i >= 0 && j >= 0 && i < this.board.length && j < this.board.length) {
      let temp = this.board[i];
      this.board[i] = this.board[j];
      this.board[j] = temp;
      return true;
    }
    return false;
  }
}
