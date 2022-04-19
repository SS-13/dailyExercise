/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function func(node, sum = 0) {
  if (!node) {
    return 0;
  }

  sum = sum * 10 + node.val;

  if (!node.left && !node.right) {
    return sum;
  }

  return func(node.left, sum) + func(node.right, sum);
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function (root) {
  return func(root);
};
