describe('PuzzleApp', function() {
	var $scope, $controller, MainController;

	beforeEach(module('PuzzleApp'));

	beforeEach(inject(function($injector) {
		$scope = $injector.get('$rootScope');
		$controller = $injector.get('$controller');
		MainController = $controller('MainController', {$scope: $scope});
	}));


	describe('initializing puzzle',function () {

		beforeEach(function() {
			$scope.init();
		});

		it('should be timing', function() {
			expect($scope.timer).not.toEqual(null);
		});

		it('should have nine pieces', function() {
			expect($scope.pieces.length).toEqual(9);
		});
	});

});