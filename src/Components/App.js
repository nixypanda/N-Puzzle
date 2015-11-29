"use strict";

var React = require('react');

var TopBar = require('../Common/TopBar');
var BoardDisplay = require('./boardDisplay');
var Counter = require('./Counter');
var BottomFrame = require('./BottomFrame');

var BoardFactory = require('../board/BoardFactory');
var Board = require('../board/Board');
var Solver = require('../AI/Solver');

var App = React.createClass({
  /**
  * Polling keydown event
  */
  componentDidMount: function() {
    $(document.body).on('keydown', this.handleKeyDown);
  },

  componentWillUnmount: function() {
    $(document.body).off('keydown', this.handleKeyDown);
  },

  /**
  * Calls the appropriate method in board class on keydown event if the
  * key pressed is one of the arrow keys.
  *
  * @param  {event} e An event object.
  */
  handleKeyDown: function(e) {
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
      this.setState({board: this.state.board, count: this.state.count});
    }

    if (this.state.board.isGoal()) {
      this.setState({won: true});
    }
    else {
      this.setState({won: false});
    }
  },


  /**
  * Initaial state of the game. The board generation is given to factory.
  * @return {JSON} A dict of key value pairs
  */
  getInitialState: function initialBoardState() {
    var bf = new BoardFactory();
    var board = bf.getBoard();
    return {
      board: board,
      count: 0,
      won: false,
      autosolve: false,
      solution: null,
      solutionIndex: 1,
      processing: false
    };
  },

  /**
  * Resets the game to it's original configuration.
  * The arrangement of tiles is randomised
  */
  reset: function reset() {
    this.replaceState(this.getInitialState());
  },

  activateAutoSolve: function activateAutoSolve() {
    this.setState({
      autosolve: true,
      processing: true
    });

    var solver = new Solver(this.state.board);

    this.setState({
      solution: solver.solution(),
      processing: false
    });
    console.log('The solution has arrived');
  },

  /**
  * Render method
  * @return {React class} Returns a react class
  */
  render: function renderBoard() {
    return (
      <div>
        <TopBar />
        <br />
        <Counter reset={this.reset} count={this.state.count} />
        <BoardDisplay N={4} board={this.state.board.board} />
        <BottomFrame won={this.state.won}
          activateAI={this.activateAutoSolve}
          autosolve={this.state.autosolve}
          processing={this.state.processing} />
      </div>
    );
  }
});

module.exports = App;
