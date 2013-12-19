KeyboardController = (function() {
	var arrowKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	$(document).on('keydown', function(e) {
		var direction = arrowKeys[e.keyCode];
		var move;

		if ($puzzle && puzzle && direction) {
			move = puzzle.moveByDirection(direction);
			if (move) {
				$puzzle.trigger('moved', move);
			}
		}
	});
})();
