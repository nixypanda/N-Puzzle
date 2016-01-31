import Board from '../../src/board/Board';

describe('Board', () => {
  describe('Check if the board is in goal state', () => {
    let board = new Board([1, 3, 2, 4, 6, 5, 7, 8, 0]);
    let goalBoard = new Board([1, 2, 3, 4, 5, 6, 7, 8, 0]);
    it('should return false', () => { expect(board.isGoal()).toBeFalsy(); });
    it("should return true", () => { expect(goalBoard.isGoal()).toBe(true); });
  });

  describe("Compare two boards", () => {
    let board1 = new Board([1, 3, 2, 4, 6, 5, 7, 8, 0]);
    let board2 = new Board([1, 3, 2, 4, 6, 5, 7, 8, 0]);
    let board3 = new Board([1, 2, 3, 4, 5, 6, 7, 8, 0]);

    it("should return false", () => { expect(board1.equals(board3)).toBe(false); });
    it("should return true", () => { expect(board1.equals(board2)).toBe(true); });
  });
});
