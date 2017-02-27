(function(){
  angular
    .module('myApp')
    .config(configuration)
    .controller('tabCtrl' , tabCtrl);

    function configuration($stateProvider, $urlRouterProvider){ //stateProvider
      $stateProvider
        .state('user',{
          url: '/user',
          templateUrl: 'components/users/users.view.html',
          controller: 'userController',
          controllerAs: 'userCtrl'
        })
        .state('pets',{
          url: '/pets',
          templateUrl: 'components/pets/pets.view.html',
          controller: 'petsController',
          controllerAs: 'petsCtrl'
        })
        .state('user.view1',{
          templateUrl: 'components/users/view1/view1.view.html'
        })
        .state('user.view2',{
          templateUrl: 'components/users/view2/view2.view.html'
        })//.state(...) para más;

        $urlRouterProvider.otherwise('/user');
    }
    function tabCtrl($scope, $location, $log) {
        $scope.selectedIndex = 0;

        $scope.$watch('selectedIndex', function(current, old) {
            switch (current) {
                case 0:
                    $location.url("/user");
                    break;
                case 1:
                    $location.url("/pets");
                    break;
                case 2:
                    $location.url("/view3");
                    break;
            }
        });
    }

})();
