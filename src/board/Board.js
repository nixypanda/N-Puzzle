"use strict"

/**
 * The board class represents the state of the board at a given
 * point of time it also contains functions compute the neighbours of the
 * current state, it's twin and hamming and manhattan distance to the goal
 * state.
 */
export default class Board {

    constructor(arr) {
        this.N = Math.sqrt(arr.length);
        this.board = arr;

        let list = new Array(this.N * this.N);
        for (let i = 1; i < list.length; i++)
        list[i - 1] = i;
        list[list.length - 1] = 0;

        this.goal = list;

        this.manhattan_matrix = new Array(this.N);
        for (let i = 0; i < this.N; i++) {
            this.manhattan_matrix[i] = new Set(this.__manhattan_level_matrix__(i + 1));
        }
    }


    /**
     * Check if the board has reached the final goal state
     */
    isGoal() {
        for (let i = 1; i < this.board.length; i++) {
            if (i !== this.board[i - 1]) {
                return false;
            }
        }
        return true;
    }

    partialIsGoal(level) {
        for (let i = level - 1; i < level; i++) {
            for (let j = i; j < this.N; j++) {
                if (this.board[i * this.N + j] !== this.goal[i * this.N + j]) {
                    return false;
                }
            }

            for (let j = i; j < this.N; j++) {
                if (this.board[j * this.N + i] !== this.goal[j * this.N + i]) {
                    return false;
                }
            }
        }
        return true;
    }

