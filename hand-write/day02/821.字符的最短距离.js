var shortestToChar = function (s, c) {
  var answer = Array(s.length).fill(Infinity),
    cs = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      cs.push(i);
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      answer[i] = 0;
    }

    for (let j = 0; j < cs.length; j++) {
      let diff = Math.abs(cs[j] - i);
      if (diff >= answer[i]) break;

      answer[i] = diff;
    }
  }
  return answer;
};
