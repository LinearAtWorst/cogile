var Person = function (firstName) {
  this.firstName = firstName;
};

var person1 = new Person('Alice');
var person2 = new Person('Bob');

console.log('person1 is ' + person1.firstName);
console.log('person2 is ' + person2.firstName);