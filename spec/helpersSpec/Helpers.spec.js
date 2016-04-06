import { inversionCount, shuffle } from '../../src/helpers/Helpers';

describe('The function inversionCount', () => {
  describe('when invoked with (pathological cases)', () => {
    it('nothing should return 0', () => {
      expect(inversionCount()).toEqual(0);
    });

    it('empty array should return 0', () => {
      expect(inversionCount([ ])).toEqual(0);
    });

    it('array of length 1 should return 0', () => {
      expect(inversionCount([ 1 ])).toEqual(0);
    });
  });

  describe('when invoked with (general cases)', () => {
    it('[ 1, 3, 2 ] should return 1', () => {
      expect(inversionCount([ 1, 3, 2 ])).toEqual(1);
    });

    it('[3, 4, 10, 8, 5, 2, 90, 1] should return ', () => {
      expect(inversionCount([ 3, 4, 1, 8, 5, 2, 90, 1 ])).toEqual(13);
    });
  });
});

describe('The function shuffle', () => {
  it('should preserve the elements of the original array', () => {
    let original = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
    let originalSet = new Set(original);
    let shuffledSet = new Set(shuffle(original));

    // comparison of two sets
    const eqSet = (ass, bs) => {
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

    expect(eqSet(originalSet, shuffledSet)).toBeTruthy();
  });
});
