(function(window, angular, undefined) {
	'use strict';
	angular.module('app')
		.controller('NavbarCtrl', function($scope, $location) {
			$scope.menu = [
				{ title: 'Home', link: '/' }
			];

			$scope.isCollapsed = true;

			$scope.isActive = function(route) {
				return route === $location.path();
			};
		});
})(window, window.angular);