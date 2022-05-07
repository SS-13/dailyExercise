type MyPartial<T> = {
  [K in keyof T]?: T[K];
};
// your code here, please don't use Partial<T>
