/**
 * @param {number[][]} tasks
 * @return {number[]}
 */
var getOrder = function (tasks) {
  let timeline = 0,
    answer = [];
  tasks = tasks.map((task, index) => ({
    index,
    start: task[0],
    time: task[1],
  }));
  tasks.sort((a, b) => b.start - a.start);
  console.log(tasks);
  // const first = tasks.pop();
  // timeline = first.start + first.time
  // answer.push(first.index);
  let queue = [];

  while (tasks.length > 0 || queue.length > 0) {
    if (queue.length === 0 && timeline < tasks[tasks.length - 1].start) {
      timeline = tasks[tasks.length - 1].start;
    }

    while (tasks.length > 0) {
      if (tasks[tasks.length - 1].start <= timeline) {
        const task = tasks.pop();
        queue.push(task);
      } else {
        break;
      }
    }

    queue.sort((a, b) => {
      const v1 = a.time,
        v2 = b.time;
      if (v1 === v2) {
        return b.start - a.start;
      }

      return v2 - v1;
    });
    console.log("-------------", timeline);
    console.log(queue);
    console.log("-------------");

    let temp = queue.pop();
    timeline += temp.time;
    answer.push(temp.index);

    // break
  }
  return answer;
};
