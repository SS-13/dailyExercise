/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  let maxD = 0;

  if (!root) return maxD;

  function deps(node, depth = 1) {
    if (!node) return null;

    if (maxD < depth) {
      maxD = depth;
    }
    depth += 1;
    deps(node.left, depth);
    deps(node.right, depth);
  }

  deps(root);
  return maxD;
};
