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

	// the offsets for a start position compared to a target position per direction
	this.directionOffsets = {
		up:    { index:  this.options.cols, row:  1, col: 0 },
		down:  { index: -this.options.cols, row: -1, col: 0 },
		left:  { index:  1, row: 0, col:  1 },
		right: { index: -1, row: 0, col: -1 }
	};

	// start the game
	this.initGame();

	// default renderer (used by toString)
	this.renderer = (typeof asciiRenderer === 'undefined') ?
		{ render: function(board) { return board.toString(); } } :
		asciiRenderer;
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
	directions: ['up', 'left', 'right', 'down'],
	solved: false,
	solvable: true,

	// handles the first start of the game
	initGame: function() {
		this._playing = false;

		// start with a specified board
		if (this.options.board) {
			this._initialBoard = this.options.board.slice(0);

			// set initial hole position
			this.setInitialHole();

			// reset game
			this.reset();
		}
		// or handle shuffle option
		else {
			// initialize with the solved board
			// requires a call to shuffle() to start the game
			if (this.options.shuffle === false) {
				// TODO need to set initial board?
				this._initialBoard = this._board = this.getSolvedBoard().slice(0);

				// do not start game
				return;
			}
			// or start with a shuffled board
			else {
				this.shuffle(this.options.shuffle, true);
			}
		}
	},

	// restarts the game with a shuffled board
	shuffle: function(movesAway, setOption) {
		if (movesAway !== undefined && movesAway !== true) {
			// for numeric values, generate a board with the
			// specified number of moves away from the solved board

			// expect value to be greater than or equal to 0
			movesAway = parseInt(movesAway, 10);
			if (isNaN(movesAway) || movesAway < 0) {
				throw 'invalid shuffle value';
			}

			// make sure shuffle option is set
			if (setOption) {
				this.options.shuffle = movesAway;
			}

			this.generateBoardByMovesAwayFromSolvedBoard(movesAway);
		} else {
			this.generateBoard();
		}

		// reset game
		this.reset();

		// trigger shuffle event
		this.trigger('shuffle');
	},

	// resets all game variables to their initial state
	reset: function() {
		if (this._initialHole === undefined || this._initialBoard === undefined) {
			throw "board must be shuffled first";
		}

		this.resetBoard();
		this._hole = this._initialHole;
		this._moves = [];
		this._redos = [];

		// TODO reset solved
		// TODO reset timer

		// TODO check this._playing when moving
		this._playing = true;

		// trigger reset event
		this.trigger('reset');
	},

	// generates a shuffled board
	generateBoard: function() {
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
		// ignore specified initial hole option
		this.options.initialHole = undefined;

		// start with the solved board
		this._initialBoard = this.getSolvedBoard().slice(0);

		// set initial hole and reset the game to be able to perform moves
		this.setInitialHole();
		this.reset();

		// randomly move pieces
		while (movesAway-- > 0) {
			this.moveRandomly();
		}

		// set the resulting board as initial board
		this._initialBoard = this._board;
	},

	// checks if the board is solvable
	isSolvable: function() {
		var signature = 1;
		var referenceValue;
		var board;
		var i;
		var j;

		// get a clone of the initial board and convert to a form
		// the algorithm can work with by replacing 0 with the missing
		// number so that the board contains all numbers from 1 to (rows*cols)
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
			throw 'board could not be checked for solvability';
		}

		// if hole and initial hole position were the same
		// (i.e. the initial position of the hole equals its final position),
		// a board would be solvable when the signature is 1
		// as the positions can be different, the reference value needs to be adjusted

		// the following logic was found empirically by solving many puzzles ...

		// start with -1 for even hole values, 1 for odd
		referenceValue = (this.options.hole % 2 === 0) ? -1 : 1;

		// invert if initial hole position is even
		if (this._initialHole % 2 === 0) {
			referenceValue *= -1;
		}

		// boards with an even number of cols need additional adjustment
		if (this.options.cols % 2 === 0) {
			// invert if the rows of the hole and the initial hole position
			// do not have the same parity (even or odd)
			if (this._getPositionByIndex(this._initialHole).row % 2 !== this._getPositionByIndex(this.options.hole).row % 2) {
				referenceValue *= -1;
			}
		}

		// the board is solvable if the signature equals the reference value
		return signature === referenceValue;
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

	// creates a position object from any kind of position value
	// (<index>) - one-dimensional index
	// (<row>, <col>) - row and col as separate arguments
	// ([<row>, <col>]) - row and col as array
	// ({row: <row>, col: <col>}) - row and col as object
	getPosition: function(row, col) {
		var position;

		// ({row: <row>, col: <col>}) - row and col as object
		if ($.isPlainObject(row)) {
			position = row;

			// fill index if not set
			if (!position.index) {
				position = this._getPositionByRowCol(position.row, position.col);
			}
		}

		// ([<row>, <col>]) - row and col as array
		else if ($.isArray(row)) {
			position = this._getPositionByRowCol(row[0], row[1]);
		}

		// (<index>) - one-dimensional index
		else if (col === undefined) {
			position = this._getPositionByIndex(row);
		}

		// (<row>, <col>) - row and col as separate arguments
		else {
			position = this._getPositionByRowCol(row, col);
		}

		return position;
	},

	// creates a position object from a one-dimensional index
	_getPositionByIndex: function(index) {
		if (!this._isValidIndex(index)) {
			throw 'invalid index';
		}

		var col = (index - 1) % this.options.cols;

		return {
			index: index,
			row: Math.floor((index - 1 - col) / this.options.cols) + 1,
			col: col + 1
		};
	},

	// creates a position object from row and column values
	_getPositionByRowCol: function(row, col) {
		if (!this._isValidRow(row)) {
			throw 'invalid row';
		}
		if (!this._isValidCol(col)) {
			throw 'invalid col';
		}

		return {
			index: (row - 1) * this.options.cols + (col - 1) + 1,
			row: row,
			col: col
		};
	},

	// verifies that a specified index is between 1 and board size
	_isValidIndex: function(index) {
		return (index > 0 && index <= this._boardSize);
	},

	// verifies that a specified row is between 1 and the board's rows
	_isValidRow: function(row) {
		return (row > 0 && row <= this.options.rows);
	},

	// verifies that a specified col is between 1 and the board's cols
	_isValidCol: function(col) {
		return (col > 0 && col <= this.options.cols);
	},

	// calculates the start position for a move based on target position and direction
	// returns false if no position can be found
	_getPositionByTargetAndDirection: function(target, direction) {
		var position;
		var offset = this.directionOffsets[direction];

		// verify direction
		if (!offset) {
			throw 'invalid direction';
		}

		// calculate start position
		position = {
			index: target.index + offset.index,
			row: target.row + offset.row,
			col: target.col + offset.col
		};

		// return valid positions only
		return this._isValidRow(position.row) && this._isValidCol(position.col) && position;
	},

	// TODO also works for hole right now
	// gets a piece based on its position
	getPiece: function(row, col) {
		var position = this.getPosition(row, col);

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
			position = this._getPositionByIndex(index);
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
		var hole = this._getPositionByIndex(this._hole);

		// calculate piece position based on hole position and direction
		position = this._getPositionByTargetAndDirection(hole, direction);

		return position && this.getPiece(position);
	},

	// checks if a piece can be moved based on its position
	// returns a move object if the piece can be moved
	// returns false if the piece cannot be moved
	canMove: function(row, col) {
		return this._canMoveByPiece(this.getPiece(row, col));
	},

	// checks if a piece can be moved based on its number
	// returns a move object if the piece can be moved
	// returns false if the piece cannot be moved
	canMoveByNumber: function(number) {
		return this._canMoveByPiece(this.getPieceByNumber(number));
	},

	// checks if a piece can be moved based on a direction
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
		return this._canMoveByMove(this._getMoveByPiece(piece));
	},

	// checks if a piece can be moved given an internal move object
	// returns a move object if the piece can be moved
	// returns false if the piece cannot be moved
	_canMoveByMove: function(move) {
		// a move can be performed if the piece is to be moved to the hole position
		// (double-check - this is guaranteed by all move methods)
		var canMove = (move.to.index === this._hole);

		// and the piece is neighboring the hole, i.e. either the distance of
		// the rows or the columms between the piece and the hole is exactly 1
		canMove &= (Math.abs(move.from.row - move.to.row) + Math.abs(move.from.col - move.to.col) === 1);

		return !!canMove && move;
	},

	// moves a piece based on its position
	// returns a move object if the piece was moved
	// returns false if the piece could not be moved
	move: function(row, col) {
		return this._moveByPiece(this.getPiece(row, col));
	},

	// moves a piece based on its number
	// returns a move object if the piece was moved
	// returns false if the piece could not be moved
	moveByNumber: function(number) {
		return this._moveByPiece(this.getPieceByNumber(number));
	},

	// moves a piece based on a direction
	// returns a move object if a piece was moved in this direction
	// returns false if no piece could be moved in this direction
	moveByDirection: function(direction) {
		var move = this.canMoveByDirection(direction);

		return move && this._moveByMove(move);
	},

	// moves a random piece
	// returns a move object
	moveRandomly: function() {
		var pickDirections;
		var direction;
		var move;
		var i;

		// get a clone of the directions
		pickDirections = this.directions.slice(0);

		while (pickDirections.length) {
			// randomly pick a direction and re-index
			i = Math.floor(Math.random() * pickDirections.length);
			direction = pickDirections.splice(i, 1)[0];

			// two random moves must not move a single piece back and forth
			// TODO replace _lastDirection with last move from stack
			if (this._lastDirection === this._getReverseDirection(direction)) {
				continue;
			}

			// try to move a piece in this direction
			move = this.moveByDirection(direction);

			// break if the move was possible
			if (move) {
				this._lastDirection = direction;
				return move;
			}
		}
	},

	// moves a piece given an internal piece object
	// returns a move object if the piece was moved
	// returns false if the piece could not be moved
	_moveByPiece: function(piece, isUndoRedo) {
		return this._moveByMove(this._getMoveByPiece(piece), isUndoRedo);
	},

	// moves a piece given an internal move object
	// returns a move object if the piece was moved
	// returns false if the piece could not be moved
	_moveByMove: function(move, isUndoRedo) {
		var index = move.from.index;

		// check valid move
		move = this._canMoveByMove(move);

		if (move) {
			// swap pieces
			this._board[this._hole - 1] = this._board[index - 1];
			this._board[index - 1] = 0;

			// update hole
			this._hole = index;

			// add index and timestamp
			move.index = this._moves.length + 1;
			move.timestamp = new Date();

			// add move to stack
			this._moves.push(move);

			if (!isUndoRedo) {
				// clear redo stack
				this._redos = [];

				// trigger move event
				this.trigger('move', move);
			}
		}

		return move;
	},

	// creates an internal move object given an internal piece object
	// does not guarantee that the move is valid
	_getMoveByPiece: function(piece) {
		// create move object
		var move = {
			number: piece.number,
			from: piece.position,
			to: this.getPosition(this._hole)
		};

		// add direction
		move.direction = this._getDirection(move);

		return move;
	},

	// gets the direction of a move from the position of the piece to be moved
	_getDirection: function(move) {
		var position;

		for (var direction in this.directionOffsets) {
			if (this.directionOffsets.hasOwnProperty(direction)) {
				// calculate start position based on target position and direction
				position = this._getPositionByTargetAndDirection(move.to, direction);

				// and compare to actual position
				if (position.index === move.from.index) {
					return direction;
				}
			}
		}
	},

	// gets the reverse of a direction, i.e. left vs. right, top vs. bottom
	_getReverseDirection: function(direction) {
		// find index of direction
		var index = $.inArray(direction, this.directions);

		// the inverse of a direction is found by looking up the reversing index
		return this.directions[this.directions.length - index - 1];
	},

	// checks if there is a move to undo
	// returns true if a move can be undone
	// returns false if no move can be undone
	canUndo: function() {
		return !!this._moves.length;
	},

	// undoes the previous move
	// returns the move object of the undone move
	// returns false if no move could be undone
	undo: function() {
		var move;

		// check if there is a move to undo
		if (!this.canUndo()) {
			return false;
		}

		// remove the last move from the stack and get its direction
		move = this._moves.pop();

		// perform the inversed move
		this._moveByPiece(this.getPiece(move.to), true);

		// also remove the inversed move from the stack
		this._moves.pop();

		// add the undone move to the redo stack
		this._redos.push(move);

		// trigger undo event
		this.trigger('undo', move);

		return move;
	},

	// checks if there is a move to redo
	// returns true if a move can be redone
	// returns false if no move can be redone
	canRedo: function() {
		return !!this._redos.length;
	},

	// redoes a previously undone move
	// returns the move object of the redone move
	// returns false if no move could be redone
	redo: function() {
		var move;

		// check if there is a move to redo
		if (!this.canRedo()) {
			return false;
		}

		// remove the last move from the redo stack
		move = this._redos.pop();

		// and re-apply it
		move = this._moveByMove(move, true);

		// trigger redo event
		this.trigger('redo', move);

		return move;
	},

	toString: function() {
		return this.renderer.render(this._board, this.options.rows, this.options.cols);
	}
};

// simply jQuery based event emitter
(function($) {
	function makeProxy(name) {
		return function() {
			(this._JQ || (this._JQ = $(this)))[name].apply(this._JQ, arguments);
		};
	}

	$.eventEmitter = {
		trigger: makeProxy("triggerHandler"),
		on: makeProxy("on"),
		off: makeProxy("off")
	};
}(jQuery));

// mixin event emitter
jQuery.extend(SliderPuzzle.prototype, $.eventEmitter);
