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
  if (k === 0 || !head || !head.next) {
    return head;
  }

  let list = head;
  count = 1;
  while (list.next) {
    count++;
    list = list.next;
  }

  // console.log(count, list)
  list.next = head;
  // console.log(head)

  count = count - (k % count);
  // console.log(count)
  while (count) {
    list = list.next;
    count--;
  }
  const ans = list.next;
  list.next = null;
  // console.log(ans);
  return ans;
};
