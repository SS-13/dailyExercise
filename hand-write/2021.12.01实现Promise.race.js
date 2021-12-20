// 1.手写题 - 实现Promise.race()
// https://bigfrontend.dev/problem/implement-Promise-race

// 2.算法题 - 146. LRU 缓存机制
// https://leetcode-cn.com/problems/lru-cache/

/**
 * @param {number} capacity
 */
//  var LRUCache = function (capacity) {
//     this.keyStack = [];
//     this.valStack = [];
//     this.maxSize = capacity;
// };

// /**
//  * @param {number} key
//  * @return {number}
//  */
// LRUCache.prototype.get = function (key) {
//     const index = this.keyStack.indexOf(key);
//     const value = this.valStack[index];
//     if (index >= 0) {
//         this.keyStack.splice(index, 1);
//         this.valStack.splice(index, 1);

//         this.keyStack.push(key);
//         this.valStack.push(value);
//     }
//     return index === -1 ? -1 : value
// };

// /**
//  * @param {number} key
//  * @param {number} value
//  * @return {void}
//  */
// LRUCache.prototype.put = function (key, value) {
//     const index = this.keyStack.indexOf(key);
//     const isMax = this.keyStack.length === this.maxSize;

//     if (index >= 0) {
//         this.keyStack.splice(index, 1);
//         this.valStack.splice(index, 1);
//     }

//     if (isMax && index === -1) {
//         this.keyStack.shift();
//         this.valStack.shift();
//     }

//     this.keyStack.push(key);
//     this.valStack.push(value);
// };

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
var LRUCache = class {
  constructor(capacity) {
    this.cache = new Map();
    this.capacity = capacity;
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    let cache = this.cache;
    if (cache.has(key)) {
      let temp = cache.get(key);
      cache.delete(key);
      cache.set(key, temp);
      return temp;
    } else {
      return -1;
    }
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    let cache = this.cache;
    if (cache.has(key)) {
      cache.delete(key);
    } else if (cache.size >= this.capacity) {
      cache.delete(cache.keys().next().value);
    }
    cache.set(key, value);
  }
};
