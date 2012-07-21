function SliderPuzzle(options) {
	if (options) {
		// handle board option
		if (options.board) {
			// both rows and columns is set
			if (options.rows && options.columns) {
				if (options.rows * options.columns != options.board.length) {
					throw this.EXCEPTIONS.BOARD_MISMATCH;
				}
			}
			// only rows is set
			else if (options.rows) {
				options.columns = Math.floor(options.board.length / options.rows);
				if (options.columns == 1 || options.columns * options.rows != options.board.length) {
					throw this.EXCEPTIONS.BOARD_MISMATCH;
				}
			}
			// only columns is set
			else if (options.columns) {
				options.rows = Math.floor(options.board.length / options.columns);
				if (options.rows == 1 || options.rows * options.columns != options.board.length) {
					throw this.EXCEPTIONS.BOARD_MISMATCH;
				}
			}
			// neither rows or columns are set
			else {
				// assume both rows and columns to have the same value
				var root = Math.sqrt(options.board.length);

				// root is not an integer
				if (Math.floor(root) != root) {
					throw this.EXCEPTIONS.BOARD_MISMATCH;
				}

				options.rows = options.columns = root;
			}

			// create sorted board
			var sortedBoard = options.board.slice(0).sort(function (a, b) {
				return a - b;
			});

			// validate board integrity
			for (var i = 0; i < sortedBoard.length; i++) {
				if (sortedBoard[i] != i) {
					throw this.EXCEPTIONS.INVALID_BOARD;
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
	this.renderer = typeof AsciiRenderer == "undefined" ? { render: function() {} } : AsciiRenderer;
}

SliderPuzzle.prototype = {
	config: {
		// number of rows
		rows: 4,
		// number of columns
		columns: 4,
		// position of the hole
		holePosition: 15
	},

	DIRECTIONS: {
		UP: 'up',
		DOWN: 'down',
		LEFT: 'left',
		RIGHT: 'right'
	},

	EXCEPTIONS: {
		BOARD_MISMATCH:	'board does not match rows or columns',
		INVALID_BOARD:	'board does not contain required items'
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
