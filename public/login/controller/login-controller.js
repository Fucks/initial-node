'use strict';
angular.module("login").controller('LoginController', function ($injector, $scope, $location, $mdToast) {

    var vm = this;

    vm.isError = $location.$$absUrl.indexOf('failure') > 0;

    vm.showError = function(){
        if(vm.isError)
            $mdToast.show(
                $mdToast.simple()
                .textContent('Credênciais inválidas!')
                .position('bottom right')
                .hideDelay(3000)
            );
    }
    
    vm.showError();
});