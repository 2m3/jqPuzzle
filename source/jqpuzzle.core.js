function SliderPuzzle(options) {
	// define this.options as soon as possible so that helper methods
	// called during initialization can rely on it
	this.options = options;

	// handle specified options
	if ($.isPlainObject(options)) {

		// handle rows and cols options
		var dimensions = ['rows', 'cols'];
		for (var i in dimensions) {
			var dimension = dimensions[i];

			if (options[dimension] !== undefined) {
				// expect rows and cols to be greater than 1
				options[dimension] = parseInt(options[dimension], 10);
				if (isNaN(options[dimension]) || options[dimension] < 2) {
					throw 'invalid ' + dimension + ' value';
				}
			}
		}

		// handle board option
		if (options.board !== undefined) {
			var BOARD_INVALID  = 'invalid board';

			// expect array
			if (!$.isArray(options.board)) {
				throw BOARD_INVALID;
			}

			// set board size
			this._boardSize = options.board.length;

			// either rows or cols are set (or both)
			if (options.rows || options.cols) {
				// infer rows value if not defined
				if (!options.rows) {
					options.rows = Math.floor(this._boardSize / options.cols);
				}

				// infer cols value if not defined
				if (!options.cols) {
					options.cols = Math.floor(this._boardSize / options.rows);
				}
			}

			// neither rows nor cols are set
			else {
				// assume both rows and cols have the same value
				options.rows = options.cols = Math.floor(Math.sqrt(this._boardSize));
			}

			// expect rows and cols to be greater than 1 and match board size
			if (options.rows < 2 || options.cols < 2 || options.rows * options.cols !== this._boardSize) {
				throw 'board does not match rows and cols';
			}

			// create sorted board
			this._sortedBoard = options.board.slice(0).sort(function (a, b) {
				return a - b;
			});

			// ignore specified hole and initial hole options
			options.hole = options.initialHole = undefined;

			// validate board integrity
			// a valid board contains all numbers from 1 to (rows*cols) with any one number replaced with 0
			// that is, a sorted board starts from 0 and contains all numbers up to (rows*cols) except one
			for (i = 0; i < this._boardSize; i++) {
				if (this._sortedBoard[i] !== i) {
					// single exception where one number is skipped
					if (options.hole === undefined && this._sortedBoard[i] === (i + 1)) {
						// infer hole value (1-based)
						options.hole = i;
						continue;
					}

					throw BOARD_INVALID;
				}
			}

			// handle default case when board is set and hole is bottom right
			if (options.hole === undefined) {
				options.hole = this._boardSize;
			}

			// set initial hole position
			this._initialHole = $.inArray(0, options.board) + 1;

		// board is not set
		} else {
			// make sure rows and cols are defined
			options.rows = options.rows || this.defaults.rows;
			options.cols = options.cols || this.defaults.cols;

			// set board size
			this._boardSize = options.rows * options.cols;

			// handle hole and initialHole options
			var holeOptions = ['hole', 'initialHole'];
			for (i in holeOptions) {
				var holeOption = holeOptions[i];

				if (options[holeOption] !== undefined) {
					// expect hole and initialHole to be greater than 0
					options[holeOption] = parseInt(options[holeOption], 10);
					if (isNaN(options[holeOption]) || options[holeOption] < 1) {
						throw 'invalid ' + holeOption + ' value';
					}

					// expect hole and initialHole to match board size
					if (options[holeOption] > this._boardSize) {
						throw holeOption + ' does not match rows and cols';
					}
				}
			}

			// default to bottom right if hole is not set
			if (options.hole === undefined) {
				options.hole = this._boardSize;
			}
		}
	}

	// merge passed in options with defaults (options wins)
	this.options = $.extend({}, this.defaults, options);

	// set board size
	if (!this._boardSize) {
		this._boardSize = this.options.rows * this.options.cols;
	}

	// handle default case when board is set and hole is bottom right
	// or a rows or cols value was inferred and the hole has to be recalculated
	if (this.options.hole === undefined) {
		this.options.hole = this._boardSize;
	}

	// start the game
	this.restart();

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

	// restarts the game with a new board
	restart: function() {
		// on first start, use specified board if set
		if (!this._initialBoard && this.options.board) {
			this._initialBoard = this.options.board.slice(0);

		// or shuffle a new board
		} else {
			this.shuffle();
		}

		this.reset();
	},

	// resets all game variables to their default state
	reset: function() {
		this._board = this._initialBoard.slice(0);
		this._hole = this._initialHole;
		this._moves = [];

		// TODO reset solved
		// TODO reset timer
	},

	// shuffles the board
	shuffle: function() {
		var pickBoard;
		var i;
		var item;
		var breaker = 100;

		// create a shuffled board by picking items from the sorted board
		// and repeat if the solvability of the board does not match the specified option
		do {
			// check - against all odds - for infinite loops
			if (breaker-- === 0) {
				throw('board could not be generated');
			}

			// get a clone of the sorted board
			pickBoard = this.getSortedBoard().slice(0);

			// remove hole from beginning
			if (this.options.initialHole) {
				pickBoard.splice(0, 1);
			}

			// start with an empty board
			this._initialBoard = [];

			// pick items until empty
			while (pickBoard.length) {
				// randomly pick items from sorted board and re-index
				i = Math.floor(Math.random() * pickBoard.length);
				item = pickBoard.splice(i, 1)[0];

				// adjust any number after the hole by one
				if (item >= this.options.hole) {
					item++;
				}

				// add to board
				this._initialBoard.push(item);
			}

			// add hole back at initial hole position
			if (this.options.initialHole) {
				this._initialBoard.splice(this.options.initialHole - 1, 0, 0);
			}

			// set specified or shuffled initial hole position
			this._initialHole = this.options.initialHole || $.inArray(0, this._initialBoard) + 1;

		// solvable option      solvable board      action
		// -------------------------------------------------
		// true                 true                break
		// true                 false               continue
		// false                true                continue
		// false                false               break
		// 'random'             true                break
		// 'random'             false               break
		} while (	(this.options.solvable === true  && !this.isSolvable()) ||
					(this.options.solvable === false &&  this.isSolvable()));
	},

	// checks if the board is solvable
	isSolvable: function() {
		var signature = 1;
		var baseSignature;
		var board;
		var i;
		var j;

		// create a board in the form that the algorithm can work with by replacing 0 with
		// the missing number so that the board contains all numbers from 1 to (rows*cols)
		board = this._initialBoard.slice(0);
		board[this._initialHole - 1] = this.options.hole;

		// calculate the signature of the permutation
		for (i = 1; i <= (this._boardSize - 1); i++) {
			for (j = (i + 1); j <= this._boardSize; j++) {
				signature *= ((board[i - 1] - board[j - 1]) / (i - j));
			}
		}

		// compare to 1 (even permutation) if initial hole position and solved hole position equal
		// or the distance between these positions is even
		// compare to -1 (odd permutation) if the distance is odd
		baseSignature = Math.abs(this.options.hole - this._initialHole) % 2 ? -1 : 1;

		return Math.round(signature) === baseSignature;
	},

	// checks if the board is solved
	isSolved: function() {
		var solvedBoard = this.getSolvedBoard();
		var i;

		for (i = 0; i < this._boardSize; i++) {
			if (this._board[i] !== solvedBoard[i]) {
				return false;
			}
		}

		return true;
	},

	// returns the sorted board
	getSortedBoard: function() {
		if (!this._sortedBoard) {
			this._sortedBoard = [];

			for (var i = 0; i < this._boardSize; i++) {
				this._sortedBoard.push(i);
			}
		}

		return this._sortedBoard;
	},

	// returns the solved board
	getSolvedBoard: function() {
		if (!this._solvedBoard) {
			// get a clone of the sorted board
			this._solvedBoard = this.getSortedBoard().slice(0);

			// remove hole from beginning
			this._solvedBoard.splice(0, 1);

			// add hole back at hole position
			this._solvedBoard.splice(this.options.hole - 1, 0, 0);
		}

		return this._solvedBoard;
	},

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

	// handle row and col passed in as object, array, or separate arguments,
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
			return $.inArray(numberOrDirection, this._board);
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
		return (offsets[direction] && (index > 0 && index <= this._board.length)) ? index : null;
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
			this._board[this._hole - 1] = this._board[position1d];
			this._board[position1d] = 0;

			// update hole
			this._hole = position1d + 1;

			// return current board
			return this._board;
		}

		return false;
	},

	pause: function(pauseTimer) {
	},

	resume: function() {
	},

	toString: function() {
		return this.renderer.render(this._board, this.options.rows, this.options.cols);
	}
};
