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
