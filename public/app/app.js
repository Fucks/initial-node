angular
    .module('app', ['ngMaterial',  'ui.router', 'ngMessages'])
    .config(function($mdThemingProvider, $mdIconProvider, $stateProvider, $urlRouterProvider, $httpProvider){

    var customBlueMap = 		$mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
        'default': '500',
        'hue-1': '50'
    })
        .accentPalette('pink');
    $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey');

    // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
    $urlRouterProvider.otherwise('/');

    // Use $stateProvider to configure your states.
    $stateProvider.state('home', {
        url: "/",
        templateUrl: "views/home.html",
        title: 'Bem vindo'
        //        controller: 'HomeController',
        //        controllerAs: 'controller'
    }).state('profile', {
        url: "/profile",
        templateUrl: "views/profile.html",
        title: 'Perfil pessoal'
    });

    $stateProvider.state('usuarios', {
        url: "/usuarios",
        templateUrl: "views/users/form.html",
        controller: 'UserController',
        controllerAs: 'controller'
    });
});

/**
 * Controller básico para chamar as devidas controller em uma mudança de estado.
**/
function AbstractController($rootScope, $scope, $state, $stateParams, $location) {

    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.title = toState.title;
        $rootScope.navigation = toState.navigation;

        $scope.init(toState, toParams);
    });
};
