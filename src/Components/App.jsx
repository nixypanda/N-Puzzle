/* @flow */
import type { Dispatch, Store, GameState } from "../types";

import React from "react";
import { connect } from "react-redux";

import getMuiTheme from "material-ui/styles/getMuiTheme";

// Display imports
import TopBar from "../Common/TopBar";
import TopFrame from "./TopFrame";
import BoardLayout from "./BoardLayout";
import BottomFrame from "./BottomFrame";
import Footer from "../Common/Footer";
import MyRawTheme from "../Common/theme";

import autoSolve from "../AI/Solver";
import Board from "../board/Board";

import {
  changeGame,
  startAutosolving,
  autoSolved,
  presentSolution,
  donePresenting,
  makeMove
} from "../actions";

const MAGIC_NUMBERS = {
  VIEWPORT_WIDTH: 1.5,
  CELL_WIDTH: 2,
  WIDTH: 2,
  HEIGHT: 2,
  MARGIN: 40,
  FONT_SIZE: 8,
  BASE_KEYCODE: 37
};

class App extends React.Component {
  aiPlaying: number;

  props: {
    N: number,
    board: Board,
    count: number,
    gameState: GameState,
    solution: Array<Board>,
    changeGame: (n: number) => Dispatch,
    startAutosolving: () => Dispatch,
    autoSolved: () => Dispatch,
    presentSolution: () => Dispatch,
    donePresenting: () => Dispatch,
    makeMove: (b: Board) => Dispatch
  };

  // Start Polling keydown event
  componentDidMount() {
    // Arrow key codes: LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
    // hence the function to call move on the blank tile is inverted so it
    // is more natural to the user.
    window.addEventListener(
      "keydown",
      (e) => this.props.makeMove(this.props.board.moveOnDirection(e.keyCode - MAGIC_NUMBERS.BASE_KEYCODE))
    );
  }

  // Stop Polling keydown event
  componentWillUnmount() {
    window.removeEventListener(
      "keydown",
      (e) => this.props.makeMove(this.props.board.moveOnDirection(e.keyCode - MAGIC_NUMBERS.BASE_KEYCODE))
    );
  }

  // the key passed through context must be called "muiTheme"
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  getChildContext() {
    return {
      muiTheme: getMuiTheme(MyRawTheme)
    };
  }

  /**
   * Generate an action to auto-solve the game.
   *
   * @return {ActionType} Action to chage the game
   */
  // NOTE: Need a way to clear interval if another action is triggerd.
  autosolveGame = (board: Board) => {
    this.props.startAutosolving();

    // Call in the autoSolve method with the board to be solved.
    // NOTE: make it async or atleast put a timeout.
    const solution = autoSolve(board);

    this.props.autoSolved(solution);

    // Generate actions after a one second gap.
    let i = 1;
    const length = solution.length;
    this.props.presentSolution();

    // start dispatching actions per second towards the goal board
    this.aiPlaying = setInterval(() => {
      // dispatch an action to change the present board
      this.props.makeMove(solution[i])

      i += 1;
      if (i === length) {
        // when we reach the end of the solution then dispatch an action saying game was won
        this.props.donePresenting();
        clearInterval(this.aiPlaying);
      }
    }, 1000);
  }


  // the render method
  render() {
    const height: number = window.document.documentElement.clientHeight;
    const width: number = window.document.documentElement.clientWidth;
    let dimension = Math.min(MAGIC_NUMBERS.VIEWPORT_WIDTH * width, height);

    return (
      <div id="top-container">
        <TopBar
          N={this.props.N}
          changeGame={(n) => {
            clearInterval(this.aiPlaying)
            this.props.changeGame(n);
          }}
        />
        <br />
        <div id="game-container">
          <TopFrame
            N={this.props.N}
            cellWidth={dimension / (MAGIC_NUMBERS.CELL_WIDTH * this.props.N)}
            count={this.props.count}
            reset={() => {
              clearInterval(this.aiPlaying);
              this.props.changeGame(this.props.N)
            }}
          />
          <BoardLayout
            N={this.props.N}
            width={dimension / (MAGIC_NUMBERS.WIDTH * this.props.N)}
            height={dimension / (MAGIC_NUMBERS.HEIGHT * this.props.N)}
            margin={dimension / (MAGIC_NUMBERS.MARGIN * this.props.N)}
            fontSize={dimension / (MAGIC_NUMBERS.FONT_SIZE * this.props.N)}
            board={this.props.board.board}
            padding={10}
            onMouseClick={(index) => this.props.makeMove(this.props.board.moveOnIndex(index))}
          />
          <BottomFrame
            N={this.props.N}
            activateAI={() => this.autosolveGame(this.props.board)}
            gameState={this.props.gameState}
          />
        </div>
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeGame: (n: number) => dispatch(changeGame(n)),
  startAutosolving: () => dispatch(startAutosolving()),
  autoSolved: (solution: Array<Board>) => dispatch(autoSolved(solution)),
  presentSolution: () => dispatch(presentSolution()),
  donePresenting: () => dispatch(donePresenting()),
  makeMove: (board: Board) => dispatch(makeMove(board))
});

export default connect(mapStateToProps , mapDispatchToProps)(App);
