function mapKeysToLower(obj) {
  var ret;
  if (Array.isArray(obj)) {
    //Array of Objects
    ret = [];
    for (var el of obj) {
      ret.push(
        Object.keys(el).reduce((c, k) => ((c[k.toLowerCase()] = el[k]), c), {})
      );
    }
  } else {
    ret = Object.keys(obj).reduce(
      (c, k) => ((c[k.toLowerCase()] = obj[k]), c),
      {}
    );
  }
  return ret;
}

export const util = {
  mapKeysToLower
};
