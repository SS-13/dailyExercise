/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if (!root) return 'null';

  const left = serialize(root.left);
  const right = serialize(root.right);

  return `${root.val},${left},${right}`;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const list = data.split(',');
  function func(l) {
    const node = l.shift();
    if (node == 'null') {
      // 是#，返回null节点
      return null;
    }
    const root = new TreeNode(node);
    root.left = func(l);
    root.right = func(l);
    return root;
  }

  return func(list);
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
