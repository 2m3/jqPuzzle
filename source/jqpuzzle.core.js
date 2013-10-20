function SliderPuzzle(options) {
	// declare some variables that are re-used throughout initialization
	var i;
	var option;
	var value;

	// define this.options as soon as possible so that helper methods
	// called during initialization can rely on it
	this.options = options;

	// handle options
	if ($.isPlainObject(options)) {

		// handle rows and cols options
		var dimensionOptions = ['rows', 'cols'];
		for (i in dimensionOptions) {
			option = dimensionOptions[i];
			value = options[option];

			if (value !== undefined) {
				// expect value to be greater than 1
				value = options[option] = parseInt(value, 10);
				if (isNaN(value) || value < 2) {
					throw 'invalid ' + option + ' value';
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
				// infer rows value if not set
				if (!options.rows) {
					options.rows = Math.floor(this._boardSize / options.cols);
				}

				// infer cols value if not set
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
			var offset = 0;
			for (i = 0; i < this._boardSize; i++) {
				if (this._sortedBoard[i] !== i  + offset) {
					// single exception where one number is skipped
					if (i !== 0 && options.hole === undefined && this._sortedBoard[i] === (i + 1)) {
						// infer hole value
						options.hole = i;

						// set offset
						offset = 1;

						continue;
					}

					throw BOARD_INVALID;
				}
			}

			// handle default case when board is set and hole is bottom right
			if (options.hole === undefined) {
				options.hole = this._boardSize;
			}
		}
		// board is not set
		else {
			// make sure rows and cols are defined
			options.rows = options.rows || this.defaults.rows;
			options.cols = options.cols || this.defaults.cols;

			// set board size
			this._boardSize = options.rows * options.cols;

			// handle hole and initialHole options
			var holeOptions = ['hole', 'initialHole'];
			for (i in holeOptions) {
				option = holeOptions[i];
				value = options[option];

				if (value !== undefined) {
					// expect value to be greater than or equal to 1
					value = options[option] = parseInt(value, 10);
					if (isNaN(value) || value < 1) {
						throw 'invalid ' + option + ' value';
					}

					// expect value to match board size
					if (value > this._boardSize) {
						throw option + ' does not match rows and cols';
					}
				}
			}

			// default to bottom right if hole is not set
			if (options.hole === undefined) {
				options.hole = this._boardSize;
			}
		}

		// handle shuffle option
		if (options.shuffle !== undefined) {
			// expect value to be greater than or equal to 0 or make sure to have a boolean
			value = parseInt(options.shuffle, 10);
			options.shuffle = (isNaN(value) || value < 0) ? !!options.shuffle : value;
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

	// set offsets
	this.offsets = {
		up: this.options.cols,
		down: -this.options.cols,
		left: 1,
		right: -1
	};

	// start the game
	this.initGame();

	// default renderer (used by toString)
	this.renderer = typeof AsciiRenderer === 'undefined' ? { render: function() { return ''; } } : AsciiRenderer;
}

SliderPuzzle.prototype = {
	defaults: {
		// number of rows
		rows: 4,
		// number of cols
		cols: 4,
		// shuffle on init (ignored when board is set)
		shuffle: true,
		// only every other randomly generated board is solvable
		// if set to ...    shuffled boards will be ...
		// true (default)   solvable
		// false            unsolvable
		// "random"         either or
		solvable: true
	},

	solved: false,
	solvable: true,

	// handles the first start of the game
	initGame: function() {
		this._playing = false;

		// start with a specified board
		if (this.options.board) {
			this._initialBoard = this.options.board.slice(0);
		}
		// or handle shuffle option
		else {
			// initialize with the solved board (requires a call to shuffle() to start the game)
			if (this.options.shuffle === false) {
				this._initialBoard = this._board = this.getSolvedBoard().slice(0);

				// do not start game
				return;
			}
			// or start with a shuffled board
			else {
				this.generateBoard();
			}
		}

		// set initial hole position
		this.setInitialHole();

		// start game
		this.restart();
	},

	// restarts the game with a new board
	shuffle: function() {
		// shuffle
		this.generateBoard();

		// restart game
		this.restart();
	},

	// resets all game variables to their default state
	restart: function() {
		this.resetBoard();
		this._hole = this._initialHole;
		this._moves = [];

		// TODO reset solved
		// TODO reset timer

		// TOOD check this._playing when moving
		this._playing = true;
	},

	// generates a shuffled board
	generateBoard: function() {
		var pickBoard;
		var i;
		var item;
		var breaker = 100;

		// for numeric values, generate a board with the specified number of moves away from the solved board
		// explicitly call parseInt() again as isNaN(Boolean) === false
		if (!isNaN(parseInt(this.options.shuffle, 10))) {
			this.generateBoardByMovesAwayFromSolvedBoard(this.options.shuffle);
			return;
		}

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

				// add to board
				this._initialBoard.push(item);
			}

			// add hole back at initial hole position
			if (this.options.initialHole) {
				this._initialBoard.splice(this.options.initialHole - 1, 0, 0);
			}

			// set initial hole position (required by isSolvable())
			this.setInitialHole();

			// reset board (required by isSolved())
			this.resetBoard();

		// shuffled board must not be solved already
		// check if board is solvable and account for solvable option
		//
		// solvable option      solvable board      action
		// -------------------------------------------------
		// true                 true                break
		// true                 false               continue
		// false                true                continue
		// false                false               break
		// 'random'             true                break
		// 'random'             false               break
		} while (this.isSolved() ||
			(this.options.solvable === true  && !this.isSolvable()) ||
			(this.options.solvable === false &&  this.isSolvable())
		);
	},

	// generates a board with the specified number of moves away from the solved board
	generateBoardByMovesAwayFromSolvedBoard: function(movesAway) {
		// start with the solved board
		this._initialBoard = this.getSolvedBoard().slice(0);

		// TODO perform movesAway random moves and make sure we do not move back and forth
		// these moves change this._initialBoard instead of this._board
	},

	// checks if the board is solvable
	isSolvable: function() {
		var signature = 1;
		var baseSignature;
		var board;
		var i;
		var j;

		// get a clone of the initial board and convert to form that the algorithm can work with
		// by replacing 0 with the missing number so that the board contains all numbers from 1 to (rows*cols)
		board = this._initialBoard.slice(0);
		board[this._initialHole - 1] = this.options.hole;

		// calculate the signature of the permutation
		for (i = 1; i <= (this._boardSize - 1); i++) {
			for (j = (i + 1); j <= this._boardSize; j++) {
				signature *= ((board[i - 1] - board[j - 1]) / (i - j));
			}
		}
		signature = Math.round(signature);

		// for big boards (approx. more than 86 pieces) the signature calculation
		// yields 0 instead of 1 or -1 what might me due to a buffer overflow
		if (Math.abs(signature) !==  1) {
			throw 'board could not be generated';
		}


		// TODO incorrect implementation
		// compare to 1 (even permutation) if initial hole position and solved hole position equal
		// or the distance between these positions is even
		// compare to -1 (odd permutation) if the distance is odd
		baseSignature = Math.abs(this.options.hole - this._initialHole) % 2 ? -1 : 1;

		// this works for 2x2 boards
		//var distance = Math.abs(this.options.hole - this._initialHole);
		//if (distance === 0 || distance == 3) baseSignature = 1;
		//if (distance == 1 || distance == 2) baseSignature = -1;

		return signature === baseSignature;
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

			// add items to board
			for (var i = 0; i < this._boardSize; i++) {
				// adjust any number after the hole by one
				this._sortedBoard.push((i < this.options.hole) ? i : i + 1);
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

	// resets the board to the initial board layout
	resetBoard: function() {
		this._board = this._initialBoard.slice(0);
	},

	// sets the specified or shuffled initial hole position
	setInitialHole: function() {
		this._initialHole = this.options.initialHole || $.inArray(0, this._initialBoard) + 1;
	},

	// TODO error case
	// checks if a piece can be moved based on its position
	// returns a move object if the piece can be moved
	// returns false if the piece cannot be moved
	canMove: function(row, col) {
		return this._canMoveByPiece(this.getPiece(row, col));
	},

	// TODO error case
	// check if a piece can be moved based on its number
	// returns a move object if the piece can be moved
	// returns false if the piece cannot be moved
	canMoveByNumber: function(number) {
		return this._canMoveByPiece(this.getPieceByNumber(number));
	},

	// check if a piece can be moved based on a direction
	// returns a move object if a piece can be moved in this direction
	// returns false if no piece can be moved in this direction
	canMoveByDirection: function(direction) {
		var piece = this.getPieceByDirection(direction);

		return piece && this._canMoveByPiece(piece);
	},

	// checks if a piece can be moved given an internal piece object
	// returns a move object if the piece can be moved
	// returns false if the piece cannot be moved
	_canMoveByPiece: function(piece) {
		var move;
		var hole = this.normalizePosition(this._hole);

		// a piece can be moved if it's neighboring the hole
		// i.e. either the distance of the rows or the columns
		// between the piece and the hole is exactly 1
		move = (Math.abs(piece.position.row - hole.row) + Math.abs(piece.position.col - hole.col) === 1);

		if (move) {
			// create a move object
			move = {
				number: piece.number,
				from: piece.position,
				to: hole
			};

			// add direction
			move.direction = this._getDirection(move);
		}

		return move;
	},

	// TODO allow for a random move
	// moves a piece based on its position
	// returns a move object if the piece was moved
	// returns false if the piece could not be moved
	move: function(row, col) {
		var move = this.canMove(row, col);

		return move && this._moveByMove(move);
	},

	// moves a piece based on its number
	// returns a move object if the piece was moved
	// returns false if the piece could not be moved
	moveByNumber: function(number) {
		return this._moveByPiece(this.getPieceByNumber(number));
	},


	// move a piece based on a direction
	// returns a move object if a piece was moved in this direction
	// returns false if no piece could not be moved in this direction
	moveByDirection: function(direction) {
		var move = this.canMoveByDirection(direction);

		return move && this._moveByMove(move);
	},

	// moves a piece given an internal piece object
	// returns a move object if the piece was moved
	// returns false if the piece could not be moved
	_moveByPiece: function(piece) {
		var move = this._canMoveByPiece(piece);

		return move && this._moveByMove(move);
	},

	// moves a piece given an internal move object
	// returns the move object
	_moveByMove: function(move) {
		var index = move.from.index;

		// swap pieces
		this._board[this._hole - 1] = this._board[index - 1];
		this._board[index - 1] = 0;

		// update hole
		this._hole = index;

		// add timestamp
		move.timestamp = new Date();

		// TODO increase move and other counters
		// TODO add move to stack

		return move;
	},

	// TODO also works for hole right now
	// gets a piece based on its position
	getPiece: function(row, col) {
		var position = this.normalizePosition(row, col);

		return {
			number: this._board[position.index - 1],
			position: position
		};
	},

	// gets a piece based on its number
	getPieceByNumber: function(number) {
		var position;
		var index = $.inArray(number, this._board) + 1;

		try {
			position = this.getPositionByIndex(index);
		} catch (e) {
			throw 'invalid number';
		}

		return {
			number: number,
			position: position
		};
	},

	// gets a piece based on a direction
	// returns false if no piece can be moved in this direction
	getPieceByDirection: function(direction) {
		var index;
		var position;
		var hole;

		// verify direction
		if (!this.offsets[direction]) {
			throw 'invalid direction';
		}

		// calculate index based on hole position
		index = this._hole + this.offsets[direction];

		// verify index is within bounds
		try {
			position = this.getPositionByIndex(index);
		} catch (e) {
			return false;
		}

		// verify position is on same row as hole for left/right moves
		if (direction == 'left' || direction == 'right') {
			hole = this.getPositionByIndex(this._hole);

			if (position.row !== hole.row) {
				return false;
			}
		}

		return position && this.getPiece(position);
	},

	// get the direction of a move from the position of the piece to be moved
	_getDirection: function(move) {
		for (var direction in this.offsets) {
			if (this.offsets.hasOwnProperty(direction)) {
				if (move.to.index + this.offsets[direction] === move.from.index) {
					return direction;
				}
			}
		}
	},

	// normalize different position styles into position object
	// (<index>) - one-based, one-dimensional
	// (<row>, <col>) - one-based, two-dimensional
	// ([<row>, <col>]) - one-based, two-dimensional, array notation
	normalizePosition: function(row, col) {
		var position;

		// ({row: <row>, col: <col>}) - one-based, two-dimensional, object
		if ($.isPlainObject(row)) {
			position = row;

			// fill index if not set
			if (!position.index) {
				position = this.getPositionByRowCol(position.row, position.col);
			}
		}

		// ([<row>, <col>]) - one-based, two-dimensional
		else if ($.isArray(row)) {
			position = this.getPositionByRowCol(row[0], row[1]);
		}

		// (<index>) - one-based, one-dimensional
		else if (col === undefined) {
			position = this.getPositionByIndex(row);
		}

		// (<row>, <col>) - one-based, two-dimensional
		else {
			position = this.getPositionByRowCol(row, col);
		}

		return position;
	},

	// create a position object from row and column numbers
	getPositionByRowCol: function(row, col) {
		// expect row and col to be between 1 and the corresponding board's dimension
		if (row < 1 || row > this.options.rows) {
			throw 'invalid row';
		}
		if (col < 1 || col > this.options.cols) {
			throw 'invalid col';
		}

		return {
			index: (row - 1) * this.options.cols + (col - 1) + 1,
			row: row,
			col: col
		};
	},

	// create a position object from one-dimensional index
	getPositionByIndex: function(index) {
		// expect index to be between 1 and board size
		if (index < 1 || index > this._boardSize) {
			throw 'invalid index';
		}

		var col = (index - 1) % this.options.cols;

		return {
			index: index,
			row: Math.floor((index - 1 - col) / this.options.cols) + 1,
			col: col + 1
		};
	},

	toString: function() {
		return this.renderer.render(this._board, this.options.rows, this.options.cols);
	}
};
