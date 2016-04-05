import Board from './Board';

let NewBoard = (N) => {
  // Maximum number of moves is thus MAX_MOVES + MIN_MOVES
  let MAX_MOVES = N * N * N * N;
  let MIN_MOVES = 50;
  let board = new Board([ ...Array(N * N).keys() ].map(i => (i + 1) % (N * N)));

  // generate a random number this will be the number of moves that the
  // board will make
  let moves = Math.floor((Math.random() * MAX_MOVES) + MIN_MOVES);
  let move = [ 'moveLeft', 'moveRight', 'moveUp', 'moveDown' ];

  // randomly choose UP, DOWN, LEFT, RIGHT $(MOVES) number of times
  // NOTE: CAN WE DO BETTER?
  for (let i = 1; i < moves; i += 1) {
    board[move[Math.floor(Math.random() * 4)]]();
  }
  return board;
};

export default NewBoard;
