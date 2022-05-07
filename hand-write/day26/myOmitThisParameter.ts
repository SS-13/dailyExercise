// your code here, please don't use OmitThisParameter<T> in your code
type MyOmitThisParameter<T> = T extends (...args: infer A) => infer B
  ? (...args: A) => B
  : T;
