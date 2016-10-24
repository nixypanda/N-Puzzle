/* @flow */

import R from "ramda";
import { inversionCount, shuffle } from "./Helpers";

describe("The function inversionCount", () => {
  describe("when invoked with (pathological cases)", () => {

    it("empty array should return 0", () => {
      expect(inversionCount([ ])).toEqual(0);
    });

    it("array of length 1 should return 0", () => {
      expect(inversionCount([ 1 ])).toEqual(0);
    });
  });

  describe("when invoked with (general cases)", () => {
    it("[ 1, 3, 2 ] should return 1", () => {
      expect(inversionCount([ 1, 3, 2 ])).toEqual(1);
    });

    it("[3, 4, 10, 8, 5, 2, 90, 1] should return ", () => {
      expect(inversionCount([ 3, 4, 1, 8, 5, 2, 90, 1 ])).toEqual(13);
    });
  });
});

describe("The function shuffle", () => {
  it("should preserve the elements of the original array", () => {
    // comparison of two sets
    const eqSet = (ass: Set<number>, bs: Set<number>): boolean => {
      if (ass.size !== bs.size) {
        return false;
      }
      for (let a of ass) {
        if (!bs.has(a)) {
          return false;
        }
      }
      return true;
    };

    for (let i = 0; i < 10; i++) {
      const a = Math.floor((Math.random() * 100) + 1);
      const b = Math.floor((Math.random() * 100) + 1);
      const original = R.range(a, b)
      const originalSet = new Set(original);
      const shuffledSet = new Set(shuffle(original));

      expect(eqSet(originalSet, shuffledSet)).toBeTruthy();
    }
  });
});
