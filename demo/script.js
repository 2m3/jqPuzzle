// config module
var config = (function() {
	var _puzzle;
	var $config = $('.config');

	$config.on('submit', function(e) {
		var solvable;
		var shuffle;
		var options;

		// don't submit the form
		e.preventDefault();

		// blur so that keyboard controller does not also change focussed form elements
		$config.find('button').focus().blur();

		// handle solvable value
		solvable = $('input[name=solvable]:checked').val();
		if (solvable != 'random') solvable = !!parseInt(solvable, 10);

		// handle shuffle value
		shuffle = $('input[name=shuffle]:checked').val();
		shuffle = (shuffle == 'movesAway') ? $('input[name=movesAway]').val() : !!parseInt(shuffle, 10);

		// create options hash
		options = {
			rows: $('input[name=rows]').val() || undefined,
			cols: $('input[name=cols]').val() || undefined,
			hole: $('input[name=hole]').val() || undefined,
			initialHole: $('input[name=initialHole]').val() || undefined,
			solvable: solvable,
			shuffle: shuffle
		};

		try {
			// init puzzle
			_puzzle = new SliderPuzzle(options);

			// init board
			board.init(_puzzle);

			// init controls
			controls.init(_puzzle);

			// init keyboard controller
			keyboardController.init(_puzzle);

			// init logger
			logger.init(_puzzle);
		} catch (ex) {
			alert(ex);
		}
	});
})();


// board module
var board = (function() {
	var _puzzle;
	var $board = $('#board');

	function init(puzzle) {
		_puzzle = puzzle;

		// bind events
		_puzzle.on('move', updateBoard);
		_puzzle.on('undo', updateBoard);
		_puzzle.on('redo', updateBoard);
		_puzzle.on('reset', updateBoard);

		// display initial board
		updateBoard();
	}

	function updateBoard() {
		$board.text(_puzzle.toString());
	}

	return {
		init: init
	};
})();


// controls module
var controls = (function() {
	var _puzzle;
	var $controls = $('.controls');
	var $directions = $controls.find('.directions');
	var $actions = $controls.find('.actions');
	var isInit = false;

	function init(puzzle) {
		_puzzle = puzzle;

		if (!isInit) {
			// bind keyboard events
			keyboardController.on('key', handleKey);

			// bind direction buttons
			$directions.on('click', 'button', function() {
				var direction = this.name.toLowerCase();

				highlightButton($(this));

				if (direction === 'random') {
					_puzzle.moveRandomly();
				} else {
					_puzzle.moveByDirection(direction);
				}
			});

			// bind action buttons
			$actions.on('click', 'button', function() {
				highlightButton($(this));
				_puzzle[this.name]();
			});

			isInit = true;
		}
	}

	function handleKey(event, data) {
		highlightButton($directions.find('[name=' + data.action + ']'));
	}

	function highlightButton($button) {
		var activeClass = 'active';

		$button.addClass(activeClass).focus();

		window.setTimeout(function() {
			$button.removeClass(activeClass);
		}, 100);
	}

	return {
		init: init
	};
})();


// logger module
var logger = (function() {
	var _puzzle;
	var $logger = $('.logger');

	function init(puzzle) {
		_puzzle = puzzle;

		// reset log
		reset();

		// bind events
		_puzzle.on('move', logMove);
		_puzzle.on('undo', logUndo);
		_puzzle.on('redo', logRedo);
		_puzzle.on('reset', reset);
	}

	function reset() {
		// clear log
		$logger.empty();
	}

	function logMove(event, move) {
		// calculate padding lengths
		var rowPad = ("" + _puzzle.options.rows).length;
		var colPad = ("" + _puzzle.options.cols).length;
		var numPad = ("" + _puzzle.options.rows * _puzzle.options.cols).length;

		// remove all undo moves
		$logger.find('.undo').remove();

		// log move
		$logger.prepend($("<li>" +
			pad(move.index, 3) + ": Piece " +
			pad(move.number, numPad) + " was moved " +
			pad(move.direction, 5, true) + " from [" +
			pad(move.from.row, rowPad) + "," +
			pad(move.from.col, colPad) + "] to [" +
			pad(move.to.row, rowPad) + "," +
			pad(move.to.col, colPad) + "]</li>").hide().fadeIn());
	}

	function logUndo(event, move) {
		$logger.find('li:not(.undo):first').addClass('undo');
	}

	function logRedo(event, move) {
		$logger.find('li.undo:last').removeClass('undo');
	}

	function pad(string, length, right) {
		string = '' + string;

		while (string.length < length) {
			string = right ? string + ' ' : ' ' + string;
		}

		return string;
	}

	return {
		init: init
	};
})();
