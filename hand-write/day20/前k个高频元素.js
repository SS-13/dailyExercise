/* 
给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。
示例 1:

输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
示例 2:

输入: nums = [1], k = 1
输出: [1]
提示: 
1 <= nums.length <= 105
k 的取值范围是 [1, 数组中不相同的元素的个数]
题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的
进阶：你所设计算法的时间复杂度 必须 优于 O(n log n) ，其中 n 是数组大小。

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var topKFrequentV1 = function (nums, k) {
    const arr = nums.sort((a, b) => a - b)
    let hasMap = {}, count = 0, currNum = undefined;
    for (let i = 0; i < arr.length; i++) {
        if (currNum !==undefined && currNum !== arr[i]) {
            hasMap[currNum] = count
            count = 1;
        } else {
            count += 1
        }
        currNum = arr[i];
        if (i === arr.length - 1) {
            hasMap[currNum] = count
        }
    }
    const entires = Object.entries(hasMap).sort((a, b) => b[1] - a[1])
    let res = []
    for (let i = 0; i < k; i++) {
        res.push(entires[i][0])
    }
    return res;
};


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
 var topKFrequent = function (nums, k) {
    const numMap = {}

    for (let i = 0; i < nums.length; i++) {
        const n = nums[i];
        if (numMap[n]) {
            numMap[n] += 1;
        } else {
            numMap[n] = 1
        }
    }

    const entires = Object.entries(numMap).sort((a, b) => b[1] - a[1])
    // console.log(numMap, entires)
    const result = []
    let count = 0
    for (let i = 0; i < entires.length; i++) {
        const e = entires[i];
        if (count < k) {
            result.push(e[0])
            count++;
        } else {
            break;
        }
    }
    return result;
};