    equals(that) {
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] !== that.board[i]) {
                return false;
            }
        }
        return true;
    }

    //////////////////////////////
    /// Make move on the Board ///
    //////////////////////////////

    /**
     * Makes a left move on the board
     */
    moveLeft() {
        let indexZero = this.board.indexOf(0);
        if (indexZero % this.N != 0) {
            this.__makeMove__(indexZero, indexZero - 1);
        }
    }

    /**
     * Makes an upward move on the board
     */
    moveUp() {
        let indexZero = this.board.indexOf(0);
        if (indexZero > this.N - 1) {
            this.__makeMove__(indexZero, indexZero - this.N);
        }
    }

    /**
     * Makes a rightward move on the board
     */
    moveRight() {
        let indexZero = this.board.indexOf(0);
        if (indexZero % this.N != this.N - 1) {
            this.__makeMove__(indexZero, indexZero + 1);
        }
    }

    /**
     * Makes a downward move on the board
     */
    moveDown() {
        let indexZero = this.board.indexOf(0);
        if (indexZero < this.board.length - this.N) {
            this.__makeMove__(indexZero, indexZero + this.N);
        }
    }

    /**
     * Makes an appropriate move based on the key 
     * that is passed to it
     */
    move(key) {
        // Get the index of zero and the clicked number
        let keyIndex = this.board.indexOf(key);
        let indexZero = this.board.indexOf(0);

        let diff = Math.abs(indexZero - keyIndex);

        //bugfix:
        if ((Math.min(keyIndex, indexZero) % this.N === this.N - 1) && (Math.max(keyIndex, indexZero) % this.N === 0) ) {
            return false;
        }

        if (diff === 1 || diff === this.N)  {
            this.__makeMove__(indexZero, keyIndex)
            return true;
        }
        return false;
    }

    //////////////////////////////
    /// AI (A*) Helper methods ///
    /////////////////////////////

    /**
     * Finds if the given board is solvable or not in tiem proportional O(n^4)
     * where n is the size of the board
     */
    isSolvable() {
        let inversions = this.__countInversions__();
        let zeroLoc = this.N - Math.floor(this.board.indexOf(0) / this.N);

        if (this.N % 2 === 1) {
            return inversions % 2 === 0;
        }
        else {
            if (zeroLoc % 2 === 1) {
                return (inversions % 2 === 0);
            }
            else {
                return (inversions % 2 === 1);
            }
        }
    }

    // returns the count of the number of inversions that are present in the board
    __countInversions__() {
        let invCount = 0;
        for (let i = 0; i < this.board.length - 1; i++) {
            for (let j = i + 1; j < this.board.length; j++) {
                // if i and j are not zero and i is greater than j
                if (this.board[i] && this.board[j] && this.board[i] > this.board[j]) {
                    invCount++;
                }
            }
        }

        return invCount;
    }

    /**
     * Calculate the hamming distance to the goal state (i.e. the number
     * of tiles out of place)
     * e.g [8, 1, 3, 4, 0, 2, 7, 6, 5] : 5
     */
    hamming() {
        let ham = 0;
        for (let i = 0; i < this.board.length; i++)
        if (this.board[i] != i + 1)
            ham += 1;
        // subtract 1 (case of zero)
        return ham - 1;
    }

    partialHamming(level) {
        let ham = 0;

        for (let i = level - 1; i < level; i++) {
            for (let j = i; j < this.N; j++) {
                if (this.board[i * this.N + j] && this.board[i * this.N + j] !== this.goal[i * this.N + j]) {
                    ham += 1;
                }
            }

            for (let j = i + 1; j < this.N; j++) {
                if (this.board[j * this.N + i] && this.board[j * this.N + i] !== this.goal[j * this.N + i]) {
                    ham += 1;
                }
            }
        }
        return ham;

    }

    /**
     * Returns the manhattan/taxi-cab distance from current board state to
     * the goal state. (i.e.) the cumulative distance of every tile to it's
     * final position
     * e.g [8, 1, 3, 4, 0, 2, 7, 6, 5] : 10
     */
    manhattan() {
        let man = 0;
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] == 0)
                continue;

            // final position of the ith-tile
            let fy = Math.floor(i / this.N);
            let fx = Math.floor(i % this.N);

            // initial position of the ith-tile
            let iy = Math.floor((this.board[i] - 1) / this.N);
            let ix = Math.floor((this.board[i] - 1) % this.N);

            // diff bw the initial and the final position
            man += Math.abs(ix - fx) + Math.abs(iy - fy);
        }
        return man;
    }

    __manhattan_level_matrix__(level) {
        let set = new Set();

        for (let i = level - 1; i < level; i++) {
            for (let j = i; j < this.N; j++) {
                set.add( this.goal[i * this.N + j] );
            }

            for (let j = i + 1; j < this.N; j++) {
                set.add( this.goal[j * this.N + i] );
            }
        }
        return set;
    }

    partialManhattan(level) {
        let man = 0;
        console.log('Current level ' + level + ' ' + this.manhattan_matrix[level - 1]);

        for (let i = 1; i <= this.board.length; i++) {
            if (this.board[i - 1] == 0)
                continue;

            if (this.manhattan_matrix[level - 1].has(this.board[i - 1])) {

                // final position of the ith-tile
                let fy = Math.floor((this.board[i - 1] - 1) / this.N);
                let fx = Math.floor((this.board[i - 1] - 1) % this.N);
                console.log();

                // initial position of the ith-tile
                let iy = Math.floor((i - 1) / this.N);
                let ix = Math.floor((i - 1) % this.N);
                console.log(this.board[i - 1] + ' Final State (' + fy + ', '+ fx + '), Initial State (' + iy + ', '+ ix + ')');

                // diff bw the initial and the final position
                man += Math.abs(ix - fx) + Math.abs(iy - fy);
            }
        }
        return man;

    }

    // Obselete
    /**
     * Returns a board that is the copy of the board with two tiles swaped.
     * (tiles belong to the same row)
     * One of the original and twin is solvable the other is not.
     */
    twin() {
        let condition = (this.board[0] != 0) && (this.board[1] != 0);
        let x = condition ? 0 : this.N;
        let y = condition ? 1 : this.N + 1;

        return this.__exchBoard__(x, y);
    }

    /**
     * Returns the list of all the configurations that are possible after
     * a single move of the tile.(min 1, max 4)
     */
    neighbours() {
        let neighbour = [];
        let i = this.board.indexOf(0);

        // board by exchanging empty tile with the tile above it
        // include if the empty tile is not in first row
        if (i > this.N - 1) {
            neighbour.push(this.__exchBoard__(i, i - this.N));
        }

        // board by exchanging empty tile with the tile to left it
        // include if the empty tile is not in first column
        if (i % this.N != 0) {
            neighbour.push(this.__exchBoard__(i, i - 1));
        }

        // board by exchanging empty tile with the tile bottom of it
        // include if the empty tile is not in last row
        if (i < this.board.length - this.N) {
            neighbour.push(this.__exchBoard__(i, i + this.N));
        }

        // board by exchanging empty tile with the tile to the right of it
        // include if the empty tile is not in last column
        if (i % this.N != this.N - 1) {
            neighbour.push(this.__exchBoard__(i, i + 1));
        }

        return neighbour;
    }

    ///////////////////////////////
    /// Private Helper functions //
    //////////////////////////////

    // swaps the given tiles of the original board and returns the resulting
    // board
    __exchBoard__(i, j) {
        let newBoard = new Board(this.board.slice(0));

        let temp = newBoard.board[i];
        newBoard.board[i] = newBoard.board[j];
        newBoard.board[j] = temp;

        return newBoard;
    }

    // private helper to exchange the board tiles
    __makeMove__(i, j) {
        let temp = this.board[i];
        this.board[i] = this.board[j];
        this.board[j] = temp;
    }


    /**
     * String representaion of the Board object
     */
    toString() {
        let board = "";
        for (let i = 0; i < this.N; i++) {
            for (let j = 0; j < this.N; j++) {
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

    let b = new Board([8, 1, 3, 4, 0, 2, 7, 6, 5]);
    let b1 = new Board([8, 1, 3, 4, 0, 2, 7, 6, 5]);

    console.log('This is what the board looks like');
    console.log(b.toString());
    console.log('Side Length ' + b.N);                 // 9
    console.log('Is this goal state ' + b.isGoal());          // false
    console.log('Hamming distance to the goal state ' + b.hamming());         // 5
    console.log('Manhattan distance to the goal state ' + b.manhattan());       // 10
    console.log('One of the man twins: ')
    console.log(b.twin().toString());
    console.log('Comparing it to a similar board: ')
    console.log(b.equals(b1));

    console.log('the goal state');
    console.log(b.goal);

    console.log('Hamming distance to L1 goal state ' + b.hamming(1));         // 5
    console.log('Hamming distance to L2 goal state ' + b.hamming(2));         // 5
    console.log('Hamming distance to L3 goal state ' + b.hamming(3));         // 5

    console.log('Manhattan procedure');
    console.log(b.__manhattan_level_matrix__(1));
    console.log(b.__manhattan_level_matrix__(2));
    console.log(b.__manhattan_level_matrix__(3));

    console.log('Manhattan matrix');
    console.log(b.manhattan_matrix);

    console.log('Manhattan distance for different levels');
    console.log('Manhattan distance to L1 goal state ' + b.partialManhattan(1));         // 5
    console.log('Manhattan distance to L2 goal state ' + b.partialManhattan(2));         // 5
    console.log('Manhattan distance to L3 goal state ' + b.partialManhattan(3));         // 5


    b = new Board([1, 2, 3, 4, 6, 5, 7, 0, 8]);
    console.log('This is what the board looks like');
    console.log(b.toString());
    console.log('Is goal L1');
    console.log(b.isGoal(1));
    console.log('Is goal L2');
    console.log(b.isGoal(2));


    let fin = new Board([1, 2, 3, 0]);
    console.log('This is a new board');
    console.log(fin.toString());
    console.log('Is this the goal state ' + fin.isGoal());
    console.log('End Test');
}
