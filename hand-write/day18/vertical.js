/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var verticalTraversal = function (root) {
  if (!root) return [];

  const valMap = {};

  function func(node, idx = 0) {
    if (!node) return null;

    if (valMap[idx]) {
      valMap[idx].push(node.val);
    } else {
      valMap[idx] = [node.val];
    }

    func(node.left, idx - 1);
    func(node.right, idx + 1);
  }

  func(root);

  // console.log(valMap)
  const keys = Object.keys(valMap).sort((a, b) => a - b);
  // console.log(keys);
  const result = [];
  for (i = 0; i < keys.length; i++) {
    result.push(valMap[keys[i]].sort((a, b) => a - b));
  }
  // console.log(result)
  return result;
};
