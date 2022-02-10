/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function is(a, b) {
  // your code here
  if (a === b) {
    // Object.is(0, -0) // false
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Object.is(NaN, NaN) // true
    return Number.isNaN(a) && Number.isNaN(b);
  }
}
