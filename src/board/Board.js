"use strict"

var equals = require('../helpers/ArrayExtras');

/**
* The board class represents the state of the board at a given
* point of time it also contains functions compute the neighbours of the
* current state, it's twin and hamming and manhattan distance to the goal
* state.
*/
function Board(arr) {
    this.N = Math.sqrt(arr.length);
    this.board = arr;
}

Board.prototype = {

    /**
    * Check if the board has reached the final goal state
    */
    isGoal : function isGoal() {
        for (var i = 1; i < this.board.length; i++) {
            if (i !== this.board[i - 1]) {
                return false;
            }
        }
        return true;
    },

    equals: function equals(that) {
        for (var i = 0; i < this.board.length; i++) {
            if (this.board[i] !== that.board[i]) {
                return false;
            }
        }
        return true;
    },

    //////////////////////////////
    /// Make move on the Board ///
    //////////////////////////////

    /**
    * Makes a left move on the board
    */
    moveLeft: function moveLeft() {
        var indexZero = this.board.indexOf(0);
        if (indexZero % this.N != 0) {
            this.__makeMove__(indexZero, indexZero - 1);
        }
    },

    /**
    * Makes an upward move on the board
    */
    moveUp: function moveUp() {
        var indexZero = this.board.indexOf(0);
        if (indexZero > this.N - 1) {
            this.__makeMove__(indexZero, indexZero - this.N);
        }
    },

    /**
    * Makes a rightward move on the board
    */
    moveRight: function moveRight() {
        var indexZero = this.board.indexOf(0);
        if (indexZero % this.N != this.N - 1) {
            this.__makeMove__(indexZero, indexZero + 1);
        }
    },

    /**
    * Makes a downward move on the board
    */
    moveDown: function moveDown() {
        var indexZero = this.board.indexOf(0);
        if (indexZero < this.board.length - this.N) {
            this.__makeMove__(indexZero, indexZero + this.N);
        }
    },

    //////////////////////////////
    /// AI (A*) Helper methods ///
    /////////////////////////////

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
    * Returns a board that is the copy of the board with two tiles swaped.
    * (tiles belong to the same row)
    * One of the original and twin is solvable the other is not.
    */
    twin : function twin() {
        var condition = (this.board[0] != 0) && (this.board[1] != 0);
        var x = condition ? 0 : this.N;
        var y = condition ? 1 : this.N + 1;

        return this.__exchBoard__(x, y);
    },

    /**
    * Returns the list of all the configurations that are possible after
    * a single move of the tile.(min 1, max 4)
    */
    neighbours : function neighbour() {
        var neighbours = [];
        var i = this.board.indexOf(0);

        // board by exchanging empty tile with the tile above it
        // include if the empty tile is not in first row
        if (i > this.N - 1) {
            neighbours.push(this.__exchBoard__(i, i - this.N));
        }

        // board by exchanging empty tile with the tile to left it
        // include if the empty tile is not in first column
        if (i % this.N != 0) {
            neighbours.push(this.__exchBoard__(i, i - 1));
        }

        // board by exchanging empty tile with the tile bottom of it
        // include if the empty tile is not in last row
        if (i < this.board.length - this.N) {
            neighbours.push(this.__exchBoard__(i, i + this.N));
        }

        // board by exchanging empty tile with the tile to the right of it
        // include if the empty tile is not in last column
        if (i % this.N != this.N - 1) {
            neighbours.push(this.__exchBoard__(i, i + 1));
        }

        return neighbours;
    },

    ///////////////////////////////
    /// Private Helper functions //
    //////////////////////////////

    // swaps the given tiles of the original board and returns the resulting
    // board
    __exchBoard__ : function exchBoard(i, j) {
        var newBoard = new Board(this.board.slice(0));

        var temp = newBoard.board[i];
        newBoard.board[i] = newBoard.board[j];
        newBoard.board[j] = temp;

        return newBoard;
    },

    // private helper to exchange the board tiles
    __makeMove__: function makeMove(i, j) {
        var temp = this.board[i];
        this.board[i] = this.board[j];
        this.board[j] = temp;
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
    var b1 = new Board([8, 1, 3, 4, 0, 2, 7, 6, 5]);
    console.log(b.toString());
    console.log(b.N);                 // 9
    console.log(b.isGoal());          // false
    console.log(b.hamming());         // 5
    console.log(b.manhattan());       // 10
    console.log(b.twin().toString());
    console.log(b.equals(b1));

    var fin = new Board([1, 2, 3, 0]);
    console.log(fin.isGoal());
    console.log('End Test');
}

module.exports = Board;
