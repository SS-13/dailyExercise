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
 * @return {number}
 */
var findBottomLeftValue = function (root) {
  if (!root) return 0;
  let level = 0;
  let node = root;

  function func(n, l = 0) {
    if (n == null) return null;
    if (level < l) {
      level = l;
      node = n;
    }
    l += 1;
    func(n.left, l);
    func(n.right, l);
  }

  func(root);
  return node.val;
};
