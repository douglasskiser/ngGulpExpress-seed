'use strict';

describe('Service: featuresService', function() {
	var featuresService, $httpBackend;

	beforeEach(module('app'));

	beforeEach(inject(function(_featuresService_, _$httpBackend_) {
		featuresService = _featuresService_;
		$httpBackend = _$httpBackend_;
		$httpBackend.when('GET', '/api/features')
			.respond([
				{ name: 'AngularJS' },
				{ name: 'Bootstrap' },
				{ name: 'UI Bootstrap' },
				{ name: 'UI Router' },
				{ name: 'Karma' }
			]);
	}));

	it('should retrieve a list of features', function() {
		var result;
		$httpBackend.expectGET('/api/features');
		result = featuresService.query();
		$httpBackend.flush();
		expect(result.length).toBe(5);
		expect(result[0].name).toBe('AngularJS');
	});
});