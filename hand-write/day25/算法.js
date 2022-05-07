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
var middleNode = function (head) {
  var length = 1;
  var curNode = head;
  while (curNode.next) {
    curNode = curNode.next;
    length++;
  }
  curNode = head;

  for (let i = 0; i < Math.floor(length / 2); i++) {
    curNode = curNode.next;
  }
  return curNode;
};

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
var middleNode2 = function (head) {
  let tHead = new ListNode(null, head);
  let slow = tHead,
    fast = tHead;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return fast == null ? slow : slow.next;
};
