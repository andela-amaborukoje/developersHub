var yearbookAPP = angular.module('yearbookAPP');
var urlBase =  'https://developershubapi.herokuapp.com/yearBook/';

yearbookAPP.controller('homeCtrl', function ($scope, $http){
 console.log("HOME CONTROLLER");

});

yearbookAPP.controller('reposCtrl', function ($scope, $http){
    $http.get(urlBase).success(function(data){
       $scope.lists = data;
        // $localStorage.memberData = $scope.lists;
        console.log($scope.lists);
      });
});

yearbookAPP.controller('formController', function ($scope, $http, $location){
 $scope.submit = function (newUser) {
      $http({
          method: 'POST',
          url: urlBase,
          data : $.param(newUser),
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}

      }).success(function(){
          console.log(newUser)
          $scope.report="Created Successfully click the repo to view";
          console.log("got here");
      }).error(function (err){
        $scope.report ="Error Processing your Form";
      });
    } 
});

yearbookAPP.controller('memberCtrl', function ($scope, $http, $routeParams, $location){
  var query = $routeParams.username;
  console.log(urlBase+query);
  var url = urlBase+query;
  $http.get(url).success(function(data, status){
    if (status !== 200 || data.status === 404){
         $location.path('/home');
        // console.log(status, data.status)
    }else{
        console.log(status);
        $scope.member = data;
        console.log($scope.member);
     }
  });
});

yearbookAPP.controller('loginCtrl', function($scope, $http, $routeParams, $location){
  $scope.submit = function (){
    $http({
      method: 'POST',
      url: urlBase,
      data: $.param ({
        username: $scope.username,
        password: $scope.password
        }),
      header: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(user){
      $location.url('/edit')
    }).error(function(){
      $scope.report = "USERNAME OR PASSWORD INCORRECT";
    });
  }
});
