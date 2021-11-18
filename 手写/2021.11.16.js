//1.手写函数柯里化
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      // 递归拼接参数
      return function (...arg2) {
        return curried.apply(this, args.concat(arg2));
      };
    }
  };
}
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert(curriedSum(1, 2, 3)); // 6, still callable normally
alert(curriedSum(1)(2, 3)); // 6, currying of 1st arg
alert(curriedSum(1)(2)(3)); // 6, full currying

/**
 * 2.算法题：989. 数组形式的整数加法
 * 对于非负整数 X 而言，X 的数组形式是每位数字按从左到右的顺序形成的数组。例如，如果 X = 1231，那么其数组形式为 [1,2,3,1]。
 * 给定非负整数 X 的数组形式 A，返回整数 X+K 的数组形式。
 *
 * 输入：A = [1,2,0,0], K = 34
 * 输出：[1,2,3,4]
 * 解释：1200 + 34 = 1234
 *
 * 输入：A = [2,1,5], K = 806
 * 输出：[1,0,2,1]
 * 解释：215 + 806 = 1021
 *
 * 输入：A = [9,9,9,9,9,9,9,9,9,9], K = 1
 * 输出：[1,0,0,0,0,0,0,0,0,0,0]
 * 解释：9999999999 + 1 = 10000000000
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
var addToArrayForm = function (num, k) {
  const ks = `${k}`
    .split("")
    .map((n) => +n)
    .reverse();
  const ns = num.reverse();
  const length = Math.max(ns.length, ks.length);
  let result = [];
  let step = 0;
  for (i = 0; i < length; i++) {
    const x = ns[i] || 0;
    const y = ks[i] || 0;
    const sum = (x + y + step)
      .toString()
      .split("")
      .map((n) => +n)
      .reverse();

    result.push(sum[0]);
    step = sum[1] || 0;
  }
  if (step !== 0) {
    result.push(step);
  }

  return result.reverse();
};
