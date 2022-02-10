/*
如果不想让别人对obj对象进行添加/删除属性操作
四种方式处理
1. defineProperty, defineProperties
2. Object.seal
3. Object.freeze
4. Proxy
 */

// 1. defineProperty, defineProperties
const obj = { name: "yideng", age: 31 };
Object.defineProperty(obj, "name", {
  writable: false,
  configurable: false,
  //   enumerable: false,
  //   value: "",
});
Object.defineProperties(obj, {
  age: {
    writable: false,
    configurable: false,
  },
});

obj.name = "new name";
console.log(obj.name); // yideng
obj.age = 13;
console.log(obj.age); // 31

obj.address = "Shanghai";
console.log(obj.address); // Shanghai

// 2. Object.seal 封闭一个对象，阻止添加新属性，把现有属性标记为不可配置，当前属性只要是可写的就可以改变
const obj2 = { name: "John" };
Object.seal(obj2);
obj2.name = "Tom";
console.log(obj2); // Tom

// 3. Object.freeze 冻结一个对象, futher more seal, can not update
const obj3 = { name: "John" };
Object.freeze(obj3);
obj3.name = "Tom";
console.log(obj3); // John

// 4. Proxy
const target = {
  a: "我是不能删除的",
  b: "我是不能修改的",
  c: "也不能添加，只有3个元素",
};

const lockTarget = new Proxy(target, {
  set(target, property, value) {
    console.log("拦截修改新增操作", target, property, value);
    return false;
  },
  deleteProperty(target, property) {
    console.log("拦截删除操作", target, property);
    return false;
  },
  defineProperty(target, property, descriptor) {
    console.log("defineProerty", target, property, descriptor);
    return false;
  },
});

lockTarget.name = "FFFFFF";
console.log(lockTarget.name); // undefined

delete lockTarget.a;
console.log(lockTarget.a); // 删不掉
