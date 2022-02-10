/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function (moves) {
  const directionMap = {
    R: 1,
    L: -1,
    U: 1,
    D: -1,
  };

  let x = 0,
    y = 0;

  for (let i = 0; i < moves.length; i++) {
    let item = moves[i];
    if (item === "R" || item === "L") {
      x += directionMap[item];
    }
    if (item === "U" || item === "D") {
      y += directionMap[item];
    }
  }

  return x === 0 && y === 0;
};
