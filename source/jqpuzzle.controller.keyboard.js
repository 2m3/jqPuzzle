KeyboardController = (function() {
	var arrowKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	$(document).on('keydown', function(e) {
		var direction = arrowKeys[e.keyCode];

		if (puzzle && direction) {
			puzzle.moveByDirection(direction);
			$('#board').text(puzzle.toString());
		}
	});
})();
