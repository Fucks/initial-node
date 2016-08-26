'use strict';
angular.module("app").controller('HeaderController', function ($injector, $scope, $mdSidenav) {

    var vm = this;

    vm.showSearch = false;

    //methods
    vm.toggleSidenav = toggleSidenav;

    /* 
        Abre o menu de navegação lateral quando o width for < 1200px
    */
    function toggleSidenav(){
        $mdSidenav('left').toggle();  
    };
});