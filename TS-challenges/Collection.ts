// expected to be a string
type HelloWorld = string;

// Implement the built-in `Pick<T, K>` generic without using it.
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Implement the built-in `Readonly<T>` generic without using it.
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Give an array, transform into an object type and the key/value must in the given array.
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P;
};

// Implement a generic `First<T>` that takes an Array `T` and returns it's first element's type.
type First<T extends any[]> = T extends never[] ? never : T[0];

// For given a tuple, you need create a generic `Length`, pick the length of the tuple
type Length<T extends readonly any[]> = T["length"];

// Implement the built-in Exclude<T, U>
type MyExclude<T, U> = T extends U ? never : T;

// If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type? For example if we have `Promise<ExampleType>` how to get ExampleType?
type Awaited<T extends Promise<any>> = T extends Promise<infer K> ? K : T;

// Implement a utils `If` which accepts condition `C`, a truthy return type `T`, and a falsy return type `F`. `C` is expected to be either `true` or `false` while `T` and `F` can be any type.
type If<C extends boolean, T, F> = C extends true ? T : F;

// Implement the JavaScript `Array.concat` function in the type system. A type takes the two arguments. The output should be a new array that includes inputs in ltr order
type Concat<T extends any[], U extends any[]> = [...T, ...U];

// Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments. The output should be a boolean `true` or `false`.
type Includes<T extends readonly any[], U> = T extends [infer F, ...infer R]
  ? (<Q>() => Q extends F ? 1 : 2) extends <Q>() => Q extends U ? 1 : 2
    ? true
    : Includes<R, U>
  : false;

type Equal1<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type Equal2<X, Y> = X extends Y ? true : false;
type a = Equal1<true, boolean>; // false
type b = Equal2<true, boolean>; // true
type c = true extends boolean ? true : false; // true

// Implement the generic version of `Array.push`
type Push<T extends any[], U> = [...T, U];

// Implement the type version of `Array.unshift`
type Unshift<T extends any[], U> = [U, ...T];

// Implement the built-in Parameters<T> generic without using it.
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

// Implement the built-in `ReturnType<T>` generic without using it.
type MyReturnType<T extends (...arg: any[]) => any> = T extends (
  ...arg: any[]
) => infer P
  ? P
  : never;

// Implement the built-in `Omit<T, K>` generic without using it.
type MyOmit<T extends object, K extends keyof T> = {
  [P in keyof T extends infer R
    ? R extends keyof T
      ? R extends K
        ? never
        : R
      : never
    : never]: T[P];
};

// Implement a generic `MyReadonly2<T, K>` which takes two type argument `T` and `K`.
type MyReadonly2<T extends object, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P];
} & Omit<T, K>;

// Implement a generic `DeepReadonly<T>` which make every parameter of an object - and its sub-objects recursively - readonly.
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends
    | number
    | string
    | boolean
    | ((...arg: any[]) => any)
    ? T[P]
    : DeepReadonly<T[P]>;
};

// Implement a generic `TupleToUnion<T>` which covers the values of a tuple to its values union.
type TupleToUnion<T extends any[]> = T[number];

// In this challenge, you need to type an object or a class - whatever you like - to provide two function `option(key, value)` and `get()`. In `option`, you can extend the current config type by the given key and value. We should about to access the final result via `get`.
type Chainable<T = {}> = {
  option<K extends string, V extends any>(
    key: K,
    value: V
  ): Chainable<T & { [key in K]: V }>;
  get(): T;
};

// Implement a generic `Last<T>` that takes an Array `T` and returns its last element.
type Last<T extends any[]> = T extends [...infer R, infer V] ? V : never;

// Implement a generic `Pop<T>` that takes an Array `T` and returns an Array without it's last element.
type Pop<T extends any[]> = T extends [...infer R, infer P] ? R : never;

//  Type the function `PromiseAll` that accepts an array of PromiseLike objects, the returning value should be `Promise<T>` where `T` is the resolved result array.
declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<{
  [key in keyof T]: T[key] extends PromiseLike<infer V> ? V : T[key];
}>;
