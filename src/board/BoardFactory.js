/* @flow */

import Board from "./Board";
import { shuffle } from "../helpers/Helpers";
import R from "ramda";

let NewBoard = (N: number): Board => {
  // just generate a random board
  let board = new Board(shuffle(R.range(0, N * N).map(i => (i + 1) % (N * N))));

  // if it"s solvable then return the board itself else return it"s twin
  if (!board.isSolvable()) {
    return board.twin();
  }
  return board;
};

export default NewBoard;
