import Board from './Board';
import { shuffle } from '../helpers/Helpers';

let NewBoard = (N) => {
  // just generate a random board
  let board = new Board(shuffle([ ...Array(N * N).keys() ].map(i => (i + 1) % (N * N))));

  // if it's solvable then return the board itself else return it's twin
  if (!board.isSolvable()) {
    return board.twin();
  }
  return board;
};

export default NewBoard;
