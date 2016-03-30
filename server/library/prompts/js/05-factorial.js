function factorialRecursive(n) {
  if (n === 1) {
    return 1;
  } else {
    return n * factorialRecursive(n - 1);
  }
}

answer = factorialRecursive(5);
console.log("Recursion Answer: " + answer);