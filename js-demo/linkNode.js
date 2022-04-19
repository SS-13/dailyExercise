const list = [
  { id: '1', parentId: null },
  { id: '2', parentId: '1' },
  { id: '3', parentId: '2' },
  { id: '4', parentId: '3' },
  { id: '5', parentId: '4' },
  { id: '6', parentId: '4' },
  { id: '7', parentId: '5' },
  { id: '8', parentId: '7' },
  { id: '9', parentId: '6' },
  { id: '10', parentId: '9' },
];
let tree = {};

for (let i = 0; i < list.length; i++) {
  const item = list[i];
  tree = rewriteTreeById(item, tree);
}

console.log(tree);

function rewriteTreeById(item, tree) {
  if (!item.parentId) {
    tree = {
      ...item,
      //   children: [],
    };
    return tree;
  }

  let { id, children } = tree;

  if (item.parentId === id) {
    children = children || [];
    tree.children = [...children, item];
    return tree;
  }

  for (let i = 0; !!children && i < children.length; i++) {
    rewriteTreeById(item, children[i]);
  }

  return tree;
}

const t = {
  id: 1,
  children: [
    {
      id: 2,
      children: [
        {
          id: 3,
          children: [
            { id: 4, children: [{ id: 6 }] },
            { id: 5, children: [{ id: 7 }] },
          ],
        },
      ],
    },
  ],
};

function addEditBtnToTree(tree) {
  function addEditBtnToAllLeafs(node) {
    if (!node.children) {
      node.children = [{ id: 'edit' }];
    }

    for (let i = 0; i < node.children.length; i++) {
      addEditBtnToAllLeafs(node.children[i]);
    }

    return node;
  }

  addEditBtnToAllLeafs(tree);
  return tree;
}

console.log(addEditBtnToTree(t));
