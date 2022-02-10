/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let fast = 1,
    slow = 1;
  let length = nums.length;
  while (fast < length) {
    console.log(fast, slow);
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast];
      slow++;
    }
    fast++;
  }
  return slow;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  if (nums == null || nums.length == 0) return 0;

  let p = 0,
    q = 1;
  const len = nums.length;

  while (q < len) {
    if (nums[p] !== nums[q]) {
      nums[++p] = nums[q];
    }
    q++;
  }
  return p + 1;
};
