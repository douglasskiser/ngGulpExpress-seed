(function(window, angular, undefined) {
	'use strict';
	angular.module('app')
		.service('featuresService', function($resource) {
			return $resource('/api/features');
		});
})(window, window.angular);