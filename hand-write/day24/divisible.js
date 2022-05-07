class Solution {
  solve(nums, k) {
    let len = 0;
    let sum = 0;
    let total = 0;
    let ptr = 0;
    let count = 0;
    sum = nums.reduce((a, b) => a + b);
    while (len < nums.length) {
      count = 0;
      total = sum;

      while (count < len) {
        total = total - nums[ptr + count];
        count++;
      }

      if (total % k == 0) {
        return len;
      }
      ptr++;
      if (ptr + len > nums.length) {
        ptr = 0;
        len++;
      }
    }
    return -1;
  }
}
