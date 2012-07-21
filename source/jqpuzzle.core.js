function SliderPuzzle(options) {
	if (options) {
		// handle rows and columns option
		var dimensions = ['rows', 'columns'];
		for (var i in dimensions) {
			var dimension = dimensions[i];

			// include any falsy value includung 0
			if (options[dimension] !== undefined) {
				options[dimension] = parseInt(options[dimension], 10);
				if (isNaN(options[dimension]) || options[dimension] < 2) {
					throw 'invalid ' + dimension + ' value';
				}
			}
		}

		// handle board option
		if (options.board) {
			var INVALID_BOARD  = 'invalid board';
			var BOARD_MISMATCH = 'board does not match rows or columns';
			var length = options.board.length;

			if (!$.isArray(options.board) || length === 0) {
				throw INVALID_BOARD;
			}

			// either rows or columns or both are set
			if (options.rows || options.columns) {
				if (!options.rows) {
					options.rows = Math.floor(length / options.columns);
				}

				if (!options.columns) {
					options.columns = Math.floor(length / options.rows);
				}

				if (options.rows == 1 || options.columns == 1 || options.rows * options.columns != length) {
					throw BOARD_MISMATCH;
				}
			}
			// neither rows or columns are set
			else {
				// assume both rows and columns to have the same value
				var root = Math.sqrt(length);

				// root is not an integer
				if (Math.floor(root) != root) {
					throw BOARD_MISMATCH;
				}

				options.rows = options.columns = root;
			}

			// create sorted board
			var sortedBoard = options.board.slice(0).sort(function (a, b) {
				return a - b;
			});

			// validate board integrity
			for (i = 0; i < sortedBoard.length; i++) {
				if (sortedBoard[i] !== i) {
					throw INVALID_BOARD;
				}
			}
		}
	}

	// merge passed in options with global config (options wins)
	this.options = $.extend({}, this.config, options);

	// shortcuts
	this.rows = this.options.rows;
	this.columns = this.options.columns;

	// the actual board (keep a copy of the intial board to be able to restart)
	this.board = this.options.board && this.options.board.slice(0) || this.shuffle();

	// default renderer (used by toString)
	this.renderer = typeof AsciiRenderer == 'undefined' ? { render: function() {} } : AsciiRenderer;
}

SliderPuzzle.prototype = {
	config: {
		// number of rows
		rows: 4,
		// number of columns
		columns: 4,
		// position of the hole
		hole: 15 // bottom right
	},

	DIRECTIONS: {
		UP: 'up',
		DOWN: 'down',
		LEFT: 'left',
		RIGHT: 'right'
	},

	EXCEPTIONS: {
		INVALID_BOARD:	'board does not contain required pieces'
	},

	solved: false,
	solvable: true,

	// convert a two-dimensional row-column index into a one-dimensional index
	to1dPosition : function(position2d) {
		var normalizedPosition = this.normalizePosition(position2d);
		return normalizedPosition.row * this.columns + normalizedPosition.column;
	},

	// convert a one-dimensional index into a two-dimensional row-column index
	to2dPosition: function(position1d) {
		var column = position1d % this.columns;
		return {
			row: Math.floor((position1d - column) / this.columns),
			column: column
		};
	},

	// handle row and column passed in as object, array, or seperate arguments,
	// or just a one-dimensional index
	normalizePosition: function(row, column) {
		if ($.isPlainObject(row)) {
			return row;
		} else if ($.isArray(row)) {
			return {
				row: row[0],
				column: row[1]
			};
		} else if (column === undefined) {
			return this.to2dPosition(row);
		} else {
			return {
				row: row,
				column: column
			};
		}
	},

	// TODO should not return -1 and null
	getPosition: function(numberOrDirection) {
		if ($.inArray(numberOrDirection) == -1) {
			return $.inArray(numberOrDirection, this.board);
		}	else {
			return this.getPosition1dByDirection(numberOrDirection);
		}
	},

	getPosition1dByDirection: function(direction) {
	},

	canMove: function(numberOrDirection) {
		return this.canMoveByPosition(this.getPosition(numberOrDirection));
	},

	move: function(numberOrDirection) {
		return this.moveByPosition(this.getPosition(numberOrDirection));
	},

	canMoveByPosition: function(row, column) {
		var position = this.normalizePosition(row, column);
	},

	moveByPosition: function(row, column) {
		var position = this.normalizePosition(row, column);
	},

	shuffle: function() {
	},

	isSolvable: function() {
		return this.solvable;
	},

	isSolved: function() {
		return this.solved;
	},

	pause: function(pauseTimer) {
	},

	proceed: function() {
	},

	restart: function() {
	},

	toString: function() {
		return this.renderer.render(this.board, this.rows, this.columns);
	}
};
