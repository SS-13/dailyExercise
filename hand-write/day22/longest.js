/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let tempArr = [];
  let res = 0;
  let tempS = s.split('');
  for (let i = 0; i < tempS.length; i++) {
    while (tempArr.indexOf(tempS[i]) !== -1) {
      tempArr.shift();
    }
    tempArr.push(tempS[i]);
    if (tempArr.length > res) {
      res = tempArr.length;
    }
  }
  return res;
};
