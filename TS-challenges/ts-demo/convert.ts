type ConvertFn<P, K> = (params: P) => P extends K ? P : new (args: P) => K;

const paramsConvert: ConvertFn<
  | [string, string][]
  | { [key: string]: string }
  | string
  | URLSearchParams
  | undefined,
  URLSearchParams
> = (params) => {
  if (params instanceof URLSearchParams) {
    return params;
  } else {
    return new URLSearchParams(params);
  }
};

const result1 = paramsConvert(
  new URLSearchParams('q=URLUtils.searchParams&topic=api')
);
const result2 = paramsConvert({ a: '1', b: '2', c: '3', d: '4' });
const result3 = paramsConvert('q=URLUtils.searchParams&topic=api');
