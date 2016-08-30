'use strict';
angular.module("app").controller('HeaderController', function ($injector, $scope, $mdSidenav) {

    var vm = this;

    vm.showSearch = false;

    //methods
    vm.toggleSidenav = toggleSidenav;

    /*
     array contendo  todos os menus do sidenav em forma de objetos
     criando assim os menus de navegação dinamicamente
     */
    vm.menus = [
        {
            name: 'Home',
            icon: 'home',
            url: '#home'
        },
        {
            name: 'Profile',
            icon: 'person',
            url: '#profile'
        },
        {
            name: 'Usuários',
            icon: 'group',
            url: '#usuarios'
        }
    ];

    /* 
     Abre o menu de navegação lateral quando o width for < 1200px
     */
    function toggleSidenav() {
        $mdSidenav('left').toggle();
    };

});