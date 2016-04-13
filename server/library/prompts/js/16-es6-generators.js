let nums = {
  [Symbol.iterator]: function*() {
    let curr = 0;
    while (true) {
      yield curr++;
    }
  }
};
for (let n of nums) {
  if (n > 100) { break; }
  console.log(n);
}