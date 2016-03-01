import BoardFactory from '../../src/board/BoardFactory';

describe('Board Factory Test Suite', () => {
  // depends on the correctness of the isSolvabe() method
  it('should just return a solvable baord configuration', () => {
    for (let size = 2; size < 10; size += 1) {
      let bf = new BoardFactory(size);
      expect(bf.getBoard().isSolvable()).toBeTruthy();
    }
  });
});
