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
