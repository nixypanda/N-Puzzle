import Board from '../../src/board/Board';

// Testing various mehtods of the Board class.
describe('In the module Board', () => {
  // baord.isGoal()
  describe('output of isGoal method with a board in final state', () => {
    let goalBoard = new Board([ 1, 2, 3, 4, 5, 6, 7, 8, 0 ]);

    it('should be true', () => {
      expect(goalBoard.isGoal()).toBeTruthy();
    });
  });

  describe('output of isGoal method with a board in final state', () => {
    let board = new Board([ 1, 3, 2, 4, 6, 5, 7, 8, 0 ]);

    it('should return false', () => {
      expect(board.isGoal()).toBeFalsy();
    });
  });

  // board.equals
  describe('comparison of two (dis)similar boards', () => {
    let board1 = new Board([ 1, 3, 2, 4, 6, 5, 7, 8, 0 ]);
    let board2 = new Board([ 1, 3, 2, 4, 6, 5, 7, 8, 0 ]);
    let board3 = new Board([ 1, 2, 3, 4, 5, 6, 7, 8, 0 ]);

    it('should return false (dissimilar)', () => {
      expect(board1.equals(board3)).toBeFalsy();
    });
    it('should return true (similar)', () => {
      expect(board1.equals(board2)).toBeTruthy();
    });
  });

  // board.isSolvable()
  describe('output of isSolvable for', () => {
    let oddSolvable = new Board([ 5, 0, 6, 2, 3, 1, 4, 7, 8 ]);
    let evenSolvable = new Board([ 1, 2, 8, 4, 6, 14, 3, 7, 10, 9, 12, 15, 0, 11, 5, 13 ]);
    let oddUnSolvable = new Board([ 5, 0, 6, 2, 3, 1, 4, 8, 7 ]);
    let evenUnSolvable = new Board([ 2, 1, 8, 4, 6, 14, 3, 7, 10, 9, 12, 15, 0, 11, 5, 13 ]);

    describe('valid odd sized board', () => {
      it('should be true', () => {
        oddSolvable.isSolvable();
      });
    });
    describe('valid even sized board', () => {
      it('should be true', () => {
        evenSolvable.isSolvable();
      });
    });

    // board.isSolvable()
    describe('invalid odd sized board', () => {
      it('should be true', () => {
        oddUnSolvable.isSolvable();
      });
    });
    describe('invalid even sized board', () => {
      it('should be true', () => {
        evenUnSolvable.isSolvable();
      });
    });
  });

  // hamming() and manhattan()
  describe('calculating the hamming/manhattan distance', () => {
    let board = new Board([ 8, 1, 3, 4, 0, 2, 7, 6, 5 ]);

    it('hamming distance should be 5', () => {
      expect(board.hamming()).toEqual(5);
    });

    it('manhattan distance should be 10', () => {
      expect(board.manhattan()).toEqual(10);
    });
  });

  // moveLeft(), moveRight(), moveUp(), moveDown() and move(tile)
  // depends on correctness of the board.equals()
  describe('Moving tiles for board [[1, 3, 2], [6, 0, 5], [7, 8, 4]]', () => {
    let board;
    const RIGHT = 0;
    const DOWN = 1;
    const LEFT = 2;
    const UP = 3;

    beforeEach(() => {
      board = new Board([ 1, 3, 2, 6, 0, 5, 7, 8, 4 ]);
    });

    it('0 should move to the left', () => {
      board.moveOnDirection(LEFT);
      expect(board.equals(new Board([ 1, 3, 2, 0, 6, 5, 7, 8, 4 ]))).toBeTruthy();
    });

    it('0 should move to the right', () => {
      board.moveOnDirection(RIGHT);
      expect(board.equals(new Board([ 1, 3, 2, 6, 5, 0, 7, 8, 4 ]))).toBeTruthy();
    });

    it('0 should move up', () => {
      board.moveOnDirection(UP);
      expect(board.equals(new Board([ 1, 0, 2, 6, 3, 5, 7, 8, 4 ]))).toBeTruthy();
    });

    it('0 should move to the right', () => {
      board.moveOnDirection(DOWN);
      expect(board.equals(new Board([ 1, 3, 2, 6, 8, 5, 7, 0, 4 ]))).toBeTruthy();
    });

    it('0 should move left', () => {
      board.moveOnIndex(3);
      expect(board.equals(new Board([ 1, 3, 2, 0, 6, 5, 7, 8, 4 ]))).toBeTruthy();
    });

    it('0 should not move', () => {
      board.moveOnIndex(0);
      expect(board.equals(new Board([ 1, 3, 2, 6, 0, 5, 7, 8, 4 ]))).toBeTruthy();
    });
  });

  describe('getting the neighbours of [[1, 3, 2], [6, 0, 5], [7, 8, 4]]', () => {
    let board = new Board([ 1, 3, 2, 6, 0, 5, 7, 8, 4 ]);
    let left = new Board([ 1, 3, 2, 0, 6, 5, 7, 8, 4 ]);
    let right = new Board([ 1, 3, 2, 6, 5, 0, 7, 8, 4 ]);
    let up = new Board([ 1, 0, 2, 6, 3, 5, 7, 8, 4 ]);
    let down = new Board([ 1, 3, 2, 6, 8, 5, 7, 0, 4 ]);

    it('shold return 4 neighbours (0<->3, 0<->6, 0<->5, 0<->8)', () => {
      let neighbours = board.neighbours();
      expect(up.equals(neighbours[0])).toBeTruthy();
      expect(left.equals(neighbours[1])).toBeTruthy();
      expect(down.equals(neighbours[2])).toBeTruthy();
      expect(right.equals(neighbours[3])).toBeTruthy();
    });
  });
});
