// 2.算法题
/*
61. 旋转链表
https://leetcode-cn.com/problems/rotate-list/
给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。

输入：head = [1,2,3,4,5], k = 2
输出：[4,5,1,2,3]

输入：head = [0,1,2], k = 4
输出：[2,0,1]

链表中节点的数目在范围 [0, 500] 内
-100 <= Node.val <= 100
0 <= k <= 2 * 109
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  // 链表长度小于等于1，不变
  if (k === 0 || !head || !head.next) {
    return head;
  }
  let n = 1;
  let cur = head;
  // 计算链表长度
  while (cur.next) {
    cur = cur.next;
    n++;
  }

  let add = n - (k % n); // 反转次数对链表长度取模，得出真实变换次数，链表长度减去真实变换次数得出新的断开位置
  if (add === n) {
    // 如果k是链表长度的倍数，不变
    return head;
  }

  cur.next = head; //首尾相连成环
  while (add) {
    cur = cur.next;
    add--;
  }

  const ret = cur.next; // cur为新的尾，他的下一个就是头
  cur.next = null; // 头尾断开
  return ret;
};
