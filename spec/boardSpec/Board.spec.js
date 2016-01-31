import Board from '../../src/board/Board';

// Testing various mehtods of the Board class.
describe('Board', () => {
  // baord.isGoal()
  describe('Check if the board is in goal state', () => {
    let board = new Board([1, 3, 2, 4, 6, 5, 7, 8, 0]);
    let goalBoard = new Board([1, 2, 3, 4, 5, 6, 7, 8, 0]);
    it('should return false', () => { expect(board.isGoal()).toBeFalsy(); });
    it('should return true', () => { expect(goalBoard.isGoal()).toBeTruthy(); });
  });
  // board.equals
  describe('Compare two boards', () => {
    let board1 = new Board([1, 3, 2, 4, 6, 5, 7, 8, 0]);
    let board2 = new Board([1, 3, 2, 4, 6, 5, 7, 8, 0]);
    let board3 = new Board([1, 2, 3, 4, 5, 6, 7, 8, 0]);

    it('should return false', () => { expect(board1.equals(board3)).toBeFalsy(); });
    it('should return true', () => { expect(board1.equals(board2)).toBeTruthy(); });
  });

  // board.isSolvable()
  describe('Check if the board is solvable or not', () => {
    let oddSolvable = new Board([5, 0, 6, 2, 3, 1, 4, 7, 8]);
    let oddUnSolvable = new Board([5, 0, 6, 2, 3, 1, 4, 8, 7]);
    let evenSolvable = new Board([1, 2, 8, 4, 6, 14, 3, 7, 10, 9, 12, 15, 0, 11, 5, 13]);
    let evenUnSolvable = new Board([2, 1, 8, 4, 6, 14, 3, 7, 10, 9, 12, 15, 0, 11, 5, 13]);

    it('should return true', () => { oddSolvable.isSolvable(); });
    it('should return false', () => { oddUnSolvable.isSolvable(); });
    it('should return true', () => { evenSolvable.isSolvable(); });
    it('should return false', () => { evenUnSolvable.isSolvable(); });
  });

  // hamming() and manhattan()
  describe('Calculation of the hamming/manhattan distance', () => {
    let board = new Board([8, 1, 3, 4, 0, 2, 7, 6, 5]);

    it('hamming distance should be 5', () => {
      expect(board.hamming()).toEqual(5);
    });

    it('manhattan distance should be 10', () => {
      expect(board.manhattan()).toEqual(10);
    });
  });

  // moveLeft(), moveRight(), moveUp(), moveDown() and move(tile)
  // depends on correctness of the board.equals()
  describe('Moving tiles', () => {
    let board;
    beforeEach(() => {
      board = new Board([1, 3, 2, 6, 0, 5, 7, 8, 4]);
    });

    it('0 should move to the left', () => {
      board.moveLeft();
      expect(board.equals(new Board([1, 3, 2, 0, 6, 5, 7, 8, 4]))).toBeTruthy();
    });

    it('0 should move to the right', () => {
      board.moveRight();
      expect(board.equals(new Board([1, 3, 2, 6, 5, 0, 7, 8, 4]))).toBeTruthy();
    });

    it('0 should move up', () => {
      board.moveUp();
      expect(board.equals(new Board([1, 0, 2, 6, 3, 5, 7, 8, 4]))).toBeTruthy();
    });

    it('0 should move to the right', () => {
      board.moveDown();
      expect(board.equals(new Board([1, 3, 2, 6, 8, 5, 7, 0, 4]))).toBeTruthy();
    });

    it('0 should move left', () => {
      board.move(6);
      expect(board.equals(new Board([1, 3, 2, 0, 6, 5, 7, 8, 4]))).toBeTruthy();
    });

    it('0 should not move', () => {
      board.move(1);
      expect(board.equals(new Board([1, 3, 2, 6, 0, 5, 7, 8, 4]))).toBeTruthy();
    });
  });

  describe('Get the neighbours of a board', () => {
    let board = new Board([1, 3, 2, 6, 0, 5, 7, 8, 4]);
    let left = new Board([1, 3, 2, 0, 6, 5, 7, 8, 4]);
    let right = new Board([1, 3, 2, 6, 5, 0, 7, 8, 4]);
    let up = new Board([1, 0, 2, 6, 3, 5, 7, 8, 4]);
    let down = new Board([1, 3, 2, 6, 8, 5, 7, 0, 4]);

    it('shold return all the neighbours of the board', () => {
      let neighbours = board.neighbours();
      expect(up.equals(neighbours[0])).toBeTruthy();
      expect(left.equals(neighbours[1])).toBeTruthy();
      expect(down.equals(neighbours[2])).toBeTruthy();
      expect(right.equals(neighbours[3])).toBeTruthy();
    });
  });
});
