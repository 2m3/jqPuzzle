function SliderPuzzle(options) {
	// define this.options as soon as possible so that helper methods
	// called during initialization can rely on it
	this.options = options;

	// handle specified options
	if ($.isPlainObject(options)) {

		// handle rows and cols option
		var dimensions = ['rows', 'cols'];
		for (var i in dimensions) {
			var dimension = dimensions[i];

			if (options[dimension] !== undefined) {
				options[dimension] = parseInt(options[dimension], 10);
				if (isNaN(options[dimension]) || options[dimension] < 2) {
					throw 'invalid ' + dimension + ' value';
				}
			}
		}

		// handle board option
		if (options.board !== undefined) {
			var BOARD_INVALID  = 'invalid board';
			var BOARD_MISMATCH = 'board does not match rows or cols';
			var length = options.board.length;

			if (!$.isArray(options.board) || length === 0) {
				throw BOARD_INVALID;
			}

			// either rows or cols are set (or both)
			if (options.rows || options.cols) {
				// infer rows value if not defined
				if (!options.rows) {
					options.rows = Math.floor(length / options.cols);
				}

				// infer cols value if not defined
				if (!options.cols) {
					options.cols = Math.floor(length / options.rows);
				}

				if (options.rows == 1 || options.cols == 1 || options.rows * options.cols !== length) {
					throw BOARD_MISMATCH;
				}
			}

			// neither rows or cols are set
			else {
				// assume both rows and cols have the same value
				var sqrt = Math.sqrt(length);

				if (Math.floor(sqrt) != sqrt) {
					throw BOARD_MISMATCH;
				}

				// set rows and cols accordingly
				options.rows = options.cols = sqrt;
			}

			// create sorted board
			this.sortedBoard = options.board.slice(0).sort(function (a, b) {
				return a - b;
			});

			// ignore a speficied hole option
			options.hole = undefined;

			// validate board integrity
			// a valid board contains all numbers from 1 to (rows*cols) with any one number replaced with 0
			// that is, a sorted board starts from 0 and contains all numbers up to (rows*cols) except one
			for (i = 0; i < length; i++) {
				if (this.sortedBoard[i] !== i) {
					// single exception where one number is skipped
					if (options.hole === undefined && this.sortedBoard[i] == (i + 1)) {
						// infer hole value (1-based)
						options.hole = i;
						continue;
					}

					throw BOARD_INVALID;
				}
			}

			// handle default case when board is set and hole is bottom right
			if (options.hole === undefined) {
				options.hole = this.options.rows * this.options.cols;
			}

			// set current hole and initial hole position (1-based)
			this._hole = options.initialHolePosition = $.inArray(0, options.board) + 1;

		// board is not set
		} else {
			// make sure rows and cols are defined
			options.rows = options.rows || this.defaults.rows;
			options.cols = options.cols || this.defaults.cols;

			// handle hole option
			if (options.hole !== undefined) {
				options.hole = parseInt(options.hole, 10);
				if (isNaN(options.hole) || options.hole < 1) {
					throw 'invalid hole value';
				}

				// normalize
				options.hole = this.to1dPosition(this.normalizePosition(options.hole));

				// validate against board dimensions
				if (options.hole > (options.rows * options.cols)) {
					throw 'hole does not match rows and cols';
				}
			} else {
				// default to bottom right
				options.hole = options.rows * options.cols;
			}

			// set current hole and initial hole position
			this._hole = options.initialHolePosition = options.hole;
		}
	}

	// merge passed in options with defaults (options wins)
	this.options = $.extend({}, this.defaults, options);

	// handle default case when board is set and hole is bottom right or
	// or a rows or cols value was inferred and the hole has to be recalculated
	if (this.options.hole === undefined) {
		this.options.hole = this.options.rows * this.options.cols;
	}

	// the current hole position
	if (this._hole === undefined) {
		this._hole = this.options.initialHolePosition = this.options.hole;
	}

	// the current board (keep a copy of the intial board to be able to restart)
	this.board = (this.options.board && this.options.board.slice(0)) || this.shuffle();

	// default renderer (used by toString)
	this.renderer = typeof AsciiRenderer === 'undefined' ? { render: function() { return ''; } } : AsciiRenderer;
}

