function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      // 递归拼接参数
      return function (...arg2) {
        return curried.apply(this, args.concat(arg2));
      };
    }
  };
}
