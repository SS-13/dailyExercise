var mySymbol = function (description) {
  // description 可选
  // 直接使用Symbol()创建新的symbol类型，并用一个可选的字符串作为其描述。
  let desc = `${description}` || '';
  // 带有 new 运算符的语法将抛出 TypeError 错误：
  if (this instanceof mySymbol) {
    throw new TypeError('mySymbol is not a constructor');
  }
  // Symbol("foo") 不会强制将字符串 “foo” 转换成symbol类型。它每次都会创建一个新的 symbol类型
  let newSymbol = Object.create(null);
  // Symbol.length 长度属性，值为0。
  newSymbol.length = 0;

  newSymbol.toString = function () {
    return `Symbol(${desc})`;
  };

  /*
      全局共享的 Symbol上面使用Symbol() 函数的语法，不会在你的整个代码库中创建一个可用的全局的symbol类型。
      要创建跨文件可用的symbol，甚至跨域（每个都有它自己的全局作用域） , 
      使用 Symbol.for() 方法和  Symbol.keyFor() 方法从全局的symbol注册表设置和取得symbol。
    */
  if (desc) {
    window.mySymbolMap = window.mySymbolMap || { [desc]: newSymbol };
  }
  newSymbol.for = function (desc) {
    return window.mySymbolMap[desc] || mySymbol();
  };
  newSymbol.keyFor = function (mySymbol = {}) {
    return mySymbol.desc || 'undefined';
  };

  /*
      迭代 symbols
      Symbol.iterator
      一个返回一个对象默认迭代器的方法。被 for...of 使用。
    */
  /*
      Symbol.asyncIterator 
      一个返回对象默认的异步迭代器的方法。被 for await of 使用。
    */
  /*
      Symbol.replace
      一个替换匹配字符串的子串的方法. 被 String.prototype.replace() 使用。
    */
  /*
      Symbol.search
      一个返回一个字符串中与正则表达式相匹配的索引的方法。被String.prototype.search() 使用。
    */
  /*
      Symbol.split
      一个在匹配正则表达式的索引处拆分一个字符串的方法.。被 String.prototype.split() 使用。
    */
  //   Object.defineProperties(newSymbol, {
  //     configurable: false,
  //     enumerable: false,
  //     writable: false,
  //     value: desc,
  //   });
  return newSymbol;
};
