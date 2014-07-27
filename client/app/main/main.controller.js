(function(window, angular, undefined) {
    'use strict';
    angular.module('app')
        .controller('MainCtrl', function($scope, $http, featuresService) {
            $scope.features = featuresService.query();
        });
})(window, window.angular);
