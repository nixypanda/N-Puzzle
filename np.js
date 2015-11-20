"use strict";

function Solver(board) {
    this.board = board;
    this.solvable = false;
    this.moves = 0;
    this.stack = [];

    var sn = new SearchNode(board);
    var snt = new SearchNode(board.twin());

    var pq = new PriorityQueue();
    var pqt = new PriorityQueue();

    this._aStar(sn, snt, pq, pqt);
}

Solver.prototype = {
    _aStar : function aStar(sn, snt, pq, pqt) {
        pq.push(sn);
        pqt.push(snt);

        while (true) {
            sn = pq.pop();
            snt = pqt.pop();

            if (sn.board.isGoal()) {
                this.moves = sn.moves;
                this.solvable = true;
                break;
            }

            if (snt.board.isGoal()) {
                break;
            }

            this._addNeighbours(sn, pq);
            this._addNeighbours(snt, pqt);
        }

        if (this.solvable) {
            while (sn) {
                this.stack.push(sn.board);
                sn = sn.previous;
            }
        }
    },

    _addNeighbours : function _addNeighbours(sn, pq) {
        var neighbours = sn.board.neighbours();

        for (var i = 0; i < neighbours.length; i++) {
            var board = neighbours[i];
            var n = new SearchNode(board, sn);
            if (!(sn.prev && n.board.equals(sn.prev.board)))
                pq.push(n);
        }
    },

    solution : function solution() {
        this.stack.reverse();
        return this.stack;
    }
}

function prnt() {
    var b = new Board([8, 1, 3, 4, 0, 2, 7, 6, 5]);
    console.log(b.neighbours().toString());

    console.log(b);
    var s = new Solver(b);
    console.log(s.solvable);
}
