/**
 * This funt merges two sorted arrays and returns inversion count in the arrays.
 *
 * @param  {array} arr   [ the original array ]
 * @param  {array} temp  [ a temprory array with same size as of the original ]
 * @param  {number} left  [ the starting point of the whole array ]
 * @param  {number} mid   [ the middle point of the whole array ]
 * @param  {number} right [ the ending index of the whole array ]
 * @return {number}       [ the total number of split inversions ]
 */
const __merge__ = (arr, temp, left, mid, right) => {
  // start index for left subarray
  let i = left;
  // start index for right subarray
  let j = mid;
  // start index for merged array
  let k = left;
  let invCount = 0;

  while ((i <= mid - 1) && (j <= right)) {
    if (arr[i] <= arr[j]) {
      temp[k] = arr[i];
      i += 1;
    } else {
      temp[k] = arr[j];
      j += 1;
      invCount += (mid - i);
    }
    k += 1;
  }

  // Copy the remaining elements of left subarray (if there are any) to temp
  while (i <= mid - 1) {
    temp[k] = arr[i];
    i += 1;
    k += 1;
  }

  // Copy the remaining elements of right subarray (if there are any) to temp
  while (j <= right) {
    temp[k] = arr[j];
    j += 1;
    k += 1;
  }

  // Copy back the merged elements to original array
  for (i = left; i <= right; i += 1) {
    arr[i] = temp[i];
  }

  return invCount;
};

/**
 * The recursive routine that calls itself on left part then right part and the calls merge on both.
 *
 * @param  {array}  arr   [ the original array ]
 * @param  {array}  temp  [ a temprory array with same size as of the original ]
 * @param  {number} left  [ the starting point of the whole array ]
 * @param  {number} right [ the ending point of the whole array ]
 * @return {number}       [ the total number of split inversions ]
 */
const __mergeAndCount__ = (arr, temp, left, right) => {
  let mid = 0;
  let invCount = 0;
  if (right > left) {
    // Divide the array into two parts and call __mergeAndCount__AndCountInv() for each of the parts
    mid = Math.floor((right + left) / 2);

    // Inversion count will be sum of inversions in left-part, right-part and number of inversions in merging
    invCount = __mergeAndCount__(arr, temp, left, mid);
    invCount += __mergeAndCount__(arr, temp, mid + 1, right);

    // Merge the two parts
    invCount += __merge__(arr, temp, left, mid + 1, right);
  }
  return invCount;
};

/**
 * This method takes in an array of objects/numbers and returns the number of inversions in it.
 *
 * @param  {array}  array [ the original array ]
 * @return {number}       [ total number of inversions in the original array ]
 */
export const inversionCount = (array) => {
  if (!array || array.length === 0 || array.length === 1) {
    return 0;
  }
  return __mergeAndCount__(array, new Array(array.length), 0, array.length - 1);
};


/**
 * A linear time array randomizer
 * @param  {array} array [ the original array ]
 * @return {array}       [ the shuffled array ]
 */
export const shuffle = (array) => {
  let m = array.length;
  let t;
  let i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m);
    m -= 1;

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};
