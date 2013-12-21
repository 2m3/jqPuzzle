var keyboardController = (function() {
	var _puzzle;

	// key map
	var arrowKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	// bind keyy events on document
	$(document).on('keydown', function(e) {
		// lookup direction
		var direction = arrowKeys[e.keyCode];

		// move by direction
		if (_puzzle && direction) {
			_puzzle.moveByDirection(direction);
		}
	});

	function init(puzzle) {
		_puzzle = puzzle;
	}

	return {
		init: init
	};
})();
