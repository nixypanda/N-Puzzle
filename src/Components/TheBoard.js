"use strict";

var React = require('react');

var BoardDisplay = require('./boardDisplay');
var BoardFactory = require('../board/BoardFactory');
var Counter = require('./Counter');

var TheBoard = React.createClass({
  componentDidMount: function() {
    $(document.body).on('keydown', this.handleKeyDown);
  },

  componentWillUnmount: function() {
    $(document.body).off('keydown', this.handleKeyDown);
  },

  handleKeyDown: function(e) {
    var board = this.state.board;
    var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
    var count  = 0;
    if(e.keyCode === LEFT) {
      board.moveRight();
      count = this.state.count + 1;
    }
    else if (e.keyCode === UP) {
      board.moveDown();
      count = this.state.count + 1;
    }
    else if (e.keyCode === RIGHT) {
      board.moveLeft();
      count = this.state.count + 1;
    }
    else if (e.keyCode === DOWN) {
      board.moveUp();
      count = this.state.count + 1;
    }

    this.setState({board: board, count: count});
  },

  getInitialState: function initialBoardState() {
    var bf = new BoardFactory();
    var board = bf.getBoard();
    return { board: board, count: 0};
  },

  reset: function reset() {
    this.replaceState(this.getInitialState());
  },

  render: function renderBoard() {
    return (
      <div>
          <Counter reset={this.reset} count={this.state.count} />
        <BoardDisplay N={4} board={this.state.board.board} />
      </div>
    );
  }
});

module.exports = TheBoard;
