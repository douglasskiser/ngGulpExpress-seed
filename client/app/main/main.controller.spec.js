'use strict';

describe("Controller: MainCtrl", function() {
	var scope, $httpBackend, MainCtrl;

	beforeEach(module('app'));

	beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
		$httpBackend = _$httpBackend_;
		$httpBackend.when('GET', '/api/features')
			.respond([
				{ name: 'AngularJS' },
				{ name: 'Bootstrap' },
				{ name: 'UI Bootstrap' },
				{ name: 'UI Router' },
				{ name: 'Karma' }
			]);

		scope = $rootScope.$new();
		MainCtrl = $controller('MainCtrl', {
			$scope: scope
		});
	}));

	it('should attach a list of features to the scope', function() {
		$httpBackend.expectGET('/api/features');
		$httpBackend.flush();
		expect(scope.features.length).toBe(5);
		expect(scope.features[0].name).toBe('AngularJS');
	});
});
