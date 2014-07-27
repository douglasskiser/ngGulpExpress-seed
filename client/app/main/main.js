(function(window, angular, undefined) {
	'use strict';
	angular.module('app')
		.config(function($stateProvider) {
			$stateProvider
				.state('main', {
					url: '/',
					templateUrl: 'app/main/main.html',
					controller: 'MainCtrl'
				});
		});
})(window, window.angular);