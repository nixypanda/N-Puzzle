import R from "ramda";

import autoSolve from "./Solver";
import newBoard from "../board/BoardFactory";
import Board from "../board/Board";

describe("The solver", () => {
  it("returns a valid move set for [[1, 2, 3], [4, 5, 6], [7, 8, 0]]", () => {
    const board = new Board([1, 2, 3, 4, 5, 6, 7, 8, 0]);
    const expected = [board];
    const actual = autoSolve(board);

    expect(actual).toEqual(expected)
  });

  it("should generate board in which zero index changes by one and last item is the goal board", () => {
    // It is a property based test so takes some time to run
    // limiting it to 2. (Can change to a large value for a thorough test)
    for (let i = 0; i < 2; i++) {
      const board = newBoard(3);
      const possibleValues = new Set([ 1, -1, 3, -3 ]);
      const solution = autoSolve(board);
      const offset = R.tail(solution);

      const zipi = R.zipWith((a, b) => possibleValues.has(a.zeroIndex - b.zeroIndex), solution, offset);

      expect(R.all(a => a, zipi)).toBeTruthy();
      expect(solution[solution.length - 1]).toEqual(new Board([1, 2, 3, 4, 5, 6, 7, 8, 0]));
    }
  });

  it("should return an empty array if an unsolvable initial config is provided", () => {
    const unsolvableBoard = new Board([2, 1, 3, 4, 5, 6, 7, 8, 0]);
    const actual = autoSolve(unsolvableBoard);

    expect(actual).toEqual([]);
  });
});
