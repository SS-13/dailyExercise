/*
  108 - Trim
  -------
  by Anthony Fu (@antfu) #medium #template-literal
  
  ### Question
  
  Implement `Trim<T>` which takes an exact string type and returns a new string with the whitespace from both ends removed.
  
  For example
  
  ```ts
  type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
  ```
  
  > View on GitHub: https://tsch.js.org/108
*/

/* _____________ Your Code Here _____________ */
type Space = " " | "\n" | "\t";
type NoSpace<Str extends string> = Str extends `${string}${Space}`
  ? false
  : Str extends `${Space}${string}`
  ? false
  : true;
type TrimLeft<Str extends string> = Str extends `${Space}${infer Res}`
  ? TrimLeft<Res>
  : Str;
type TrimRight<Str extends string> = Str extends `${infer Res}${Space}`
  ? TrimRight<Res>
  : Str;

type Trim<S extends string> = NoSpace<S> extends true
  ? S
  : TrimLeft<TrimRight<S>>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/108/answer
  > View solutions: https://tsch.js.org/108/solutions
  > More Challenges: https://tsch.js.org
*/
