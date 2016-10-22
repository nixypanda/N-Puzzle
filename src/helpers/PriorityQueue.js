/* @flow */

/** Internal node used as elements of the priority queue
 *  Contatins 2 fields one to store data and one for it's priority
 */
class Node<T> {
  data: T;
  priority: number;

  constructor(data: T, priority: number) {
    this.data = data;
    this.priority = priority;
  }

  // Returns the string representation of the node
  toString() {
    return this.priority;
  }
}

/**
 * The Constructor for the priority queue.
 * Using the Heap Implementation which performs push, pull in lograthmic time.
 */
export default class PriorityQueue<T> {
  heap: Array<Node<T>>;

  constructor() {
    this.heap = [ ];
  }

  /**
   * Push a data entry (with a given priority) into the priority queue.
   * Takes time equivalent to O(log n) where n is the number of elements
   * currently in the queue.
   *
   * @param  {T} data the content
   * @param  {number} priority the priority of the content
   * @return {void} nothing
   */
  push(data: T, priority: number): void {
    let node = new Node(data, priority);

    // append the element to the end of the list and then __bubble__ it
    // up to its place.
    this.__bubble__(this.heap.push(node) - 1);
  }

  /**
   * Removes and returns the data of highest priority (i.e. one with the
   * lowest value).
   * Takes time proportional to O(log n).
   *
   * @return {T} the object with the max priority (i.e. the one with the minimum value for priority)
   */
  pop(): T {
    // throw an error if list is [null].
    if (this.heap.length < 1) {
      throw new Error('Underflow');
    }

    // get the value of the top element
    let topVal = this.heap[0].data;

    // pop the last element and put it on the top then __sink__ it down hence
    //  maintaining the heap invarient.
    if (this.heap.length > 1) {
      this.heap[0] = this.heap.pop();
    } else {
      this.heap.pop();
    }

    this.__sink__(0);
    return topVal;
  }

  // PRIVATE HELPER: bubbles node i up the binary tree based on priority until heap conditions are restored
  __bubble__(node: number): void {
    let present = node;
    // helper function to get the parent of the child
    const parent = (child) => Math.ceil(child / 2) - 1;

    // while the index of the element is greater than 1 and it has
    // lower priority compared to it's parent then exchange them
    while (present > 0 && this.__isLowerPriority__(parent(present), present)) {
      this.__swap__(present, parent(present));
      present = parent(present);
    }
  }

  // Sinks a low priority element down to it's place until the heap invarient is restored.
  __sink__(node: number): void {
    let present = node;
    // while ith node has a child
    while (present * 2 + 1 < this.heap.length) {
      const firstChild = 2 * present + 1;
      let higherPriorityChild = firstChild;

      // pick the child with the higher priority
      if (firstChild < this.heap.length - 1 && this.__isLowerPriority__(firstChild, firstChild + 1)) {
        higherPriorityChild += 1;
      }
      // compare priority to it's parent
      if (!(this.__isLowerPriority__(present, higherPriorityChild))) {
        break;
      }
      // swap if parent has low priority
      this.__swap__(present, higherPriorityChild);
      present = higherPriorityChild;
    }
  }

  // swaps the addresses of 2 nodes
  __swap__(i: number, j: number): void {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  // returns true if node i is higher priority than j
  __isLowerPriority__(i: number, j: number): boolean {
    return ((this.heap[i].priority - this.heap[j].priority) > 0);
  }

}
