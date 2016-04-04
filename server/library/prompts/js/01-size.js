_.size = function(obj) {
  if (obj == null) return 0;
  return isArrayLike(obj) ? obj.length : _.keys(obj).length;
};