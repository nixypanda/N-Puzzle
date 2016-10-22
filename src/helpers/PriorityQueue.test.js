import PriorityQueue from "../../src/helpers/PriorityQueue";

describe("Priority Queue Specifications", () => {
  let queue;

  beforeEach(() => {
    queue = new PriorityQueue();
    queue.push({ p: "two" }, 2);
    queue.push({ p: "three" }, 3);
    queue.push({ p: "five" }, 5);
    queue.push({ p: "1st one" }, 1);
    queue.push({ p: "zero" }, 0);
    queue.push({ p: "nine" }, 9);
    queue.push({ p: "2nd one" }, 1);
  });

  describe("Push operations", () => {

    it("should succed when pushing one element", () => {
      let q = new PriorityQueue();
      q.push({ p: "two" }, 2);
      expect(q.heap.toString()).toEqual("2");
    });

    it("should succed when pushing two element", () => {
      let q = new PriorityQueue();
      q.push({ p: "two" }, 2);
      q.push({ p: "three" }, 3);
      expect(q.heap.toString()).toEqual("2,3");
    });

    it("should succed when pushing multitue of operations", () => {
      expect(queue.heap.toString()).toEqual("0,1,1,3,2,9,5");
    });
  });

  describe("Pop operations", () => {
    it("should have the following state", () => {
      expect(queue.pop()).toEqual({ p: "zero" });
      expect(queue.pop()).toEqual({ p: "1st one" });
      expect(queue.heap.toString()).toEqual("1,2,9,3,5");
    });
  });

  describe("Make the Priority Queue to Underflow", () => {
    it("should Underflow", () => {
      queue.pop();
      queue.pop();
      queue.pop();
      queue.pop();
      queue.pop();
      queue.pop();
      queue.pop();

      expect(() => {
        queue.pop();
      }).toThrow(new Error("Underflow"));
    });
  });

  describe("Push and pop operations", () => {
    it("sholud perform push/pops accordingly", () => {
      expect(queue.pop()).toEqual({ p: "zero" });
      expect(queue.pop()).toEqual({ p: "1st one" });
      queue.push({ p: "one-half" }, 0.5);
      expect(queue.heap.toString()).toEqual("0.5,2,1,3,5,9");
    });
  });

});
