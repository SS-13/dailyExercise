/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
 var sortedListToBST = function (head) {
    const arr = [];
    while (head) {
        arr.push(head.val);
        head = head.next;
    }

    const buildBST = (start, end) => {
        if (start > end) return null;

        const mid = (start + end) >> 1;
        const root = new TreeNode(arr[mid]);
        root.left = buildBST(start, mid - 1);
        root.right = buildBST(mid + 1, end)
        return root;
    }

    return buildBST(0, arr.length - 1)
};


// const arr = [];
//   while (head) { // 将链表节点的值逐个推入数组arr
//     arr.push(head.val);
//     head = head.next;
//   }
//   // 根据索引start到end的子数组构建子树
//   const buildBST = (start, end) => {
//     if (start > end) return null;        // 指针交错，形成不了子序列，返回null节点
//     const mid = (start + end) >>> 1;     // 求中间索引 中间元素是根节点的值
//     const root = new TreeNode(arr[mid]); // 创建根节点
//     root.left = buildBST(start, mid - 1); // 递归构建左子树
//     root.right = buildBST(mid + 1, end);  // 递归构建右子树
//     return root;                          // 返回当前子树
//   };

//   return buildBST(0, arr.length - 1);  // 根据整个arr数组构建
