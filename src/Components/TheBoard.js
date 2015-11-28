"use strict";

var React = require('react');

var BoardDisplay = require('./boardDisplay');

var TheBoard = React.createClass({
  getInitialState: function initialBoardState() {
    return { board: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]};
  },

  render: function renderBoard() {
    return (
      <BoardDisplay N={4} board={this.state.board} />
    );
  }
});

module.exports = TheBoard;
