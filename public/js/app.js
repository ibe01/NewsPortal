var app = angular.module('mym', ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html'
  })
  .when('/desc', {
    templateUrl: 'views/fulldesc.html'
  })
  .when('/post', {
    templateUrl: 'views/post.html'
  })
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode({
    enabled : true,
    requireBase : false
  });
});
app.controller('myc', function($scope, $http, $location) {
  console.log('ok na..');
  var refresh = function() {
  $http.get('news').then(function(data) {
    $scope.menu = data.data;
    $scope.main = [];
    var i = $scope.menu.length-1;
    while(i >= 0){
      $scope.main.push($scope.menu[i]);
      i--;
    }
    console.log($scope.menu[1].header);
    });
    }
    refresh();
    $scope.go = function(a, b, c) {
      $scope.a = a;
      $scope.b = b;
      $scope.c = c;
      $location.path('/desc');
    }

    $scope.post = function(x) {
      $http.post('post', x);
      $location.path('/');
      refresh();
    }

});
