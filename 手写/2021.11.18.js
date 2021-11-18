// 1. 实现`Promise.allSettled()`
function allSettled(promises) {
  if (!promises) {
    return Promise.resolve("");
  }
  let answers = [],
    count = 0;

  return new Promise((resolve) => {
    promises.length
      ? promises.forEach((item, idx) => {
          currentItem = item instanceof Promise ? item : Promise.resolve(item);

          currentItem
            .then((res) => (answers[idx] = { status: "fulfilled", value: res }))
            .catch(
              (err) => (answers[idx] = { status: "rejected", reason: err })
            )
            .finally(() => {
              count++;
              count === promises.length && resolve(answers);
            });
        })
      : resolve([]);
  });
}

// 2. 算法
// 1381. 设计一个支持增量操作的栈
// https://leetcode-cn.com/problems/design-a-stack-with-increment-operation/
/**
 * 
请你设计一个支持下述操作的栈。
实现自定义栈类 CustomStack ：
CustomStack(int maxSize)：用 maxSize 初始化对象，
maxSize 是栈中最多能容纳的元素数量，
栈在增长到 maxSize 之后则不支持 push 操作。
void push(int x)：如果栈还未增长到 maxSize ，就将 x 添加到栈顶。
int pop()：弹出栈顶元素，并返回栈顶的值，或栈为空时返回 -1 。
void inc(int k, int val)：栈底的 k 个元素的值都增加 val 。如果栈中元素总数小于 k ，则栈中的所有元素都增加 val 。

输入：
["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
[[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
输出：
[null,null,null,2,null,null,null,null,null,103,202,201,-1]
解释：
CustomStack customStack = new CustomStack(3); // 栈是空的 []
customStack.push(1);                          // 栈变为 [1]
customStack.push(2);                          // 栈变为 [1, 2]
customStack.pop();                            // 返回 2 --> 返回栈顶值 2，栈变为 [1]
customStack.push(2);                          // 栈变为 [1, 2]
customStack.push(3);                          // 栈变为 [1, 2, 3]
customStack.push(4);                          // 栈仍然是 [1, 2, 3]，不能添加其他元素使栈大小变为 4
customStack.increment(5, 100);                // 栈变为 [101, 102, 103]
customStack.increment(2, 100);                // 栈变为 [201, 202, 103]
customStack.pop();                            // 返回 103 --> 返回栈顶值 103，栈变为 [201, 202]
customStack.pop();                            // 返回 202 --> 返回栈顶值 202，栈变为 [201]
customStack.pop();                            // 返回 201 --> 返回栈顶值 201，栈变为 []
customStack.pop();                            // 返回 -1 --> 栈为空，返回 -1
*/

/**
 * @param {number} maxSize
 */
var CustomStack = function (maxSize) {
  this.maxSize = maxSize;
  this.index = -1;
  this.stack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function (x) {
  if (this.index + 1 < this.maxSize) {
    this.stack[++this.index] = x;
  }
};

/**
 * @return {number}
 */
CustomStack.prototype.pop = function () {
  let pop = this.stack.length > 0 ? this.stack[this.index--] : -1;
  this.stack.length = this.index + 1;
  return pop;
};

/**
 * @param {number} k
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function (k, val) {
  let length = this.index + 1 > k ? k : this.index + 1;
  for (let i = 0; i < length; i++) {
    this.stack[i] += val;
  }
};

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */

/**
 * @param {number} maxSize
 */
var CustomStack = function (maxSize) {
  this.maxSize = maxSize;
  this.stack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
CustomStack.prototype.push = function (x) {
  if (this.stack.length < this.maxSize) {
    this.stack.push(x);
  }
};

/**
 * @return {number}
 */
CustomStack.prototype.pop = function () {
  return this.stack.length > 0 ? this.stack.pop() : -1;
};

/**
 * @param {number} k
 * @param {number} val
 * @return {void}
 */
CustomStack.prototype.increment = function (k, val) {
  // console.log(k, val, this.stack);
  let length = k <= this.stack.length ? k : this.stack.length;
  // console.log(length)
  for (let i = 0; i < length; i++) {
    this.stack[i] += val;
  }
};

/**
 * Your CustomStack object will be instantiated and called as such:
 * var obj = new CustomStack(maxSize)
 * obj.push(x)
 * var param_2 = obj.pop()
 * obj.increment(k,val)
 */
