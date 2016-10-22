/* @flow */

import Board from "../board/Board";
import SearchNode from "./SearchNode";
import PriorityQueue from "../helpers/PriorityQueue";

// adds neighbouring boards of a given search-node to the priority-queue
// that is passed.
const __addNeighbours__ = (searchNode: SearchNode, priorityQueue: PriorityQueue<SearchNode>): void => {
  searchNode.board.neighbours()
    .map(b => new SearchNode(b, searchNode))
    .filter(n => searchNode.prev === null || !n.board.equals(searchNode.prev.board))
    .forEach(n => priorityQueue.push(n, n.priority));
};


/**
 * This is the method that implements the ever popular A* Search. The heuristic
 * that I am using here is the manhattan distance with the current number of
 * moves. The lower the number the more likly is the node next up for exploration.
 *
 * @param  {[type]} board [the board for which solution is required]
 * @return {[type]}    [ an array of boards that lead to solution (in reverse order) ]
 */
const __aStar__ = (board: Board): Array<Board> => {
  // starting point for the solutionof the actual board
  let searchNode = new SearchNode(board, null);
  // priority queue for the actual board
  let pq = new PriorityQueue();
  let solution = [];

  pq.push(searchNode, searchNode.priority);

  while (!searchNode.board.isGoal()) {
    // pop both the queues to get the next highest priority board
    searchNode = pq.pop();

    // add neighbours to the priority queue
    __addNeighbours__(searchNode, pq);
  }

  // if a solution exists retrace it (check docs of search node)
  // achieved by maintaing a pointer to the board that lead to the
  // current board
  while (searchNode !== null) {
    // push: O*(1), unshift: O(n)
    solution.push(searchNode.board);
    searchNode = searchNode.prev;
  }

  return solution;
};


/**
 * This is just a wrapper function around the one that does the A* search.
 *
 * @param  {Board} board the bord object for which the solver is generated
 * @return {Array<Board>} array of boards leading to solution
 */
const SolutionTo = (board: Board): Array<Board> => {
  let stack = board.isSolvable ? __aStar__(board) : [];

  // Why not directly use unshift? effeciency
  stack.reverse();
  return stack;
};

export default SolutionTo;
