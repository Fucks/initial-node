'use strict';
angular.module("app").controller('ProfileController', function ($injector, $scope, $mdToast, userService) {

    $injector.invoke(AbstractController, this, {$scope: $scope});

    var vm = this;

    vm.authenticatedUser = {};

    $scope.init = function(state, params){
        userService.authenticated().then(function(res){
            if(res.status === 200){
                vm.authenticatedUser = res.data;
            }else{
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(res)
                        .position('bottom right')
                        .hideDelay(3000)
                );
            }
        })
    }
});