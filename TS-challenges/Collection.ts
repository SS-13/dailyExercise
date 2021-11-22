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

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type Equal2<X, Y> = X extends Y ? true : false;
type a = Equal<true, boolean>; // false
type b = Equal2<true, boolean>; // true