import React from 'react';
import $ from 'jquery';

// Display imports
import TopBar from '../Common/TopBar';
import Counter from './Counter';
import BoardLayout from './BoardLayout';
import BottomFrame from './BottomFrame';
import Footer from '../Common/Footer';

// Logic imports
import NewBoard from '../board/BoardFactory';
import SolutionTo from '../AI/Solver';

const MAGIC_NUMBERS = {
  VIEWPORT_WIDTH: 1.5,
  CELL_WIDTH: 2,
  WIDTH: 2,
  HEIGHT: 2,
  MARGIN: 40,
  FONT_SIZE: 8
};

export default class App extends React.Component {

  /**
   * Initaial state of the game. The board generation is given to factory.
   * @param {object} props [ the properties null in this case ]
   * @return {JSON} A dict of key value pairs
   */
  constructor(props) {
    super(props);
    let size = 4;
    // let bf = new BoardFactory(size);
    // let board = bf.getBoard();
    let board = NewBoard(size);

    this.state = {
      N: size,
      board: board,
      count: 0,
      won: false,
      autosolve: false,
      solution: null,
      solvable: true,
      processing: false
    };

    // In es6 there is no autobinding
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.reset = this.reset.bind(this);
    this.activateAutoSolve = this.activateAutoSolve.bind(this);
    this.changeGame = this.changeGame.bind(this);
  }

  // Start Polling keydown event
  componentDidMount() {
    $(document.body).on('keydown', this.handleKeyDown);
  }

  // Stop Polling keydown event
  componentWillUnmount() {
    $(document.body).off('keydown', this.handleKeyDown);
  }

  /**
  * Calls the appropriate method in board class on keydown event if the
  * key pressed is one of the arrow keys.
  *
  * @param  {event} e An event object.
  * @return {null} [nothing]
  */
  handleKeyDown(e) {
    if (this.state.won || this.state.autosolve) {
      return;
    }

    // Arrow key codes: LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
    // hence the function to call move on the blank tile is inverted so it
    // is more natural to the user.
    let moved = this.state.board.moveOnDirection(e.keyCode - 37);

    this.setState({
      board: this.state.board,
      count: this.state.count + (moved ? 1 : 0)
    });

    if (this.state.board.isGoal()) {
      this.setState({ won: true });
    }
  }

  /**
   * Calls the move method on the board class when any of the numbers are pressed
   * on by the mouse.
   *
   * @param {Integer} index the index of the number that is pressed
   * @return {null} [nothing]
   */
  handleMouseClick(index) {
    if (this.state.won || this.state.autosolve) {
      return;
    }

    let moved = this.state.board.moveOnIndex(index);
    this.setState({
      board: this.state.board,
      count: this.state.count + (moved ? 1 : 0)
    });

    if (this.state.board.isGoal()) {
      this.setState({ won: true });
    }
  }

  /**
  * Resets the game to it's original configuration.
  * The arrangement of tiles is randomised
  *
  * @return {null} [nothing]
  */
  reset() {
    // VERY IMPORTANT: to clear the setInterval otherwise reseting
    // will have two solutions to pick from and it's not preety
    clearInterval(this.AIPlayingTheGame);

    this.setState({
      board: NewBoard(this.state.N),
      count: 0,
      won: false,
      autosolve: false,
      solution: null,
      solutionIndex: 1
    }, () => {
      // as we are only generating solvable boards
      this.setState({ solvable: true });
    });

    this.forceUpdate();
  }

  /**
  * This function autosolves the game on the screen and stores the result in
  * solution (state variable) and then calls the helper to present the moves
  * to the user
  *
  * @return {null} [nothing]
  */
  activateAutoSolve() {
    this.setState({ autosolve: true }, () => {
      // Calling the AI to solve the problem
      // Scnchronously calll the helper after setting the state with the solution
      this.setState({ solution: SolutionTo(this.state.board) }, () => {
        this.__autosolveTheGame__();
      });
    });
  }

  // Helper: Reads the boards in solution one by one and renders then on to
  // the screen one-by-one.
  __autosolveTheGame__() {
    let i = 1;
    let length = this.state.solution.length;

    // display the next board after a second interval
    this.AIPlayingTheGame = setInterval(() => {
      this.setState({
        board: this.state.solution[i],
        count: this.state.count + 1
      });

      i += 1;
      // quit on reaching the solved state
      if (i === length) {
        this.setState({ won: true });
        clearInterval(this.AIPlayingTheGame);
      }
    }, 1000);
  }

  /**
   * Changes the game to different n-by-n grid
   *
   * @param  {number} n [governs the size of the board]
   * @return {null} [nothing]
   */
  changeGame(n) {
    this.setState({ solvable: true });
    // Imediate change in state is trigerred like this (synchronos operation)
    this.setState({ N: n }, () => {
      this.reset();
    });
  }

  // the render method
  render() {
    let dimension = Math.min(MAGIC_NUMBERS.VIEWPORT_WIDTH * $(window).width(), $(window).height());

    return (
      <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <TopBar N={this.state.N} changeGame={this.changeGame} />
        <br />
        <Counter
          N={this.state.N}
          cellWidth={ dimension / (MAGIC_NUMBERS.CELL_WIDTH * this.state.N) }
          count={this.state.count}
          reset={this.reset}/>
        <BoardLayout
          N={this.state.N}
          width={ dimension / (MAGIC_NUMBERS.WIDTH * this.state.N) }
          height={ dimension / (MAGIC_NUMBERS.HEIGHT * this.state.N) }
          margin={ dimension / (MAGIC_NUMBERS.MARGIN * this.state.N) }
          fontSize={ dimension / (MAGIC_NUMBERS.FONT_SIZE * this.state.N) }
          board={this.state.board.board}
          onMouseClick={this.handleMouseClick} />
        <BottomFrame
          N={this.state.N}
          activateAI={this.activateAutoSolve}
          autosolve={this.state.autosolve}
          solvable={this.state.solvable}
          won={this.state.won} />
        <br />
        <Footer />
      </div>
    );
  }
}
