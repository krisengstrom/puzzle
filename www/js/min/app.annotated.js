var controllers = angular.module('controllers', []);
var app = angular.module('PuzzleApp', ['controllers']);
controllers.controller('MainController', ['$scope', function ($scope) {
	
	$scope.solved = false;
	$scope.moves = 0;
	$scope.pieces = [];
	$scope.buttonTitle = 'Start game';
	$scope.map = [
		{
			correctPosition: 0,
			bgPosition: 'left top'
		},
		{
			correctPosition: 1,
			bgPosition: 'center top'
		},
		{
			correctPosition: 2,
			bgPosition: 'right top'
		},
		{
			correctPosition: 3,
			bgPosition: 'left center'
		},
		{
			correctPosition: 4,
			bgPosition: 'center center'
		},
		{
			correctPosition: 5,
			bgPosition: 'right center'
		},
		{
			correctPosition: 6,
			bgPosition: 'left bottom'
		},
		{
			correctPosition: 7,
			bgPosition: 'center bottom'
		},
		{
			correctPosition: 8,
			bgPosition: 'right bottom'
		}
	];

	$scope.random = function() {
		return 0.5 - Math.random();
	};

	$('#puzzle-board').sortable({
		change: function() {
			
		},
		stop: function(e, ui) {
			$scope.moves++;
			console.log($scope.moves);
			$('.piece').each(function() {
				$(this).attr('data-position', $(this).index());
			});
		}
	});

	$scope.init = function() {
		$scope.buttonTitle = 'Start over';
		$scope.pieces = [];
		$scope.moves = 0;
		angular.forEach($scope.map, function(item) {
			$scope.pieces.push({
				correctPosition: item.correctPosition,
				bgPosition: item.bgPosition,
				order: 0.5 - Math.random()
			});
		});
	}

	$scope.init();

}]);