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
app.filter('timeFormat', function($filter) {
	return function(seconds) {
		var m, s;
		m = Math.floor(seconds / 60);
		s = seconds - m*60;
		return m + ' minutes, ' + s + ' seconds';
	};
})