/**
 * 1.实现symbol polyfill
 * @param {*} description
 */
var mySymbol = function (description) {
  // description 可选
  // 直接使用Symbol()创建新的symbol类型，并用一个可选的字符串作为其描述。
  let desc = `${description}` || "";
  // 带有 new 运算符的语法将抛出 TypeError 错误：
  if (this instanceof mySymbol) {
    throw new TypeError("mySymbol is not a constructor");
  }
  // Symbol("foo") 不会强制将字符串 “foo” 转换成symbol类型。它每次都会创建一个新的 symbol类型
  let newSymbol = Object.create(null);
  // Symbol.length 长度属性，值为0。
  newSymbol.length = 0;

  newSymbol.toString = function () {
    return `Symbol(${desc})`;
  };

  /*
    全局共享的 Symbol上面使用Symbol() 函数的语法，不会在你的整个代码库中创建一个可用的全局的symbol类型。
    要创建跨文件可用的symbol，甚至跨域（每个都有它自己的全局作用域） , 
    使用 Symbol.for() 方法和  Symbol.keyFor() 方法从全局的symbol注册表设置和取得symbol。
  */
  if (desc) {
    window.mySymbolMap = window.mySymbolMap || { [desc]: newSymbol };
  }
  newSymbol.for = function (desc) {
    return window.mySymbolMap[desc] || mySymbol();
  };
  newSymbol.keyFor = function (mySymbol = {}) {
    return mySymbol.desc || "undefined";
  };

  /*
    迭代 symbols
    Symbol.iterator
    一个返回一个对象默认迭代器的方法。被 for...of 使用。
  */
  /*
    Symbol.asyncIterator 
    一个返回对象默认的异步迭代器的方法。被 for await of 使用。
  */
  /*
    Symbol.replace
    一个替换匹配字符串的子串的方法. 被 String.prototype.replace() 使用。
  */
  /*
    Symbol.search
    一个返回一个字符串中与正则表达式相匹配的索引的方法。被String.prototype.search() 使用。
  */
  /*
    Symbol.split
    一个在匹配正则表达式的索引处拆分一个字符串的方法.。被 String.prototype.split() 使用。
  */
//   Object.defineProperties(newSymbol, {
//     configurable: false,
//     enumerable: false,
//     writable: false,
//     value: desc,
//   });
  return newSymbol;
};

/**
 * 2.算法题：821. 字符的最短距离
 * https://leetcode-cn.com/problems/shortest-distance-to-a-character
 *
 * 给你一个字符串 s 和一个字符 c ，且 c 是 s 中出现过的字符。
 * 返回一个整数数组 answer ，其中 answer.length == s.length 且 answer[i] 是 s 中从下标 i 到离它 最近 的字符 c 的 距离 。
 * 两个下标 i 和 j 之间的 距离 为 abs(i - j) ，其中 abs 是绝对值函数。
 *
 * 示例 1：
 * 输入：s = "loveleetcode", c = "e"
 * 输出：[3,2,1,0,1,0,0,1,2,2,1,0]
 * 解释：字符 'e' 出现在下标 3、5、6 和 11 处（下标从 0 开始计数）。
 * 距下标 0 最近的 'e' 出现在下标 3 ，所以距离为 abs(0 - 3) = 3 。
 * 距下标 1 最近的 'e' 出现在下标 3 ，所以距离为 abs(1 - 3) = 2 。
 * 对于下标 4 ，出现在下标 3 和下标 5 处的 'e' 都离它最近，但距离是一样的 abs(4 - 3) == abs(4 - 5) = 1 。
 * 距下标 8 最近的 'e' 出现在下标 6 ，所以距离为 abs(8 - 6) = 2 。
 *
 * 示例 2：
 * 输入：s = "aaab", c = "b"
 * 输出：[3,2,1,0]
 *
 * 1 <= s.length <= 104
 * s[i] 和 c 均为小写英文字母
 * 题目数据保证 c 在 s 中至少出现一次
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
var shortestToChar = function (s, c) {
  let cs = [],
    cIdx = 0,
    answer = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      cs.push(i);
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (cs[cIdx] == i) {
      answer.push(0);
      continue;
    }
    if (cs[cIdx + 1] < i && cIdx < cs.length - 2) {
      console.log(1);
      cIdx++;
    }

    const x = Math.abs(i - cs[cIdx]);
    const y = isNaN(cs[cIdx + 1])
      ? Number.MAX_SAFE_INTEGER
      : Math.abs(i - cs[cIdx + 1]);

    answer.push(Math.min(x, y));
  }
  return answer;
};

// faster
var shortestToChar2 = function (s, c) {
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

var shortestToChar3 = function (s, c) {
  let cs = [],
    answer = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      cs.push(i);
    }
  }
  for (let i = 0; i < s.length; i++) {
    currentDleta = cs.map((n) => Math.abs(n - i));
    answer.push(Math.min(...currentDleta));
  }
  return answer;
};
