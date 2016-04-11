let evens = Array(50).fill().map((x, i) => 2 * i);
let odds = evens.map(n => n + 1);
let nums = evens.reduce((prev, curr, i) =>
  prev.concat(curr, odds[i]), []);
console.log(nums);