'use strict';

describe('Contoller: Navbar', function() {
	var scope, $location, NavbarCtrl;

	beforeEach(module('app'));

	beforeEach(inject(function($controller, $rootScope, _$location_) {
		$location = _$location_;
		scope = $rootScope.$new();
		NavbarCtrl = $controller('NavbarCtrl', {
			$scope: scope
		});
	}));

	it('should set isCollapsed', function(NavbarCtrl) {
		expect(scope.menu).toBeDefined();
		expect(scope.isCollapsed).toBe(true);
	});

	it('should set menu items', function(NavbarCtrl) {
		expect(scope.menu).toBeDefined();
		expect(scope.menu.length).toBe(1);
	});

	it('should check if a path is active', function(NavbarCtrl) {
		$location.path('/');
		expect($location.path()).toBe('/');
		expect(scope.isActive('/')).toBe(true);
		expect(scope.isActive('/fail')).toBe(false);
	});
	
});