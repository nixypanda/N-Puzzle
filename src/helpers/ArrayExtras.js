"use strict"

// Defining array.equals
// Warn if overriding existing method
if (Array.prototype.equals) {
    console.warn("Overriding existing Array.prototype.equals.");
}

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

// defining array.clone
// warin if already exists
if (Array.prototype.clone) {
    console.warn("Overriding array.clone");
}

// using slicing to clone
Array.prototype.clone = function () {
    return this.slice(0);
}

// hide from for-in loops
Object.defineProperty(Array.prototype, "clone", {enumerable : false});

module.exports = Array.prototype.equals;
