/**
 * @param {string} input
 * @returns string
 */
function removeChars(input) {
  // your code here
  let temp = input.replaceAll('b', '');
  while (true) {
    if (temp.indexOf('ac') === -1) {
      break;
    }
    temp = temp.replace('ac', '');
  }
  return temp;
}
