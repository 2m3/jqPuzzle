function SliderPuzzle(options) {
	// make sure this.options is available
	this.options = options || {};

	if (options) {
		// handle rows and columns option
		var dimensions = ['rows', 'columns'];
		for (var i in dimensions) {
			var dimension = dimensions[i];

			// include any falsy value including 0
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
			this.sortedBoard = options.board.slice(0).sort(function (a, b) {
				return a - b;
			});

			// validate board integrity
			for (i = 0; i < this.sortedBoard.length; i++) {
				if (this.sortedBoard[i] !== i) {
					throw INVALID_BOARD;
				}
			}

			// set hole
			this.board = options.board.slice(0);
			options.hole = $.inArray(0, this.board);
		} else {
			// make sure rows and columns are defined at this point
			options.rows = options.rows || this.defaults.rows;
			options.columns = options.columns || this.defaults.columns;

			// handle hole option (ignored when board is set)
			// include any falsy value including 0
			if (options.hole !== undefined) {
				// validate hole
				options.hole = parseInt(options.hole, 10);
				if (isNaN(options.hole) || options.hole < 0) {
					throw 'invalid hole value';
				}

				// normalize
				options.hole = this.to1dPosition(this.normalizePosition(options.hole));

				// validate hole against board dimensions
				if (options.hole < 0 || options.hole >= (options.rows * options.columns)) {
					throw 'hole does not match rows and columns';
				}
			} else {
				// default to bottom right
				options.hole = options.rows * options.columns - 1;
			}
		}
	}

	// merge passed in options with defaults (options wins)
	this.options = $.extend({}, this.defaults, options);

	// the current board (keep a copy of the intial board to be able to restart)
	this.board = (this.options.board && this.options.board.slice(0)) || this.shuffle();

	// the current hole position
	this.hole = this.options.hole;

	// default renderer (used by toString)
	this.renderer = typeof AsciiRenderer == 'undefined' ? { render: function() { return ''; } } : AsciiRenderer;
}

SliderPuzzle.prototype = {
	defaults: {
		// number of rows
		rows: 4,
		// number of columns
		columns: 4,
		// hole position (bottom right)
		hole: 15,
		// only every other randomly generated board is solvable
		// if set to ...    shuffled boards will be ...
		// true	(default)   solvable
		// false            unsolvable
		// "random"         either or
		solvable: true
	},

	DIRECTIONS: ['up', 'down', 'left','right'],

	solved: false,
	solvable: true,

	// convert a two-dimensional row-column index into a one-dimensional index
	to1dPosition : function(position2d) {
		var normalizedPosition = this.normalizePosition(position2d);
		return normalizedPosition.row * this.options.columns + normalizedPosition.column;
	},

	// convert a one-dimensional index into a two-dimensional row-column index
	to2dPosition: function(position1d) {
		var column = position1d % this.options.columns;
		return {
			row: Math.floor((position1d - column) / this.options.columns),
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
		if ($.inArray(numberOrDirection, this.DIRECTIONS) == -1) {
			// number
			return $.inArray(numberOrDirection, this.board);
		} else {
			// direction
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
		var sortedBoard, i;

		// create a sorted board to pick items from
		// might have been created by board validation logic already
		if (!this.sortedBoard) {
			this.sortedBoard = [];
			for (i = 0; i < this.options.rows * this.options.columns; i++) {
				this.sortedBoard.push(i);
			}
		}

		// create a shuffled board and repeat if we force a solvable board
		// and the created board is not solvable
		do {
			// clone sorted board so that it can be reused by later shuffle calls
			sortedBoard = this.sortedBoard.slice(0);

			// remove the hole
			sortedBoard.splice(0, 1);

			// start with an empty board
			this.board = [];

			// randomly pick items from sorted board and re-index
			while (sortedBoard.length) {
				i = Math.floor(Math.random() * sortedBoard.length);
				this.board.push(sortedBoard.splice(i, 1)[0]);
			}

			// add hole to board
			this.board.splice(this.options.hole, 0, 0);

			// update hole
			this.hole = this.options.hole;


		// solvable	option      solvable board      action
		// -------------------------------------------------
		// true                 true                break
		// true                 false               continue
		// false                true                continue
		// false                false               break
		// 'random'             true                break
		// 'random'             false               break
		} while (	(this.options.solvable === true  && !this.isSolvable()) ||
					(this.options.solvable === false &&  this.isSolvable()));

		// also return the board
		return this.board;
	},

	isSolvable: function() {
		var i, j;
		var product = 1;

		for (i = 1; i <= (this.options.rows * this.options.columns - 1); i++) {
			for (j = (i + 1); j <= (this.options.rows * this.options.columns); j++) {
				product *= ((this.board[i - 1] - this.board[j - 1]) / (i - j));
			}
		}
		return Math.round(product) == 1;
	},

	isSolved: function() {
		var solvedBoard;
		var i;

		// TODO is sortedBoard really defined at this point?
		// get a clone of the sorted board and place hole at correct position
		solvedBoard = this.sortedBoard.slice(0);
		solvedBoard.splice(0, 1);
		solvedBoard.splice(this.hole, 0, 0);

		for (i = 0; i < this.options.rows * this.options.columns; i++) {
			if (this.board[i] !== solvedBoard[i]) {
				return false;
			}
		}
		return true;
	},

	pause: function(pauseTimer) {
	},

	proceed: function() {
	},

	restart: function() {
		this.shuffle();
		this.moves = [];
		// reset timer
	},

	toString: function() {
		return this.renderer.render(this.board, this.options.rows, this.options.columns);
	}
};
