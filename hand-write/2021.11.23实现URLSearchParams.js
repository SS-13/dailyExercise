// 1.手写题
// 80. 实现URLSearchParams
// https://bigfrontend.dev/zh/problem/implement-your-own-URLSearchParams
class MyURLSearchParams {
  /**
   * @params {string} init
   */
  constructor(init) {
    if (Object.prototype.toString.call(init) === "[object Object]") {
      this.params = Object.entries(init);
    } else if (Object.prototype.toString.call(init) === "[object String]") {
      console.log(init);
      let params = "",
        p = [];
      if (init.indexOf("?") >= 0) {
        params = init.split("?")[1];
      } else {
        params = init;
      }

      params = params.split("&");
      params.forEach((t) => {
        let temp = t.split("=");
        p.push([temp[0], temp[1]]);
      });

      this.params = p;
    }
  }

  /**
   * @params {string} name
   * @params {any} value
   */
  append(name, value) {
    this.params.push([name, `${value}`]);
  }

  /**
   * @params {string} name
   */
  delete(name) {
    this.params = this.params.filter(([n]) => n !== name);
  }

  /**
   * @returns {Iterator}
   */
  entries() {
    const p = this.params;
    return (function* () {
      yield* [...p];
    })();
  }

  /**
   * @param {(value, key) => void} callback
   */
  forEach(callback) {
    this.params.forEach(([key, val]) => {
      !!callback && callback(val, key);
    });
  }

  /**
   * @param {string} name
   * returns the first value of the name
   */
  get(name) {
    if (name.indexOf("?") >= 0) {
      name = name.split("?")[1];
    }
    let selected = this.params.filter(([n]) => n === name);

    return selected.length > 0 ? selected[0][1] : null;
  }

  /**
   * @param {string} name
   * @return {string[]}
   * returns the value list of the name
   */
  getAll(name) {
    let selected = this.params.filter(([n]) => n === name);
    let allValue = selected.map(([, value]) => value);
    return allValue;
  }

  /**
   * @params {string} name
   * @return {boolean}
   */
  has(name) {
    return !!this.params.find(([n]) => n === name);
  }

  /**
   * @return {Iterator}
   */
  keys() {
    let ks = new Set();
    this.params.forEach(([key]) => {
      ks.add(key);
    });
    return [...ks];
  }

  /**
   * @param {string} name
   * @param {any} value
   */
  set(name, value) {
    this.params = this.params.filter(([n]) => n !== name);
    this.params.push([name, `${value}`]);
  }

  // sor all key/value pairs based on the keys
  sort() {
    return this.params.sort((a, b) => {
      return a[0].charCodeAt() - b[0].charCodeAt();
    });
  }

  /**
   * @return {string}
   */
  toString() {
    let str = "";
    this.params.forEach(([n, v]) => {
      str += `${n}=${v}&`;
    });

    return str.substring(0, str.length - 1);
  }

  /**
   * @return {Iterator} values
   */
  values() {
    return this.params.map(([, v]) => v);
  }
}

// 2. 算法题
/*
这个问题和“最多能完成排序的块”相似，但给定数组中的元素可以重复，输入数组最大长度为2000，其中的元素最大为10**8。
arr是一个可能包含重复元素的整数数组，我们将这个数组分割成几个“块”，并将这些块分别进行排序。之后再连接起来，使得连接的结果和按升序排序后的原数组相同。

我们最多能将数组分成多少块？

示例 1:

输入: arr = [5,4,3,2,1]
输出: 1
解释:
将数组分成2块或者更多块，都无法得到所需的结果。
例如，分成 [5, 4], [3, 2, 1] 的结果是 [4, 5, 1, 2, 3]，这不是有序的数组。 
示例 2:

输入: arr = [2,1,3,4,4]
输出: 4
解释:
我们可以把它分成两块，例如 [2, 1], [3, 4, 4]。
然而，分成 [2, 1], [3], [4], [4] 可以得到最多的块数。 
注意:

arr的长度在[1, 2000]之间。
arr[i]的大小在[0, 10**8]之间。

*/
/**
 *
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted1 = function (arr) {
  let stack = [];

  for (let val of arr) {
    // 大于栈顶元素，直接入栈，算一个块
    if (!stack.length || stack[stack.length - 1] <= val) {
      stack.push(val);
    } else {
      let curMax = stack.pop();
      // val和这些弹出的元素算一个块
      while (stack.length && stack[stack.length - 1] > val) {
        stack.pop();
      }
      // 保存块中的最大值
      stack.push(curMax);
    }
  }
  return stack.length;
};
