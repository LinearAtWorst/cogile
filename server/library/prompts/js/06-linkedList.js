var Node = function(value) {
  this.value = value;
  this.next = undefined;
};

var LinkedList = function(initialValue) {
  var firstNode = new Node(initialValue);

  this.head = firstNode;
  this.tail = firstNode;
};