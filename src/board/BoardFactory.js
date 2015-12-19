"use strict";

var Board = require('./Board');

export default class BoardFactory {
    constructor(N) { 
        // Maximum number of moves is thus MAX_MOVES + MIN_MOVES
        var MAX_MOVES = 165;
        var MIN_MOVES = 50;

        // Start with a solved board
        let list = new Array(N * N);
        for (let i = 1; i < list.length; i++)
            list[i - 1] = i;
        list[list.length - 1] = 0;

        // var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
        this.board = new Board(list);

        // generate a random number this will be the number of moves that the
        // board will make
        var moves = Math.floor((Math.random() * MAX_MOVES) + MIN_MOVES);

        // randomly choose UP, DOWN, LEFT, RIGHT $(MOVES) number of times
        for (var i = 1; i < moves; i++) {
            var where = Math.floor((Math.random() * 4) + 1);
            switch (where) {
                case 1:
                    this.board.moveLeft();
                    break;
                case 2: 
                    this.board.moveRight();
                    break;
                case 3: 
                    this.board.moveUp();
                    break;
                case 4: 
                    this.board.moveDown();
                    break;
                default: 
                    break;
            }
        }


    }
    getBoard() {
        return this.board;
    }
}
