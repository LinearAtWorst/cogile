var myApp = angular.module('myApp',[]);

myApp.controller('Greet', ['$scope', function($scope) {
  $scope.greeting = 'Hola!';
}]);