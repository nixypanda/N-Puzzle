"use strict";

import Board from '../board/Board';
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
     */
    constructor(board) {
        this.b = board;
        this.solvable = false;
        this.moves = 0;
        this.stack = [];

        // starting point for the solution of the actual board 
        let sn = new SearchNode(this.b, null);

        // priority queue for the actual board
        let pq = new PriorityQueue();

        if (this.b.isSolvable) {
            this.__aStar__(sn, pq);
        }
    }

    // Private helper: The A* search algorithm
    __aStar__(sn, pq) {
        pq.push(sn, sn.priority);

        while (true) {
            // pop both the queues to get the next highest priority board
            sn = pq.pop();

            // check if already goal then quit
            if (sn.board.isGoal()) {
                this.moves = sn.moves;
                this.solvable = true;
                break;
            }

            // add neighbours to the priority queue
            this.__addNeighbours__(sn, pq);
        }

        // if a solution exists retrace it (check docs of search node)
        // achieved by maintaing a pointer to the board that lead to the 
        // current board
        if (this.solvable) {
            while (sn != null) {
                this.stack.push(sn.board);
                sn = sn.prev;
            }
        }
    }

    // adds neighbouring boards of a given search-node to the priority-queue
    // that is passed.
    __addNeighbours__(sn, pq) {
        let neighbours = sn.board.neighbours();

        for (let i = 0; i < neighbours.length; i++) {
            let board = neighbours[i];
            let n = new SearchNode(board, sn);
            if (sn.prev == null || !n.board.equals(sn.prev.board))
                pq.push(n, n.priority);
        }
    }

    /**
     * Returns the solution of the board.
     */
    solution() {
        this.stack.reverse();
        return this.stack;
    }
}

//////////////// Test Cases \\\\\\\\\\\\\\\\\\\\\\\\\
function SolverTest() {
    let list = [14, 13, 5, 3, 0, 1, 8, 12, 6, 2, 4, 10, 11, 9, 15, 7];
    let board = new Board(list);
    let solver = new Solver(board);

    console.log("The solution is in " + solver.solution().length + "steps");
    let solution = solver.solution();
    for (let i = 0; i < solution.length; i++)
    console.log(solution[i].toString());
}
