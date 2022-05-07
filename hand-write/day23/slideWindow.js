/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
  if (!s || !words || !words.length) return [];
  let windows = {},
    needs = {},
    oneWordLen = words[0].length;
  for (let w of words) {
    needs[w] ? needs[w]++ : (needs[w] = 1);
  }
  console.log(needs);
  let l = 0,
    r = 0,
    count = 0,
    needsKeyLen = Object.keys(needs).length,
    ans = [];
  console.log(needsKeyLen);
  for (let i = 0; i < oneWordLen; i++) {
    windows = {};
    r = l = i;
    count = 0;
    while (r <= s.length - oneWordLen) {
      let w1 = s.slice(r, r + oneWordLen);
      r += oneWordLen;
      if (!needs[w1]) {
        windows = {};
        l = r;
        count = 0;
        continue;
      }
      windows[w1] ? windows[w1]++ : (windows[w1] = 1);
      if (windows[w1] === needs[w1]) count++;
      while (count === needsKeyLen) {
        if (r - l === oneWordLen * words.length) ans.push(l);
        let w2 = s.slice(l, l + oneWordLen);
        l += oneWordLen;
        if (needs[w2]) {
          windows[w2]--;
          if (windows[w2] < needs[w2]) count--;
        }
      }
    }
  }
  return ans;
};
