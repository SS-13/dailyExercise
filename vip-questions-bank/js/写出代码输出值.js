const str1 = "abc"; // 基本类型
const str2 = new String("abc"); // 表示类型引用，新建对象
console.log(str1 == str2); // true
console.log(str1 === str2); // false
console.log(str1.substr()); // abc
console.log(str2.substr()); // abc

/*
true
false
abc
abc
*/

typeof str1 === "string";
typeof str2 === "object";

str1 instanceof String; // false
str2 instanceof String; // true