SliderPuzzle.prototype = {
	defaults: {
		// number of rows
		rows: 4,
		// number of cols
		cols: 4,
		// only every other randomly generated board is solvable
		// if set to ...    shuffled boards will be ...
		// true (default)   solvable
		// false            unsolvable
		// "random"         either or
		solvable: true
	},

	DIRECTIONS: ['up', 'down', 'left','right'],

	solved: false,
	solvable: true,

	// convert a two-dimensional row-col index into a one-dimensional index
	to1dPosition : function(position2d) {
		var normalizedPosition = this.normalizePosition(position2d);
		return normalizedPosition.row * this.options.cols + normalizedPosition.col;
	},

	// convert a one-dimensional index into a two-dimensional row-col index
	to2dPosition: function(position1d) {
		var col = position1d % this.options.cols;
		return {
			row: Math.floor((position1d - col) / this.options.cols),
			col: col
		};
	},

	// handle row and col passed in as object, array, or seperate arguments,
	// or just a one-dimensional index
	normalizePosition: function(row, col) {
		if ($.isPlainObject(row)) {
			return row;
		} else if ($.isArray(row)) {
			return {
				row: row[0],
				col: row[1]
			};
		} else if (col === undefined) {
			return this.to2dPosition(row);
		} else {
			return {
				row: row,
				col: col
			};
		}
	},

	// TODO should not return -1 and null
	getPosition: function(numberOrDirection) {
		console.log('getPosition', numberOrDirection);

		if ($.inArray(numberOrDirection, this.DIRECTIONS) == -1) {
			// number
			return $.inArray(numberOrDirection, this.board);
		} else {
			// direction
			return this.getPosition1dByDirection(numberOrDirection);
		}
	},

	getPosition1dByDirection: function(direction) {
		console.log('getPosition1dByDirection', direction);

		var offsets = {
			up: this.options.cols,
			down: -this.options.cols,
			left: 1,
			right: -1
		};

		var index = this._hole + offsets[direction];
		return (offsets[direction] && (index > 0 && index <= this.board.length)) ? index : null;
	},

	canMove: function(numberOrDirection) {
		return this.canMoveByPosition(this.getPosition(numberOrDirection));
	},

	// allow for a random move?
	move: function(numberOrDirection) {
		console.log('move', numberOrDirection);
		return this.moveByPosition(this.getPosition(numberOrDirection));
	},

	canMoveByPosition: function(row, col) {

		var position = this.normalizePosition(row, col);
		var hole = this.normalizePosition(this._hole - 1);

		console.log('canMoveByPosition', row, col, this._hole, hole);
		return (Math.abs(position.row - hole.row) + Math.abs(position.col - hole.col) === 1);
	},

	moveByPosition: function(row, col) {
		console.log('moveByPosition', row, col);
		var position = this.normalizePosition(row, col);
		var position1d = this.to1dPosition(position);

		if (this.canMoveByPosition(position)) {
			// swap pieces
			this.board[this._hole - 1] = this.board[position1d];
			this.board[position1d] = 0;

			// update hole
			this._hole = position1d + 1;

			// return current board
			return this.board;
		}

		return false;
	},

	shuffle: function() {
		var sortedBoard, i, item;
		var dev = 0;

		// create a sorted board to pick items from
		// might have been created by board validation logic already
		if (!this.sortedBoard) {
			this.sortedBoard = [];
			for (i = 0; i < this.options.rows * this.options.cols; i++) {
				this.sortedBoard.push(i);
			}
		}

		// create a shuffled board and repeat if we force a solvable board
		// and the created board is not solvable
		do {
			// TODO small dev helper
			if (dev == 999) {
				alert('looks like you broke the puzzle');
				break;
			}
			dev++;

			// clone sorted board so that it can be reused by later shuffle calls
			sortedBoard = this.sortedBoard.slice(0);

			// remove hole
			sortedBoard.splice(0, 1);

			// start with an empty board
			this.board = [];

			while (sortedBoard.length) {
				// randomly pick items from sorted board and re-index
				i = Math.floor(Math.random() * sortedBoard.length);
				item = sortedBoard.splice(i, 1)[0];

				// adjust any number after the hole by one
				if (item >= this.options.hole) {
					item++;
				}

				// add to board
				this.board.push(item);
			}

			// add hole back
			this.board.splice(this.options.initialHolePosition - 1, 0, 0);

			// update hole
			this._hole = this.options.initialHolePosition;


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

	// normalize a board to the form that isSolvable can work with
	// - replace 0 with missing number so that board contains all numbers from 1 to (rows*cols)
	// TODO assume valid board, are hole and solvedHole defined at this point?
	normalizeBoard: function() {
			this.normalizedBoard = this.board.slice(0);
			this.normalizedBoard[this.options.initialHolePosition - 1] = this.options.hole;
	},

	isSolvable: function() {
		this.normalizeBoard();
		//console.log(this.board, this.normalizedBoard, this._hole, this.options.hole, this.options.initialHolePosition);

		var i, j;
		var product = 1;
		var referenceValue = Math.abs(this.options.hole - this.options.initialHolePosition) % 2 ? -1 : 1;

		for (i = 1; i <= (this.options.rows * this.options.cols - 1); i++) {
			for (j = (i + 1); j <= (this.options.rows * this.options.cols); j++) {
				product *= ((this.normalizedBoard[i - 1] - this.normalizedBoard[j - 1]) / (i - j));
			}
		}

		return Math.round(product) === referenceValue;
	},

	isSolved: function() {
		//console.log(this.board, this.sortedBoard, this._hole, this.options.hole, this.options.initialHolePosition);
		var solvedBoard;
		var i;

		// TODO is sortedBoard really defined at this point?
		// TODO cache solved board
		// get a clone of the sorted board and place hole at correct position
		solvedBoard = this.sortedBoard.slice(0);
		solvedBoard.splice(0, 1);
		solvedBoard.splice(this.options.hole - 1, 0, 0);
		console.log(solvedBoard);

		for (i = 0; i < this.options.rows * this.options.cols; i++) {
			if (this.board[i] !== solvedBoard[i]) {
				return false;
			}
		}

		return true;
	},

	pause: function(pauseTimer) {
	},

	resume: function() {
	},

	restart: function() {
		this.shuffle();
		this.moves = [];
		// reset timer
	},

	toString: function() {
		return this.renderer.render(this.board, this.options.rows, this.options.cols);
	}
};
