const workflowJSON = {
  taskId: '13',
  workFlowStepList: [
    {
      showStepId: '3',
      parentShowStepId: '2',
      showControlType: 11,
      workFlowMission: {
        jobType: 1,
      },
    },
    {
      showStepId: '4',
      parentShowStepId: '3',
      showControlType: 7,
    },
    {
      showStepId: '5',
      parentShowStepId: '4',
      showControlType: 8,
    },
    {
      showStepId: '6',
      parentShowStepId: '5',
      parentStepKey: 'no',
      showControlType: 11,
      workFlowMission: {
        jobType: 1,
      },
    },
    {
      showStepId: '7',
      parentShowStepId: '6',
      showControlType: 7,
    },
    {
      showStepId: '8',
      parentShowStepId: '5',
      showControlType: 8,
      parentStepKey: 'yes',
    },
    {
      showStepId: '9',
      parentShowStepId: '8',
      showControlType: 11,
      workFlowMission: {
        jobType: 1,
      },
    },
  ],
};

getTaskLevelToMission = (workflowData) => {
  const { taskId, workFlowStepList } = workflowData;
  if (workFlowStepList.length === 0) {
    return workflowData;
  }

  const levelMap = {};
  const orderStepMap = {};
  const func = (node, level = 0) => {
    const { showStepId, showControlType } = node;

    if (showControlType === 11) {
      level += 1;
      if (!levelMap[level]) {
        levelMap[level] = `${showStepId}`;
      } else {
        levelMap[level] += `,${showStepId}`;
      }
    }

    let children = workFlowStepList.filter(
      (workflowStep) => workflowStep.parentShowStepId === showStepId
    );

    if (children.length === 2) {
      const yesChild = children.find((item) => item.parentStepKey === 'yes');
      const noChild = children.find((item) => item.parentStepKey === 'no');
      children = [yesChild, noChild];
    }

    console.log(children, 'children');

    for (let i = 0; i < children.length; i++) {
      func(children[i], level);
    }
  };

  func(workFlowStepList[0]);
  const levelEntries = Object.entries(levelMap);
  levelEntries.forEach(([lv, ids]) => {
    orderStepMap[lv] = ids.split(',').length === 1 ? 0 : 1;
  });

  console.log(levelMap, orderStepMap);

  levelEntries.forEach(([lv, ids]) => {
    const idsArr = ids.split(',');
    console.log(idsArr, 'idsArr');

    for (let i = 0; i < idsArr.length; i++) {
      const id = idsArr[i];
      const node = workFlowStepList.find((item) => item.showStepId === id);
      node.workFlowMission.taskLevel = `${lv}.${orderStepMap[lv]}`;
      orderStepMap[lv] += 1;
    }
  });

  return workflowData;
};

const result = getTaskLevelToMission(workflowJSON);

console.log(result);
