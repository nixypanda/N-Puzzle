/* @flow */

import Board from '../board/Board';

/**
 * The Search node class consists of the board and the search node that led
 * to this board, number of moves it took and the priority of the board (which
 * is the heuristic that we are using (it's admissible and cocnsistent)
 *
 * moves correspond the the actul path length to the present state
 * and manhattan distance is the estimated path length to the goal state
 * from the present state
 */
export default class SearchNode {
  board: Board;
  prev: ?SearchNode;
  moves: number;
  priority: number;

  constructor(board: Board, node: ?SearchNode) {
    this.board = board;
    this.prev = node;
    this.moves = !this.prev ? 0 : this.prev.moves + 1;
    this.priority = board.manhattan() + this.moves;
  }
}
