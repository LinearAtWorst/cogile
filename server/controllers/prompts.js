var _ = {};
_.identity = function(val) {
  return val;
};
//
_.first = function(array, n) {
  return n === undefined ? array[0] : array.slice(0, n);
};
_.last = function(array, n) {
  if (n === undefined) {
    return array[array.length - 1];
  } else if (n === 0) {
    return [];
  } else if (n > array.length) {
    return array;
  } else {
    return array.slice(-n);
  }

};
_.each = function(collection, iterator) {
  if (Array.isArray(collection) === true) {
    for (var i = 0; i < collection.length; i++) {
      iterator(collection[i], i, collection);
    }
  } else {
    for (var key in collection) {
      iterator(collection[key], key, collection);
    }
  }
};
_.indexOf = function(array, target) {
  var result = -1;

  _.each(array, function(item, index) {
    if (item === target && result === -1) {
      result = index;
    }
  });

  return result;
};
_.filter = function(collection, test) {
  var result = [];

  _.each(collection, function(value, index, collection) {
    if (test(value, index, collection) === true) {
      result.push(value);
    }
  });
  return result;
};
_.reject = function(collection, test) {
  return _.filter(collection, function(value, index, collection) {
    return !test(value, index, collection);
  });
};
_.uniq = function(array) {
  var results = [];
  _.each(array, function(val) {
    if (_.indexOf(results, val) === -1) {
      results.push(val);
    }
  });
  return results;
};

_.map = function(collection, iterator) {
  var results = [];
  _.each(collection, function(value, index, collection) {
    results.push(iterator(value, index, collection));
  });
  return _.identity(results);
};

_.pluck = function(collection, key) {
  return _.map(collection, function(item) {
    return item[key];
  });
};
_.reduce = function(collection, iterator, accumulator) {

  if (accumulator === undefined) {
    accumulator = collection[0];
    collection.shift();
  }

  _.each(collection, function(val, key, collection) {
    accumulator = iterator(accumulator, val);
  });

  return accumulator;

};
_.contains = function(collection, target) {
  return _.reduce(collection, function(wasFound, item) {
    if (wasFound) {
      return true;
    }
    return item === target;
  }, false);
};

_.every = function(collection, iterator) {
  iterator = iterator || _.identity;
  return _.reduce(collection, function(total, val) {
    if (total) {
      return !!iterator(val);
    } else {
      return false;
    }
  }, true);
};

_.some = function(collection, iterator) {
  iterator = iterator || _.identity;
  return !_.every(collection, function(val) {
    return !iterator(val);
  });
};

_.extend = function(obj) {
  _.each(arguments, function(val, index, collection) {
    _.each(val, function(val, key, collection) {
      obj[key] = val;

    });
  });
  return obj;
};
_.defaults = function(obj) {
  _.each(arguments, function(val, index, collection) {
    _.each(val, function(val, key, collection) {
      if (obj[key] === undefined) {
        obj[key] = val;
      }
    });
  });
  return obj;
};



_.once = function(func) {
  var alreadyCalled = false;
  var result;
  return function() {
    if (!alreadyCalled) {
      result = func.apply(this, arguments);
      alreadyCalled = true;
    }
    return result;
  };
};
_.memoize = function(func) {
  var results = {};

  return function() {
    if (!results[arguments[0]]) {
      results[arguments[0]] = func.apply(this, arguments);
    }
    return results[arguments[0]];
  };
};

var promptsArr = [];

for (var key in _) {
  promptsArr.push("var " + key + " = " + _[key].toString());
}

module.exports = promptsArr;