$ = jQuery = require('jquery')

var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;
const Paper = require('material-ui/lib/paper');

var BoardDisplay = require('./boardDisplay');

var Board = React.createClass({
  getInitialState: function initialBoardState() {
    return { board: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]};
  },

  render: function renderBoard() {
    return (
      <div>
        <BoardDisplay N={4} board={this.state.board} />
      </div>
    );
  }
});

ReactDOM.render(<Board />, document.getElementById('n_puzzle'));
