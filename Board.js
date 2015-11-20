"use strict"

/**
 * The board class represents the state of the board at a given
 * point of time it also contains functions compute the neighbours of the 
 * current state, it's twin and hamming and manhattan distance to the goal
 * state.
 */
function Board(arr) {
    this.N = Math.sqrt(arr.length);
    this.board = arr;
    this._setUpGoal();
}

Board.prototype = {
    // Sets up the goal state
    // e.g. [1, 3, 0, 2] -> [1, 2, 3, 0]
    _setUpGoal:function _setUpGoal() {
        this.goal = this.board.slice(0);
        this.goal.sort();
        this.goal = this.goal.slice(1);
        this.goal.push(0);
    },

    /** 
     * Calculate the hamming distance to the goal state (i.e. the number
     * of tiles out of place)
     * e.g [8, 1, 3, 4, 0, 2, 7, 6, 5] : 5
     */
    hamming : function hamming() {
        var ham = 0;
        for (var i = 0; i < this.board.length; i++)
            if (this.board[i] != i + 1)
                ham += 1;
        // subtract 1 (case of zero)
        return ham - 1;
    },

    /**
     * Reutrns the manhattan/taxi-cab distance from current board state to
     * the goal state. (i.e.) the cumulative distance of every tile to it's
     * final position
     * e.g [8, 1, 3, 4, 0, 2, 7, 6, 5] : 10
     */
    manhattan : function manhattan() {
        var man = 0;
        for (var i = 0; i < this.board.length; i++) {
            if (this.board[i] == 0)
                continue;

            // final position of the ith-tile 
            var fy = Math.floor(i / this.N);
            var fx = Math.floor(i % this.N);

            // initial position of the ith-tile
            var iy = Math.floor((this.board[i] - 1) / this.N);
            var ix = Math.floor((this.board[i] - 1) % this.N);

            // diff bw the initial and the final position
            man += Math.abs(ix - fx) + Math.abs(iy - fy);
        }
        return man;
    },

    /** 
     * Check if the board has reached the final goal state
     */
    isGoal : function isGoal() {
        return this.board.equals(this.goal);
    },

    /**
     * Returns a board that is the copy of the board with two tiles swaped.
     * (tiles belong to the same row)
     * One of the original and twin is solvable the other is not.
     */
    twin : function twin() {
        var condition = (this.board[0] != 0) && (this.board[1] != 0);
        var x = condition ? 0 : this.N;
        var y = condition ? 1 : this.N + 1;

        return this._exchBoard(x, y);
    },

    /**
     * Returns the list of all the configurations that are possible after
     * a single move of the tile.(min 1, max 4)
     */
    neighbours : function neighbour() {
        var neighbours = [];
        var i = this.board.indexOf(0);

        if (i < this.N - 1)                 neighbours.push(this._exchBoard(i, i - this.N)); 
        if (i % this.N != 0)                neighbours.push(this._exchBoard(i, i - 1)); 
        if (i < this.board.length - this.N) neighbours.push(this._exchBoard(i, i + this.N)); 
        if (i % this.N != this.N - 1)       neighbours.push(this._exchBoard(i, i + 1)); 

        return neighbours;
    },

    /**
     * Checks for the equality of the board
     */
    equals : function equals(that) {
        return this.board.equals(that.board);
    },

    // swaps the given tiles of the original board and returns the resulting
    // board
    _exchBoard : function _exchBoard(i, j) {
        var newBoard = new Board(this.board);

        var temp = newBoard.board[i];
        newBoard.board[i] = newBoard.board[j];
        newBoard.board[j] = temp;

        return newBoard;
    },

    /**
     * String representaion of the Board object
     */
    toString : function toString() {
        var board = "";
        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < this.N; j++) {
                board += this.board[i * this.N + j];
                board += ' ';
            }
            board += '\n';
        }
        return board;
    }
}

/////////////////////// Test \\\\\\\\\\\\\\\\\\\\\\\\\\
function BoardTest() {
    console.log('Testing Board');
    var b = new Board([8, 1, 3, 4, 0, 2, 7, 6, 5]);
    console.log(b.toString());
    console.log(b.N);                 // 9
    console.log(b.goal);              // [1, 2, 3, 4, 5, 6, 7, 8, 0] 
    console.log(b.isGoal());          // false
    console.log(b.hamming());         // 5
    console.log(b.manhattan());       // 10
    console.log(b.twin().toString());

    var fin = new Board([1, 2, 3, 0]);
    console.log(fin.isGoal());
    console.log('End Test');
}
