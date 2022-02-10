/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  if (!head || !head.next) {
    return head;
  }

  const h1 = head;
  const h2 = head.next;
  const temp = h2.next;

  h2.next = h1;

  if (!temp) {
    h1.next = null;
  } else {
    h1.next = swapPairs(temp);
  }

  return h2;
};
