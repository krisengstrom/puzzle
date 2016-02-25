'use strict';
var controllers = angular.module('controllers', []);
var app = angular.module('PuzzleApp', ['controllers']);

//Local Storage wrapper service
app.factory('StorageService', function() {
	return {
		load: function() {
			var game = localStorage.getItem('saved_game');
			return (game) ? JSON.parse(game) : false;
		},
		save: function(moves, time, pieces) {
			localStorage.setItem('saved_game', JSON.stringify({
				moves: moves,
				time: time,
				pieces: pieces
			}));
		},
		unsave: function() {
			localStorage.removeItem('saved_game');
		}
	}
});

//Filter for converting seconds to minutes/seconds 
app.filter('timeFormat', ['$filter', function($filter) {
	return function(seconds) {
		var m, s;
		m = Math.floor(seconds / 60);
		s = seconds - m*60;
		return m + ' minutes, ' + s + ' seconds';
	};
}])
controllers.controller('MainController', ['$scope', '$interval', 'StorageService', function ($scope, $interval, StorageService) {
	
	$scope.moves = 0;
	$scope.timer = null;
	$scope.time = 0;
	$scope.pieces = [];
	$scope.map = [
		//CSS background position mapping
		{correctPosition: 0, bgPosition: 'left top'},
		{correctPosition: 1, bgPosition: 'center top'},
		{correctPosition: 2, bgPosition: 'right top'},
		{correctPosition: 3, bgPosition: 'left center'},
		{correctPosition: 4, bgPosition: 'center center'},
		{correctPosition: 5, bgPosition: 'right center'},
		{correctPosition: 6, bgPosition: 'left bottom'},
		{correctPosition: 7, bgPosition: 'center bottom'},
		{correctPosition: 8, bgPosition: 'right bottom'}
	];

	//Checks if all tiles are in the correct position
	$scope.isSolved = function() {
		var solved = true;
		angular.forEach($scope.pieces, function(item) {
			var position = angular.element('#'+item.element).attr('data-position');
			if (item.correctPosition != angular.element('#'+item.element).attr('data-position')) {
				solved = false;
			}
		});
		return solved;
	}

	//Start new game
	$scope.newGame = function() {
		StorageService.unsave();
		$scope.init();
	}

	//Initialize game
	$scope.init = function() {
		//Fetch game data from storage service
		var saved = StorageService.load();

		if (saved) {
			//Saved game
			$scope.pieces = saved.pieces;
			$scope.moves = saved.moves;
			$scope.time = saved.time;
			angular.forEach($scope.pieces, function(item) {
				item.order = item.currentPosition;
			});
		} else {
			//New game
			$scope.moves = 0;
			$scope.time = 0;
			$scope.pieces = [];
			angular.forEach($scope.map, function(item) {
				$scope.pieces.push({
					correctPosition: item.correctPosition,
					bgPosition: item.bgPosition,
					order: 0.5 - Math.random(),
					element: item.bgPosition.split(' ')[0][0]+item.bgPosition.split(' ')[1][0],
				});
			});

		}

		//jQuery UI sortable
		angular.element('#puzzle-board').sortable({
			//Callback after moving a tile
			stop: function(e, ui) {
				$scope.$apply(angular.element(this).scope().moves++);
				//Update pieces object with current position
				$('.piece').each(function() {
					var id = $(this).attr('id');
					var index = $(this).index();
					angular.forEach($scope.pieces,function(item) {
						if (item.element == id)
							item.currentPosition = index;
						$scope.$apply(item.currentPosition);
					});
				});
				
				//Save game state
				StorageService.save($scope.moves, $scope.time, $scope.pieces);
				if ($scope.isSolved()) {
					//Stop timer and delete saved game if solved
					$interval.cancel($scope.timer);
					StorageService.unsave();
				}
			}
		});

		//Game timer. Always starts on init
		$interval.cancel($scope.timer);
		$scope.timer = $interval(function() {
			$scope.time++;
			//Only save time if saved game exists (a move has been made)
			if (StorageService.load())
				StorageService.save($scope.moves, $scope.time, $scope.pieces);
		}, 1000);
	}

	$scope.init();

}]);