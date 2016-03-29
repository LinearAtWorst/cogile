export function combineReducers(reducers) {
  var finalReducers = pick(reducers, (val) => typeof val === 'function');
  return (state = {}, action) => mapValues(finalReducers,
    (reducer, key) => reducer(state[key], action)
  );
}