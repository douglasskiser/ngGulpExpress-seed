'use strict';

describe("Controller: MainCtrl", function() {
	var scope, featuresService, MainCtrl;

	beforeEach(module('app'));

	beforeEach(inject(function($controller, $rootScope) {
		featuresService = {
			query: function() {}
		};

		spyOn(featuresService, 'query').andReturn('featuresServiceQuery');

		scope = $rootScope.$new();

		MainCtrl = $controller('MainCtrl', {
			$scope: scope,
			featuresService: featuresService
		});
	}));

	it('should be defined', function() {
		expect(MainCtrl).toBeDefined();
	});

	it('should have features scope variable', function() {
		expect(scope.features).toBeDefined();
	});

	it('should set features to query featuresService', function() {
		expect(scope.features).toBe('featuresServiceQuery');
	});
});
