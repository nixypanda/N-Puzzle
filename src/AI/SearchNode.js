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

  constructor(board, node) {
    this.board = board;
    this.prev = node;
    this.moves = !node ? 0 : this.prev.moves + 1;
    this.priority = board.manhattan() + this.moves;
  }
}
