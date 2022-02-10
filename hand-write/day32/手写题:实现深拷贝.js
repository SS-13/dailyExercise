const VARIABLE_TYPE = {
  BOOL_TAG: "[object Boolean]",
  STRING_TAG: "[object String]",
  NUMBER_TAG: "[object Number]",
  NULL_TAG: "[object Null]",
  UNDEFINED_TAG: "[object Undefined]",
  SYMBOL_TAG: "[object Symbol]",
  OBJECT_TAG: "[object Object]",
  FUNCTION_TAG: "[object Function]",
  ARRAY_TAG: "[object Array]",
  ARGS_TAG: "[object Arguments]",
  MAP_TAG: "[object Map]",
  SET_TAG: "[object Set]",
  WEAK_MAP_TAG: "[object WeakMap]",
  DATE_TAG: "[object Date]",
  REGEXP_TAG: "[object RegExp]",
  GEN_TAG: "[object GeneratorFunction]",
  ERROR_TAG: "[object Error]",
  ARRAY_BUFFER_TAG: "[object ArrayBuffer]",
  DATA_VIEW_TAG: "[object DataView]",
  FLOAT_32_TAG: "[object Float32Array]",
  FLOAT_64_TAG: "[object Float64Array]",
  INT_8_TAG: "[object Int8Array]",
  INT_16_TAG: "[object Int16Array]",
  INT_32_TAG: "[object Int32Array]",
  UINT_8_TAG: "[object Uint8Array]",
  UINT_8_CLAMPED_TAG: "[object Uint8ClampedArray]",
  UINT_16_TAG: "[object Uint16Array]",
  UINT_32_TAG: "[object Uint32Array]",
};

function isBaseType(val) {
  const type = Object.prototype.toString.call(val);
  return (
    type === VARIABLE_TYPE.BOOL_TAG ||
    type === VARIABLE_TYPE.STRING_TAG ||
    type === VARIABLE_TYPE.NUMBER_TAG ||
    type === VARIABLE_TYPE.NULL_TAG ||
    type === VARIABLE_TYPE.UNDEFINED_TAG ||
    type === VARIABLE_TYPE.SYMBOL_TAG
  );
}

function isObject(val) {
  const type = Object.prototype.toString.call(val);
  return type === VARIABLE_TYPE.OBJECT_TAG;
}

function isArray(val) {
  const type = Object.prototype.toString.call(val);
  return type === VARIABLE_TYPE.ARRAY_TAG;
}

function isSet(val) {
  const type = Object.prototype.toString.call(val);
  return type === VARIABLE_TYPE.SET_TAG;
}

function isMap(val) {
  const type = Object.prototype.toString.call(val);
  return type === VARIABLE_TYPE.MAP_TAG;
}

function isRegExp(val) {
  const type = Object.prototype.toString.call(val);
  return type === VARIABLE_TYPE.REGEXP_TAG;
}

function deepClone(val, map = new Map()) {
  if (isBaseType(val)) {
    return val;
  }

  if (map.has(val)) {
    return map.get(val);
  }
  

  if (isObject(val)) {
    const keys = Object.keys(val);
    const cloneObj = {};
    for (let i = 0; i < keys.length; i++) {
      cloneObj[keys[i]] = deepClone(val[keys[i]]);
    }
    return cloneObj;
  }

  if (isArray(val)) {
    const cloneArray = [];
    for (let i = 0; i < val.length; i++) {
      cloneArray[i] = deepClone(val[i]);
    }
  }

  if (isSet(val)) {
    const set = new Set();
    val.forEach((item) => {
      set.add(deepClone(item));
    });
  }

  if (isMap(val)) {
    const map = new Map();
    val.forEach((k, v) => {
      map.set(k, deepClone(v));
    });
  }

  if (isRegExp(val)) {
    const reFlags = /\w*$/;
    const Ctor = val.constructor;
    const reg = new Ctor(val.source, reFlags.exec(val));
    reg.lastIndex = val.lastIndex;
    return reg;
  }
}
