import SearchNode from './SearchNode';
import PriorityQueue from '../helpers/PriorityQueue';

/**
 * This is the class that implements the ever popular A* Search. The heuristic
 * that I am using here is the manhattan distance with the current number of
 * moves. The lower the number the more likly is the node next up for
 * exploration.
 */
export default class Solver {

  /**
   * The constructor initializes the various variables and also calls the
   * method that runs the A* search. Now here I have gone for a naive
   * implementation where I am keeping track of both the actual board and its
   * twin so I can check if the board is solvable or not. (Not that it's
   * required but just in case for future expansion).
   *
   * @param  {[array]} board [the bord object for which the solver is generated]
   * @return {[null]}       [null]
   */
  constructor(board) {
    this.board = board;
    this.solvable = false;
    this.moves = 0;
    this.stack = [];

    // starting point for the solution of the actual board
    let sn = new SearchNode(this.board, null);

    // priority queue for the actual board
    let pq = new PriorityQueue();

    if (this.board.isSolvable) {
      this.__aStar__(sn, pq);
    }
  }

  // Private helper: The A* search algorithm
  __aStar__(sn, pq) {
    let searchNode = sn;
    pq.push(searchNode, searchNode.priority);

    while (true) {
      // pop both the queues to get the next highest priority board
      searchNode = pq.pop();

      // check if already goal then quit
      if (searchNode.board.isGoal()) {
        this.moves = searchNode.moves;
        this.solvable = true;
        break;
      }

      // add neighbours to the priority queue
      this.__addNeighbours__(searchNode, pq);
    }

    // if a solution exists retrace it (check docs of search node)
    // achieved by maintaing a pointer to the board that lead to the
    // current board
    if (this.solvable) {
      while (searchNode !== null) {
        this.stack.push(searchNode.board);
        searchNode = searchNode.prev;
      }
    }
  }

  // adds neighbouring boards of a given search-node to the priority-queue
  // that is passed.
  __addNeighbours__(sn, pq) {
    for (let board of sn.board.neighbours()) {
      let n = new SearchNode(board, sn);
      if (sn.prev === null || !n.board.equals(sn.prev.board)) {
        pq.push(n, n.priority);
      }
    }
  }

  /**
   * Returns the sequence of bords that result in the solution from the start state
   * @return {[array]} [sequence of bords that result in the solution from the start state]
   */
  solution() {
    this.stack.reverse();
    return this.stack;
  }
}
