var addToArrayForm1 = function (num, k) {
  let ks = `${k}`,
    ns = num;
  let nl = num.length;
  ksl = ks.length;
  const deltaLength = nl - ksl;

  const length = Math.max(nl, ksl);
  console.log(nl, ksl);
  if (deltaLength > 0) {
    ks = ks.padStart(nl, '0');
  } else if (deltaLength < 0) {
    let temp = new Array(-deltaLength).fill(0);
    ns = [].concat(temp, ns);
  }

  console.log(ks, ns);
  let step = 0;
  result = [];
  for (let i = length - 1; i >= 0; i--) {
    let a = +ns[i];
    let b = +ks[i];
    let temp = a + b + step;
    step = 0;
    if (temp >= 10) {
      step = 1;
      temp = temp - 10;
    }
    result.unshift(temp);
  }
  if (step) {
    result.unshift(step);
  }
  return result;
};
