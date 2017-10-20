/*Object操作扩展*/
export const getByKey = function (obj, key) {
  let val = {};
  Object.defineProperty(val, key, {
    value: obj[key],
    configurable: true,
    enumerable: true,
    writable: true,
  });
  return val;
};
export const getUrlSearch = function (obj, key) {
  let str = '?';
  str+=key+'='+obj[key];
  return str;
};
