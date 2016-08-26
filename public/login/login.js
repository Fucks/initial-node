'use strict';
angular.module('login', [
    'ngMaterial', 'ngMessages' , 'ui.router'
]).config( function ($mdThemingProvider, $mdIconProvider, $stateProvider, $urlRouterProvider) {
    // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
    $urlRouterProvider.otherwise('/');

    // Use $stateProvider to configure your states.
    $stateProvider.state('home', {
        url: "/",
        title: 'Bem vindo',
        templateUrl : "views/home.html",
        controller: 'LoginController',
        controllerAs: 'controller'
    }).state('register', {
        url : "/register",
        templateUrl : "views/register.html",
        controller: 'LoginController',
        controllerAs: 'controller'
    });
});
