(function(window, angular, undefined){
	'use strict';

	angular.module('app', [
		'ngResource',
		'ui.router',
		'ui.bootstrap',
		'templates'
	])
	.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
	});
	
})(window, window.angular);