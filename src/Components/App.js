"use strict";

import React, {Component} from 'react';
import jQuery from 'jquery';
var $ = jQuery;

// Display imports
import TopBar from '../Common/TopBar';
import Counter from './Counter';
import BoardLayout from './boardDisplay';
import BottomFrame from './BottomFrame';

// Logic imports
import BoardFactory from '../board/BoardFactory';
var Board = require('../board/Board');
var Solver = require('../AI/Solver');

export class App extends Component {

    /**
     * Initaial state of the game. The board generation is given to factory.
     * @return {JSON} A dict of key value pairs
     */
    constructor() {
        super();
        let size = 3;
        let bf = new BoardFactory(size);
        let board = bf.getBoard();

        this.state = {
            N: size,
            board: board,
            count: 0,
            won: false,
            autosolve: false,
            solution: null,
            solutionIndex: 1,
            processing: false
        }

        // In es6 there is no autobinding
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.reset = this.reset.bind(this);
        this.activateAutoSolve = this.activateAutoSolve.bind(this);
    }

    /**
     * Start Polling keydown event
     */
    componentDidMount() {
        jQuery(document.body).on('keydown', this.handleKeyDown);
    }

    /**
     * Stop Polling keydown event
     */
    componentWillUnmount() {
        jQuery(document.body).off('keydown', this.handleKeyDown);
    }

    /**
     * Calls the appropriate method in board class on keydown event if the
     * key pressed is one of the arrow keys.
     *
     * @param  {event} e An event object.
     */
    handleKeyDown(e) {

        if (this.state.autosolve) {
            var SPACE = 32;
            if (e.keyCode === 32 && !this.state.won) {
                this.setState({
                    board: this.state.solution[this.state.solutionIndex],
                    solutionIndex: this.state.solutionIndex + 1,
                    count: this.state.count + 1,
                });
            }
        }
        else {
            var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

            if(e.keyCode === LEFT) {
                this.state.board.moveRight();
                this.state.count += 1;
            }
            else if (e.keyCode === UP) {
                this.state.board.moveDown();
                this.state.count += 1;
            }
            else if (e.keyCode === RIGHT) {
                this.state.board.moveLeft();
                this.state.count += 1;
            }
            else if (e.keyCode === DOWN) {
                this.state.board.moveUp();
                this.state.count += 1;
            }

            this.setState({
                board: this.state.board,
                count: this.state.count
            });
        }

        if (this.state.board.isGoal()) {
            this.setState({won: true});
        }
        else {
            this.setState({won: false});
        }
    }

    /**
     * Resets the game to it's original configuration.
     * The arrangement of tiles is randomised
     */
    reset() {
        let bf = new BoardFactory(this.state.N);
        let board = bf.getBoard();

        this.setState({
            board: board,
            count: 0,
            won: false,
            autosolve: false,
            solution: null,
            solutionIndex: 1,
            processing: false
        });

        this.forceUpdate();
    }

    activateAutoSolve() {
        this.__getThatSpinyThings__()
        this.__actulySolveTheProblem__()
    }

    __getThatSpinyThings__() {
        this.setState({
            autosolve: true,
            processing: true
        });
        this.forceUpdate();
    }

    __actulySolveTheProblem__() {
        var solver = new Solver(this.state.board);

        this.setState({
            solution: solver.solution(),
            processing: false
        });

    }

    /**
     * Render method
     * @return {React class} Returns a react class
     */
    render() {
        return (
            <div>
                <TopBar />
                <br />
                <Counter reset={this.reset} count={this.state.count} />
                <BoardLayout N={this.state.N} board={this.state.board.board} />
                <BottomFrame won={this.state.won}
                    activateAI={this.activateAutoSolve}
                    autosolve={this.state.autosolve}
                    processing={this.state.processing} />
            </div>
        );
    }
}

module.exports = App;
