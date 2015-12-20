"use strict"

/** Internal node used as elements of the priority queue
 *  Contatins 2 fields one to store data and one for it's priority
 */
class Node {
    constructor (data, priority) {
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
export default class PriorityQueue {
    constructor (arr) {
        this.heap = [null];
    }

    /**
     * Push a data entry(with a given priority) into the priority queue.
     * Takes time equivalent to O(log n) where n is the number of elements
     * currently in the queue.
     */
    push(data, priority) {
        let node = new Node(data, priority);
        // append the element to the end of the list and then bubble it
        // up to its place.
        this.bubble(this.heap.push(node) - 1);
    }

    /**
     * Removes and returns the data of highest priority (i.e. one with the
     * lowest value).
     * Takes time proportional to O(log n).
     */
    pop() {
        // throw an error if list is [null].
        if (this.heap.length < 2)
            throw 'Underflow';

        // get the value of the top element
        let topVal = this.heap[1].data;

        // pop the last element and put it on the top then sink it down hence
        //  maintaining the heap invarient.
        if (this.heap.length > 2)
            this.heap[1] = this.heap.pop();
        else
            this.heap.pop();

        this.sink(1);
        return topVal;
    }

    /**
     * bubbles node i up the binary tree based on
     * priority until heap conditions are restored
     */
    bubble(i) {
        // while the index of the element is greater than 1 and it has
        // higher priority compared to it's parent then exchange them
        while (i > 1 && this.isHigherPriority(i >> 1, i)) {
            this.swap(i, i >> 1);
            i = i >> 1;
        }
    }

    /**
     * Sinks a low priority element down to it's place until the heap invarient
     * is restored.
     */
    sink(i) {
        // while ith node has a child
        while (i*2 < this.heap.length) {
            let j = 2 * i;
            // pick the child with the higher priority
            if (j < this.heap.length - 1 && this.isHigherPriority(j, j + 1))
                j++;
            // compare priority to it's parent
            if (!(this.isHigherPriority(i, j)))
                break;
            // swap if parent has low priority
            this.swap(i, j);
            i = j;
        }
    }

    // swaps the addresses of 2 nodes
    swap(i, j) {
        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    // returns true if node i is higher priority than j
    isHigherPriority(i, j) {
        return ((this.heap[i].priority - this.heap[j].priority) > 0);
    }
}

///////////////////   Tests    /////////////////////////////
function pqTest() {
    console.log('Testing the priority queue');
    let queue = new PriorityQueue();

    queue.push({p:'two'}, 2);
    queue.push({p:'three'}, 3);
    queue.push({p:'five'}, 5);
    queue.push({p:'1st one'}, 1);
    queue.push({p:'zero'}, 0);
    queue.push({p:'nine'}, 9);
    queue.push({p:'2nd one'}, 1);

    console.log(queue.heap.toString()); // => 0,1,1,3,2,9,5

    console.log(queue.pop());           // => {p:'zero'}
    console.log(queue.pop());           // => {p:'1st one'}
    console.log(queue.heap.toString()); // => 1,2,9,3,5

    console.log(queue.pop());           // => {p:'2nd one'}
    console.log(queue.pop());           // => {p:'two'}
    console.log(queue.pop());           // => {p:'three'}

    queue.push({p:'one-half'}, 0.5);
    console.log(queue.heap.toString()); // => 0.5,2,1,3,5,9

    console.log(queue.pop());           // => {p:'one-half'}
    console.log(queue.pop());           // => {p:'five'}
    console.log(queue.pop());           // => {p:'Nine'}
    console.log(queue.heap.toString()); // =>
    console.log("Length of the queue is :" + queue.heap.length);
    console.log(queue.pop());           // => Underflow
    console.log('End Test');
}
