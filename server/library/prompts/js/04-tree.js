var Tree = function (value) {
  this.value = value;
  this.children = [];
};

var myTree = new Tree(1);
myTree.addChild(2);
myTree.addChild(3);