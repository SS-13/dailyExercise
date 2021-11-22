// 1.手写题
// 116. 实现Object.is()
// https://bigfrontend.dev/zh/problem/implement-Object.is

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

// 2.算法
// 394. 字符串解码
// https://leetcode-cn.com/problems/decode-string/
/*
给定一个经过编码的字符串，返回它解码后的字符串。
编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

示例 1：
输入：s = "3[a]2[bc]"
输出："aaabcbc"

示例 2：
输入：s = "3[a2[c]]"
输出："accaccacc"

示例 3：
输入：s = "2[abc]3[cd]ef"
输出："abcabccdcdcdef"

示例 4：
输入：s = "abc3[cd]xyz"
输出："abccdcdcdxyz"

*/
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  let result = "",
    times = [],
    chars = [],
    num = 0;

  for (c of s) {
    if (!isNaN(c)) {
      num = num * 10 + c * 1;
    } else if (c === "[") {
      times.push(num);
      chars.push(result);
      result = "";
      num = 0;
    } else if (c === "]") {
      result = chars.pop() + result.repeat(times.pop());
    } else {
      result += c;
    }
  }

  return result;
};
