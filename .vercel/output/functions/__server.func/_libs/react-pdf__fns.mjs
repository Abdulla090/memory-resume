const adjust = (index, fn, collection) => {
  if (index >= collection.length)
    return collection;
  if (Math.abs(index) > collection.length)
    return collection;
  const i = collection.length + index;
  return Object.assign([], collection, { [i]: fn(collection[i]) });
};
const asyncCompose = (...fns) => async (value, ...args) => {
  let result = value;
  for (let i = fns.length - 1; i >= 0; i -= 1) {
    result = await fns[i](result, ...args);
  }
  return result;
};
const capitalize = (value) => {
  if (!value)
    return value;
  return value.replace(/(^|\s)\S/g, (l) => l.toUpperCase());
};
const castArray = (value) => {
  return Array.isArray(value) ? value : [value];
};
const compose = (...fns) => (value, ...args) => {
  let result = value;
  for (let i = fns.length - 1; i >= 0; i -= 1) {
    result = fns[i](result, ...args);
  }
  return result;
};
function dropLast(value) {
  return value.slice(0, -1);
}
function evolve(transformations, object) {
  const result = /* @__PURE__ */ Object.create(null);
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      continue;
    }
    const transformation = transformations[key];
    if (typeof transformation === "function") {
      result[key] = transformation(object[key]);
    } else {
      result[key] = object[key];
    }
  }
  return result;
}
const isNil = (value) => value === null || value === void 0;
function last(value) {
  return value === "" ? "" : value[value.length - 1];
}
const mapValues = (object, fn) => {
  const result = {};
  const entries = Object.entries(object);
  for (let i = 0; i < entries.length; i += 1) {
    const [key, value] = entries[i];
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      continue;
    }
    result[key] = fn(value, key, i);
  }
  return result;
};
const PERCENT_REGEX = /(-?\d+\.?\d*)%/;
const matchPercent = (value) => {
  const match = PERCENT_REGEX.exec(`${value}`);
  if (match) {
    const numericValue = parseFloat(match[1]);
    const percent = numericValue / 100;
    return { percent, value: numericValue };
  }
  return null;
};
const omit = (keys, object) => {
  const _keys = castArray(keys);
  const copy = { ...object };
  for (let i = 0; i < _keys.length; i += 1) {
    delete copy[_keys[i]];
  }
  return copy;
};
const pick = (keys, object) => {
  const result = {};
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      continue;
    }
    if (key in object)
      result[key] = object[key];
  }
  return result;
};
const repeat = (element, length = 0) => {
  const result = new Array(length);
  for (let i = 0; i < length; i += 1) {
    result[i] = element;
  }
  return result;
};
const reverse = (array) => array.slice().reverse();
const upperFirst = (value) => {
  if (!value)
    return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};
const without = (exclude, array) => {
  const result = [];
  for (let i = 0; i < array.length; i += 1) {
    const value = array[i];
    if (!exclude.includes(value))
      result.push(value);
  }
  return result;
};
const parseFloat$1 = (value) => {
  return typeof value === "string" ? Number.parseFloat(value) : value;
};
export {
  castArray as a,
  adjust as b,
  compose as c,
  dropLast as d,
  reverse as e,
  asyncCompose as f,
  pick as g,
  evolve as h,
  isNil as i,
  capitalize as j,
  mapValues as k,
  last as l,
  matchPercent as m,
  omit as o,
  parseFloat$1 as p,
  repeat as r,
  upperFirst as u,
  without as w
};
