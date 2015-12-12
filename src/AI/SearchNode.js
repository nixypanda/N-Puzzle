"use strict"

var Board = require('../board/Board');

/**
* The Search node class consists of the board and the search node that led
* to this board, number of moves it took and the priority of the board (which
* is the heuristic that we are using (it's admissible and cocnsistent)
*
* moves correspond the the actul path length to the present state
* and manhattan distance is the estimated path length to the goal state
* from the present state
*/
function SearchNode(board, node) {
    this.board = board;
    this.prev = node;
    this.moves = (!node) ? 0 : this.prev.moves + 1;
    this.priority = board.manhattan() + this.moves;
}

////////////////// TEST \\\\\\\\\\\\\\\\\\\\\\\\

function SearchNodeTest() {
    var b = new Board([8, 1, 3, 4, 0, 2, 7, 6, 5]);
    console.log(b.toString());
    var sn = new SearchNode(b, null);

    console.log(sn.board);
    console.log(sn.prev);
    console.log(sn.moves);
    console.log(sn.priority);

    var bAfter = new Board([8, 1, 3, 0, 4, 2, 7, 6, 5]);
    var snNext = new SearchNode(bAfter, sn);

    console.log(snNext.board);
    console.log(snNext.prev);
    console.log(snNext.moves);
    console.log(snNext.priority);
}

module.exports  = SearchNode;
