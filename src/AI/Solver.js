"use strict";

var Board = require('../board/Board');
var SearchNode = require('./SearchNode');
var PriorityQueue = require('../helpers/PriorityQueue');

function Solver(board) {
    this.b = board;
    this.solvable = false;
    this.moves = 0;
    this.stack = [];

    var sn = new SearchNode(this.b, null);
    var snt = new SearchNode(this.b.twin(), null);

    var pq = new PriorityQueue();
    var pqt = new PriorityQueue();

    this.__aStar__(sn, snt, pq, pqt);
}

Solver.prototype = {
    __aStar__ : function aStar(sn, snt, pq, pqt) {
        pq.push(sn, sn.priority);
        pqt.push(snt, snt.priority);

        while (true) {
            sn = pq.pop();
            snt = pqt.pop();

            if (sn.board.isGoal()) {
                this.moves = sn.moves;
                this.solvable = true;
                break;
            }

            if (snt.board.isGoal())
                break;

            this.__addNeighbours__(sn, pq);
            this.__addNeighbours__(snt, pqt);
        }

        if (this.solvable) {
            while (sn != null) {
                this.stack.push(sn.board);
                sn = sn.prev;
            }
        }
    },

    __addNeighbours__ : function __addNeighbours__(sn, pq) {
        var neighbours = sn.board.neighbours();

        for (var i = 0; i < neighbours.length; i++) {
            var board = neighbours[i];
            var n = new SearchNode(board, sn);
            if (sn.prev == null || !n.board.equals(sn.prev.board))
                pq.push(n, n.priority);
        }
    },

    solution : function solution() {
        this.stack.reverse();
        return this.stack;
    }
}

function SolverTest() {
    var board = new Board([14, 13, 5, 3, 0, 1, 8, 12, 6, 2, 4, 10, 11, 9, 15, 7]);
    var solver = new Solver(board);

    console.log("The solution for the problem is in " + solver.solution().length);
    var solution = solver.solution();
    for (var i = 0; i < solution.length; i++)
        console.log(solution[i].toString());
}

module.exports = Solver;
