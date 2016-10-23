import React from "react";
import { connect } from "react-redux";

// Display imports
import TopBar from "../Common/TopBar";
import TopFrame from "./TopFrame";
import BoardLayout from "./BoardLayout";
import BottomFrame from "./BottomFrame";
import Footer from "../Common/Footer";

// Logic imports
// import NewBoard from "../board/BoardFactory";
// import SolutionTo from "../AI/Solver";
import {
  changeGame,
  resetGame,
  autosolveGame,
  moveOnKeyPress,
  moveOnIndexClick
} from "../actions";

const MAGIC_NUMBERS = {
  VIEWPORT_WIDTH: 1.5,
  CELL_WIDTH: 2,
  WIDTH: 2,
  HEIGHT: 2,
  MARGIN: 40,
  FONT_SIZE: 8
};

class App extends React.Component {

  // Start Polling keydown event
  componentDidMount() {
    window.addEventListener("keydown", (e) => this.props.moveOnKeyPress(this.props.board, e));
  }

  // Stop Polling keydown event
  componentWillUnmount() {
    window.removeEventListener("keydown", (e) => this.props.moveOnKeyPress(this.prosp.board, e));
  }



  // the render method
  render() {
    const height = window.document.documentElement.clientHeight;
    const width = window.document.documentElement.clientWidth;
    let dimension = Math.min(MAGIC_NUMBERS.VIEWPORT_WIDTH * width, height);

    return (
      <div id="top-container">
        <TopBar N={this.props.N} changeGame={this.props.changeGame} />
        <br />
        <TopFrame
          N={this.props.N}
          cellWidth={ dimension / (MAGIC_NUMBERS.CELL_WIDTH * this.props.N) }
          count={this.props.count}
          reset={this.props.resetGame}
        />
        <BoardLayout
          N={this.props.N}
          width={ dimension / (MAGIC_NUMBERS.WIDTH * this.props.N) }
          height={ dimension / (MAGIC_NUMBERS.HEIGHT * this.props.N) }
          margin={ dimension / (MAGIC_NUMBERS.MARGIN * this.props.N) }
          fontSize={ dimension / (MAGIC_NUMBERS.FONT_SIZE * this.props.N) }
          board={this.props.board.board}
          onMouseClick={(index) => this.props.moveOnIndexClick(this.props.board, index)}
        />
        <BottomFrame
          N={this.props.N}
          activateAI={this.props.autosolveGame.bind(null, this.props.board)}
          gameState={this.props.gameState}
        />
        <br />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ app }) => ({
  N: app.N,
  board: app.board,
  count: app.count,
  gameState: app.gameState,
  solution: app.solution
});

const mapDispatchToProps = (dispatch) => ({
  changeGame: (n) => dispatch(changeGame(n)),
  resetGame: () => dispatch(resetGame()),
  autosolveGame: (board) => dispatch(autosolveGame(board)),
  moveOnKeyPress: (board, e) => dispatch(moveOnKeyPress(board, e)),
  moveOnIndexClick: (board, index) => dispatch(moveOnIndexClick(board, index))
});

export default connect(mapStateToProps , mapDispatchToProps)(App);
