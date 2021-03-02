function cloneObj(obj) {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    return new Date(obj);
  } else if (Array.isArray(obj)) {
    let clone = [];
  } else {
    let clone = {};
  }

  Object.getOwnPropertyNames(obj).forEach(prop => {
    if (typeof obj[prop] === 'object') {
      clone[prop] = cloneObj(obj[prop]);
    } else {
      clone[prop] = obj[prop];
    }
  });

  return clone;
}