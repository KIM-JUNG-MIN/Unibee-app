angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('unibee', {
    url: '/home',
    templateUrl: 'templates/unibee.html',
    controller: 'unibeeCtrl'
  })

  .state('dashboard', {
    url: '/main',
    templateUrl: 'templates/dashboard.html',
    controller: 'dashboardCtrl'
  })

  .state('bee', {
    url: '/bee',
    templateUrl: 'templates/bee.html',
    controller: 'beeCtrl'
  })

$urlRouterProvider.otherwise('/home')

  

});