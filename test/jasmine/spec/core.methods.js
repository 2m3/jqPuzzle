describe("Methods: ", function() {

	var puzzle;

	var ROW_INVALID       = 'invalid row';
	var COL_INVALID       = 'invalid col';
	var INDEX_INVALID     = 'invalid index';
	var NUMBER_INVALID    = 'invalid number';
	var DIRECTION_INVALID = 'invalid direction';

	// a 3x3 board with 0 replaced for 9, solved
	var board3x3 = [1,	2,	3,
					4,	5,	6,
					7,	8,	0];

	// positions on a 3x3 board
	var positions3x3 = {
		topLeft:      { index: 1, row: 1, col: 1 },
		topMiddle:    { index: 2, row: 1, col: 2 },
		topRight:     { index: 3, row: 1, col: 3 },
		middleLeft:   { index: 4, row: 2, col: 1 },
		middleMiddle: { index: 5, row: 2, col: 2 },
		middleRight:  { index: 6, row: 2, col: 3 },
		bottomLeft:   { index: 7, row: 3, col: 1 },
		bottomMiddle: { index: 8, row: 3, col: 2 },
		bottomRight:  { index: 9, row: 3, col: 3 }
	};

	// positions on a 3x3 board
	var pieces3x3 = {
		topLeft:      { number: 1, position: positions3x3.topLeft      },
		topMiddle:    { number: 2, position: positions3x3.topMiddle    },
		topRight:     { number: 3, position: positions3x3.topRight     },
		middleLeft:   { number: 4, position: positions3x3.middleLeft   },
		middleMiddle: { number: 5, position: positions3x3.middleMiddle },
		middleRight:  { number: 6, position: positions3x3.middleRight  },
		bottomLeft:   { number: 7, position: positions3x3.bottomLeft   },
		bottomMiddle: { number: 8, position: positions3x3.bottomMiddle },
		bottomRight:  { number: 0, position: positions3x3.bottomRight  }
	};

	describe("Shuffle and reset: ", function() {

		describe("shuffle()", function() {
			var board;

			it("should shuffle the pieces on the board when called after initializing the puzzle with the shuffle option not specified", function() {
				puzzle = new SliderPuzzle();

				board = puzzle._board;

				puzzle.shuffle();
				expect(puzzle._board).not.toEqual(board);
			});

			it("should shuffle the pieces on the board when called after initializing the puzzle with the shuffle option set to false", function() {
				puzzle = new SliderPuzzle({
					shuffle: false
				});

				board = puzzle._board;

				puzzle.shuffle();
				expect(puzzle._board).not.toEqual(board);
			});

			it("should shuffle the pieces on the board when called after initializing the puzzle with the shuffle option set to 0", function() {
				puzzle = new SliderPuzzle({
					shuffle: 0
				});

				board = puzzle._board;

				puzzle.shuffle();
				expect(puzzle._board).not.toEqual(board);
			});

			it("should throw an exception if the shuffle value is invalid", function() {
				var SHUFFLE_INVALID = "invalid shuffle value";

				puzzle = new SliderPuzzle();
				expect(function() { puzzle.shuffle(null); }).toThrow(SHUFFLE_INVALID);

				puzzle = new SliderPuzzle({
					shuffle: false
				});
				expect(function() { puzzle.shuffle(null); }).toThrow(SHUFFLE_INVALID);

				puzzle = new SliderPuzzle({
					shuffle: 4
				});
				expect(function() { puzzle.shuffle(null); }).toThrow(SHUFFLE_INVALID);
			});
		});

		describe("reset()", function() {
			it("should throw an exception if the puzzle was not previously shuffled", function() {
				puzzle = new SliderPuzzle({
					shuffle: false
				});
				expect(function() { puzzle.reset(); }).toThrow('board must be shuffled first');

				puzzle.shuffle();
				expect(function() { puzzle.reset(); }).not.toThrow();
			});
		});
	});

	describe("Solving: ", function() {

		describe("isSolvable()", function() {
			it("should identify puzzles without a board option as solvable", function() {
				var rows;
				var cols;
				var hole;
				var initialHole;
				var boardSize;

				for (rows = 2; rows <= 5; rows++) {
					for (cols = 2; cols <= 5; cols++) {
						boardSize = rows * cols;
						for (hole = 1; hole <= boardSize; hole++) {
							for (initialHole = 1; initialHole <= boardSize; initialHole++) {
								puzzle = new SliderPuzzle({
									rows: rows,
									cols: cols,
									hole: hole,
									initialHole: initialHole
								});
								expect(puzzle.isSolvable()).toEqual(true);
							}
						}
					}
				}
			});

			it("should only identify solvable boards as solvable", function() {
				puzzle = new SliderPuzzle({
					board: [0,	2,
							3,	4]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [0,	2,
							4,	3]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [2,	0,
							3,	4]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [2,	0,
							4,	3]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [3,	2,
							0,	4]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [2,	3,
							0,	4]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [2,	4,
							3,	0]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [4,	2,
							3,	0]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [0,	1,
							3,	4]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [0,	1,
							4,	3]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [1,	0,
							3,	4]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [1,	0,
							4,	3]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [3,	1,
							0,	4]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [1,	3,
							0,	4]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [1,	4,
							3,	0]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [4,	1,
							3,	0]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [0,	2,
							1,	4]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [0,	2,
							4,	1]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [2,	0,
							1,	4]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [2,	0,
							4,	1]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [1,	2,
							0,	4]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [2,	1,
							0,	4]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [2,	4,
							1,	0]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [4,	2,
							1,	0]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [0,	2,
							1,	3]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [0,	2,
							3,	1]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [2,	0,
							1,	3]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [2,	0,
							3,	1]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [1,	2,
							0,	3]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [2,	1,
							0,	3]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [1,	2,
							3,	0]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [2,	1,
							3,	0]
				});
				expect(puzzle.isSolvable()).toEqual(false);
			});

			it("should throw an exception if the signature calculation fails due to a big board", function() {
				puzzle = new SliderPuzzle({
					rows: 15,
					cols: 15,
					solvable: 'random'
				});
				expect(function() { puzzle.isSolvable(); }).toThrow('board could not be checked for solvability');
			});
		});

		describe("isSolved()", function() {
			it("should identify a solved board as solved", function() {
				puzzle = new SliderPuzzle({
					board: [1,	2,
							3,	0]
				});
				expect(puzzle.isSolved()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [1,	2,
							0,	4]
				});
				expect(puzzle.isSolved()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [1,	2,	3,
							4,	5,	0],
					rows: 2
				});
				expect(puzzle.isSolved()).toEqual(true);
			});

			it("should not identify a unsolved board as solved", function() {
				puzzle = new SliderPuzzle({
					board: [1,	2,
							0,	3]
				});
				expect(puzzle.isSolved()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [1,	2,
							4,	0]
				});
				expect(puzzle.isSolved()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [1,	2,	3,
							4,	0,	5],
					rows: 2
				});
				expect(puzzle.isSolved()).toEqual(false);
			});
		});
	});

	describe("Positions: ", function() {
		beforeEach(function() {
			puzzle = new SliderPuzzle({
				board: board3x3
			});
		});

		describe("getPosition()", function() {
			it("should return a position based on a one-dimensional index", function() {
				expect(puzzle.getPosition(1)).toEqual(positions3x3.topLeft     );
				expect(puzzle.getPosition(2)).toEqual(positions3x3.topMiddle   );
				expect(puzzle.getPosition(3)).toEqual(positions3x3.topRight    );
				expect(puzzle.getPosition(4)).toEqual(positions3x3.middleLeft  );
				expect(puzzle.getPosition(5)).toEqual(positions3x3.middleMiddle);
				expect(puzzle.getPosition(6)).toEqual(positions3x3.middleRight );
				expect(puzzle.getPosition(7)).toEqual(positions3x3.bottomLeft  );
				expect(puzzle.getPosition(8)).toEqual(positions3x3.bottomMiddle);
				expect(puzzle.getPosition(9)).toEqual(positions3x3.bottomRight );
			});

			it("should return a position based on row and col passed in as seperate arguments", function() {
				expect(puzzle.getPosition(1, 1)).toEqual(positions3x3.topLeft     );
				expect(puzzle.getPosition(1, 2)).toEqual(positions3x3.topMiddle   );
				expect(puzzle.getPosition(1, 3)).toEqual(positions3x3.topRight    );
				expect(puzzle.getPosition(2, 1)).toEqual(positions3x3.middleLeft  );
				expect(puzzle.getPosition(2, 2)).toEqual(positions3x3.middleMiddle);
				expect(puzzle.getPosition(2, 3)).toEqual(positions3x3.middleRight );
				expect(puzzle.getPosition(3, 1)).toEqual(positions3x3.bottomLeft  );
				expect(puzzle.getPosition(3, 2)).toEqual(positions3x3.bottomMiddle);
				expect(puzzle.getPosition(3, 3)).toEqual(positions3x3.bottomRight );
			});

			it("should return a position based on row and col passed in as an array", function() {
				expect(puzzle.getPosition([1, 1])).toEqual(positions3x3.topLeft     );
				expect(puzzle.getPosition([1, 2])).toEqual(positions3x3.topMiddle   );
				expect(puzzle.getPosition([1, 3])).toEqual(positions3x3.topRight    );
				expect(puzzle.getPosition([2, 1])).toEqual(positions3x3.middleLeft  );
				expect(puzzle.getPosition([2, 2])).toEqual(positions3x3.middleMiddle);
				expect(puzzle.getPosition([2, 3])).toEqual(positions3x3.middleRight );
				expect(puzzle.getPosition([3, 1])).toEqual(positions3x3.bottomLeft  );
				expect(puzzle.getPosition([3, 2])).toEqual(positions3x3.bottomMiddle);
				expect(puzzle.getPosition([3, 3])).toEqual(positions3x3.bottomRight );
			});

			it("should return a position based on row and col passed in as an object", function() {
				expect(puzzle.getPosition({ row: 1, col: 1 })).toEqual(positions3x3.topLeft     );
				expect(puzzle.getPosition({ row: 1, col: 2 })).toEqual(positions3x3.topMiddle   );
				expect(puzzle.getPosition({ row: 1, col: 3 })).toEqual(positions3x3.topRight    );
				expect(puzzle.getPosition({ row: 2, col: 1 })).toEqual(positions3x3.middleLeft  );
				expect(puzzle.getPosition({ row: 2, col: 2 })).toEqual(positions3x3.middleMiddle);
				expect(puzzle.getPosition({ row: 2, col: 3 })).toEqual(positions3x3.middleRight );
				expect(puzzle.getPosition({ row: 3, col: 1 })).toEqual(positions3x3.bottomLeft  );
				expect(puzzle.getPosition({ row: 3, col: 2 })).toEqual(positions3x3.bottomMiddle);
				expect(puzzle.getPosition({ row: 3, col: 3 })).toEqual(positions3x3.bottomRight );
			});

			it("should throw an exception if the arguments are invalid", function() {
				expect(function() { puzzle.getPosition(-1); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.getPosition( 0); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.getPosition(10); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.getPosition(-1, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPosition( 0, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPosition(10, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPosition(1, -1); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPosition(1,  0); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPosition(1, 10); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPosition([-1, 1]); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPosition([ 0, 1]); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPosition([10, 1]); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPosition([1, -1]); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPosition([1,  0]); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPosition([1, 10]); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPosition({ row: -1, col:  1 }); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPosition({ row:  0, col:  1 }); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPosition({ row: 10, col:  1 }); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPosition({ row:  1, col: -1 }); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPosition({ row:  1, col:  0 }); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPosition({ row:  1, col: 10 }); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPosition(null); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.getPosition(    ); }).toThrow(INDEX_INVALID);
			});
		});

		describe("_getPositionByIndex()", function() {
			it("should return a position based on a one-dimensional index", function() {
				expect(puzzle._getPositionByIndex(1)).toEqual(positions3x3.topLeft     );
				expect(puzzle._getPositionByIndex(2)).toEqual(positions3x3.topMiddle   );
				expect(puzzle._getPositionByIndex(3)).toEqual(positions3x3.topRight    );
				expect(puzzle._getPositionByIndex(4)).toEqual(positions3x3.middleLeft  );
				expect(puzzle._getPositionByIndex(5)).toEqual(positions3x3.middleMiddle);
				expect(puzzle._getPositionByIndex(6)).toEqual(positions3x3.middleRight );
				expect(puzzle._getPositionByIndex(7)).toEqual(positions3x3.bottomLeft  );
				expect(puzzle._getPositionByIndex(8)).toEqual(positions3x3.bottomMiddle);
				expect(puzzle._getPositionByIndex(9)).toEqual(positions3x3.bottomRight );
			});

			it("should throw an exception if the one-dimensional index is out of bounds", function() {
				expect(function() { puzzle._getPositionByIndex(-1); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle._getPositionByIndex( 0); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle._getPositionByIndex(10); }).toThrow(INDEX_INVALID);
			});
		});

		describe("_getPositionByRowCol()", function() {
			it("should return a position based on row and col numbers", function() {
				expect(puzzle._getPositionByRowCol(1, 1)).toEqual(positions3x3.topLeft     );
				expect(puzzle._getPositionByRowCol(1, 2)).toEqual(positions3x3.topMiddle   );
				expect(puzzle._getPositionByRowCol(1, 3)).toEqual(positions3x3.topRight    );
				expect(puzzle._getPositionByRowCol(2, 1)).toEqual(positions3x3.middleLeft  );
				expect(puzzle._getPositionByRowCol(2, 2)).toEqual(positions3x3.middleMiddle);
				expect(puzzle._getPositionByRowCol(2, 3)).toEqual(positions3x3.middleRight );
				expect(puzzle._getPositionByRowCol(3, 1)).toEqual(positions3x3.bottomLeft  );
				expect(puzzle._getPositionByRowCol(3, 2)).toEqual(positions3x3.bottomMiddle);
				expect(puzzle._getPositionByRowCol(3, 3)).toEqual(positions3x3.bottomRight );
			});

			it("should throw an exception if the row or col value is out of bounds", function() {
				expect(function() { puzzle._getPositionByRowCol(-1, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle._getPositionByRowCol( 0, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle._getPositionByRowCol(10, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle._getPositionByRowCol(1, -1); }).toThrow(COL_INVALID);
				expect(function() { puzzle._getPositionByRowCol(1,  0); }).toThrow(COL_INVALID);
				expect(function() { puzzle._getPositionByRowCol(1, 10); }).toThrow(COL_INVALID);
			});
		});

		describe("_isValidIndex()", function() {
			it("should only return false if the one-dimensional index is out of bounds", function() {
				expect(puzzle._isValidIndex( 1)).toEqual(true );
				expect(puzzle._isValidIndex( 2)).toEqual(true );
				expect(puzzle._isValidIndex( 3)).toEqual(true );
				expect(puzzle._isValidIndex( 4)).toEqual(true );
				expect(puzzle._isValidIndex( 5)).toEqual(true );
				expect(puzzle._isValidIndex( 6)).toEqual(true );
				expect(puzzle._isValidIndex( 7)).toEqual(true );
				expect(puzzle._isValidIndex( 8)).toEqual(true );
				expect(puzzle._isValidIndex( 9)).toEqual(true );
				expect(puzzle._isValidIndex(-1)).toEqual(false);
				expect(puzzle._isValidIndex( 0)).toEqual(false);
				expect(puzzle._isValidIndex(10)).toEqual(false);
			});
		});

		describe("_isValidRow()", function() {
			it("should only return false if the rows value is out of bounds", function() {
				expect(puzzle._isValidRow( 1)).toEqual(true );
				expect(puzzle._isValidRow( 2)).toEqual(true );
				expect(puzzle._isValidRow( 3)).toEqual(true );
				expect(puzzle._isValidRow(-1)).toEqual(false);
				expect(puzzle._isValidRow( 0)).toEqual(false);
				expect(puzzle._isValidRow(10)).toEqual(false);
			});
		});

		describe("_isValidCol()", function() {
			it("should only return false if the cols value is out of bounds", function() {
				expect(puzzle._isValidCol( 1)).toEqual(true );
				expect(puzzle._isValidCol( 2)).toEqual(true );
				expect(puzzle._isValidCol( 3)).toEqual(true );
				expect(puzzle._isValidCol(-1)).toEqual(false);
				expect(puzzle._isValidCol( 0)).toEqual(false);
				expect(puzzle._isValidCol(10)).toEqual(false);
			});
		});

		describe("_getPositionByTargetAndDirection()", function() {
			it("should only return the positions for left and up moves if the hole is top left", function() {
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.topLeft, 'left' )).toEqual(positions3x3.topMiddle );
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.topLeft, 'right')).toEqual(false);
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.topLeft, 'up'   )).toEqual(positions3x3.middleLeft);
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.topLeft, 'down' )).toEqual(false);
			});

			it("should only return the positions for left, right and up moves if the hole is top middle", function() {
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.topMiddle, 'up'   )).toEqual(positions3x3.middleMiddle);
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.topMiddle, 'down' )).toEqual(false);
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.topMiddle, 'left' )).toEqual(positions3x3.topRight    );
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.topMiddle, 'right')).toEqual(positions3x3.topLeft     );
			});

			it("should only return the positions for right and up moves if the hole is top right", function() {
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.topRight, 'up'   )).toEqual(positions3x3.middleRight );
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.topRight, 'down' )).toEqual(false);
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.topRight, 'left' )).toEqual(false);
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.topRight, 'right')).toEqual(positions3x3.topMiddle   );
			});

			it("should only return the positions for left, up and down moves if the hole is middle left", function() {
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleLeft, 'up'   )).toEqual(positions3x3.bottomLeft  );
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleLeft, 'down' )).toEqual(positions3x3.topLeft     );
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleLeft, 'left' )).toEqual(positions3x3.middleMiddle);
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleLeft, 'right')).toEqual(false);
			});

			it("should return the positions for left, right, up and down moves if the hole is middle middle", function() {
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleMiddle, 'up'   )).toEqual(positions3x3.bottomMiddle);
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleMiddle, 'down' )).toEqual(positions3x3.topMiddle   );
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleMiddle, 'left' )).toEqual(positions3x3.middleRight );
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleMiddle, 'right')).toEqual(positions3x3.middleLeft  );
			});

			it("should only return the positions for right, up and down moves if the hole is middle right", function() {
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleRight, 'up'   )).toEqual(positions3x3.bottomRight );
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleRight, 'down' )).toEqual(positions3x3.topRight    );
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleRight, 'left' )).toEqual(false);
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleRight, 'right')).toEqual(positions3x3.middleMiddle);
			});

			it("should only return the positions for left and down moves if the hole is bottom left", function() {
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomLeft, 'up'   )).toEqual(false);
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomLeft, 'down' )).toEqual(positions3x3.middleLeft  );
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomLeft, 'left' )).toEqual(positions3x3.bottomMiddle);
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomLeft, 'right')).toEqual(false);
			});

			it("should only return the positions for left, right and down moves if the hole is bottom middle", function() {
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomMiddle, 'up'   )).toEqual(false);
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomMiddle, 'down' )).toEqual(positions3x3.middleMiddle);
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomMiddle, 'left' )).toEqual(positions3x3.bottomRight );
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomMiddle, 'right')).toEqual(positions3x3.bottomLeft  );
			});

			it("should only return the positions for left and down moves if the hole is bottom right", function() {
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomRight, 'up'   )).toEqual(false);
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomRight, 'down' )).toEqual(positions3x3.middleRight );
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomRight, 'left' )).toEqual(false);
				expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomRight, 'right')).toEqual(positions3x3.bottomMiddle);
			});
		});
	});

	describe("Pieces: ", function() {
		beforeEach(function() {
			puzzle = new SliderPuzzle({
				board: board3x3
			});
		});

		describe("getPiece()", function() {
			it("should return a piece based on a one-dimensional index", function() {
				expect(puzzle.getPiece(1)).toEqual(pieces3x3.topLeft     );
				expect(puzzle.getPiece(2)).toEqual(pieces3x3.topMiddle   );
				expect(puzzle.getPiece(3)).toEqual(pieces3x3.topRight    );
				expect(puzzle.getPiece(4)).toEqual(pieces3x3.middleLeft  );
				expect(puzzle.getPiece(5)).toEqual(pieces3x3.middleMiddle);
				expect(puzzle.getPiece(6)).toEqual(pieces3x3.middleRight );
				expect(puzzle.getPiece(7)).toEqual(pieces3x3.bottomLeft  );
				expect(puzzle.getPiece(8)).toEqual(pieces3x3.bottomMiddle);
				expect(puzzle.getPiece(9)).toEqual(pieces3x3.bottomRight );
			});

			it("should return a piece based on row and col passed in as seperate arguments", function() {
				expect(puzzle.getPiece(1, 1)).toEqual(pieces3x3.topLeft     );
				expect(puzzle.getPiece(1, 2)).toEqual(pieces3x3.topMiddle   );
				expect(puzzle.getPiece(1, 3)).toEqual(pieces3x3.topRight    );
				expect(puzzle.getPiece(2, 1)).toEqual(pieces3x3.middleLeft  );
				expect(puzzle.getPiece(2, 2)).toEqual(pieces3x3.middleMiddle);
				expect(puzzle.getPiece(2, 3)).toEqual(pieces3x3.middleRight );
				expect(puzzle.getPiece(3, 1)).toEqual(pieces3x3.bottomLeft  );
				expect(puzzle.getPiece(3, 2)).toEqual(pieces3x3.bottomMiddle);
				expect(puzzle.getPiece(3, 3)).toEqual(pieces3x3.bottomRight );
			});

			it("should return a piece based on row and col passed in as an array", function() {
				expect(puzzle.getPiece([1, 1])).toEqual(pieces3x3.topLeft     );
				expect(puzzle.getPiece([1, 2])).toEqual(pieces3x3.topMiddle   );
				expect(puzzle.getPiece([1, 3])).toEqual(pieces3x3.topRight    );
				expect(puzzle.getPiece([2, 1])).toEqual(pieces3x3.middleLeft  );
				expect(puzzle.getPiece([2, 2])).toEqual(pieces3x3.middleMiddle);
				expect(puzzle.getPiece([2, 3])).toEqual(pieces3x3.middleRight );
				expect(puzzle.getPiece([3, 1])).toEqual(pieces3x3.bottomLeft  );
				expect(puzzle.getPiece([3, 2])).toEqual(pieces3x3.bottomMiddle);
				expect(puzzle.getPiece([3, 3])).toEqual(pieces3x3.bottomRight );
			});

			it("should return a piece based on row and col passed in as an object", function() {
				expect(puzzle.getPiece({ row: 1, col: 1 })).toEqual(pieces3x3.topLeft     );
				expect(puzzle.getPiece({ row: 1, col: 2 })).toEqual(pieces3x3.topMiddle   );
				expect(puzzle.getPiece({ row: 1, col: 3 })).toEqual(pieces3x3.topRight    );
				expect(puzzle.getPiece({ row: 2, col: 1 })).toEqual(pieces3x3.middleLeft  );
				expect(puzzle.getPiece({ row: 2, col: 2 })).toEqual(pieces3x3.middleMiddle);
				expect(puzzle.getPiece({ row: 2, col: 3 })).toEqual(pieces3x3.middleRight );
				expect(puzzle.getPiece({ row: 3, col: 1 })).toEqual(pieces3x3.bottomLeft  );
				expect(puzzle.getPiece({ row: 3, col: 2 })).toEqual(pieces3x3.bottomMiddle);
				expect(puzzle.getPiece({ row: 3, col: 3 })).toEqual(pieces3x3.bottomRight );
			});

			it("should throw an exception if the arguments are invalid", function() {
				expect(function() { puzzle.getPiece(-1); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.getPiece( 0); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.getPiece(10); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.getPiece(-1, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPiece( 0, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPiece(10, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPiece(1, -1); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPiece(1,  0); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPiece(1, 10); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPiece([-1, 1]); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPiece([ 0, 1]); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPiece([10, 1]); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPiece([1, -1]); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPiece([1,  0]); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPiece([1, 10]); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPiece({ row: -1, col:  1 }); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPiece({ row:  0, col:  1 }); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPiece({ row: 10, col:  1 }); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPiece({ row:  1, col: -1 }); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPiece({ row:  1, col:  0 }); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPiece({ row:  1, col: 10 }); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPiece(null); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.getPiece(    ); }).toThrow(INDEX_INVALID);
			});
		});

		describe("getPieceByNumber()", function() {
			it("should return a piece based on its number", function() {
				expect(puzzle.getPieceByNumber(1)).toEqual(pieces3x3.topLeft     );
				expect(puzzle.getPieceByNumber(2)).toEqual(pieces3x3.topMiddle   );
				expect(puzzle.getPieceByNumber(3)).toEqual(pieces3x3.topRight    );
				expect(puzzle.getPieceByNumber(4)).toEqual(pieces3x3.middleLeft  );
				expect(puzzle.getPieceByNumber(5)).toEqual(pieces3x3.middleMiddle);
				expect(puzzle.getPieceByNumber(6)).toEqual(pieces3x3.middleRight );
				expect(puzzle.getPieceByNumber(7)).toEqual(pieces3x3.bottomLeft  );
				expect(puzzle.getPieceByNumber(8)).toEqual(pieces3x3.bottomMiddle);
				expect(puzzle.getPieceByNumber(0)).toEqual(pieces3x3.bottomRight );
			});

			it("should throw an exception if the number is invalid", function() {
				expect(function() { puzzle.getPieceByNumber(-1  ); }).toThrow(NUMBER_INVALID);
				expect(function() { puzzle.getPieceByNumber( 9  ); }).toThrow(NUMBER_INVALID);
				expect(function() { puzzle.getPieceByNumber(10  ); }).toThrow(NUMBER_INVALID);
				expect(function() { puzzle.getPieceByNumber(null); }).toThrow(NUMBER_INVALID);
				expect(function() { puzzle.getPieceByNumber(    ); }).toThrow(NUMBER_INVALID);
			});
		});

		describe("getPieceByDirection()", function() {
			it("should only return the pieces for left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual({ number: 3, position: positions3x3.middleLeft   });
				expect(puzzle.getPieceByDirection('down' )).toEqual(false);
				expect(puzzle.getPieceByDirection('left' )).toEqual({ number: 1, position: positions3x3.topMiddle    });
				expect(puzzle.getPieceByDirection('right')).toEqual(false);
			});

			it("should only return the pieces for left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual({ number: 4, position: positions3x3.middleMiddle });
				expect(puzzle.getPieceByDirection('down' )).toEqual(false);
				expect(puzzle.getPieceByDirection('left' )).toEqual({ number: 2, position: positions3x3.topRight     });
				expect(puzzle.getPieceByDirection('right')).toEqual({ number: 1, position: positions3x3.topLeft      });
			});

			it("should only return the pieces for right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual({ number: 5, position: positions3x3.middleRight  });
				expect(puzzle.getPieceByDirection('down' )).toEqual(false);
				expect(puzzle.getPieceByDirection('left' )).toEqual(false);
				expect(puzzle.getPieceByDirection('right')).toEqual({ number: 2, position: positions3x3.topMiddle    });
			});

			it("should only return the pieces for left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual({ number: 6, position: positions3x3.bottomLeft   });
				expect(puzzle.getPieceByDirection('down' )).toEqual({ number: 1, position: positions3x3.topLeft      });
				expect(puzzle.getPieceByDirection('left' )).toEqual({ number: 4, position: positions3x3.middleMiddle });
				expect(puzzle.getPieceByDirection('right')).toEqual(false);
			});

			it("should return the pieces for left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual({ number: 7, position: positions3x3.bottomMiddle });
				expect(puzzle.getPieceByDirection('down' )).toEqual({ number: 2, position: positions3x3.topMiddle    });
				expect(puzzle.getPieceByDirection('left' )).toEqual({ number: 5, position: positions3x3.middleRight  });
				expect(puzzle.getPieceByDirection('right')).toEqual({ number: 4, position: positions3x3.middleLeft   });
			});

			it("should only return the pieces for right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual({ number: 8, position: positions3x3.bottomRight  });
				expect(puzzle.getPieceByDirection('down' )).toEqual({ number: 3, position: positions3x3.topRight     });
				expect(puzzle.getPieceByDirection('left' )).toEqual(false);
				expect(puzzle.getPieceByDirection('right')).toEqual({ number: 5, position: positions3x3.middleMiddle });
			});

			it("should only return the pieces for left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual(false);
				expect(puzzle.getPieceByDirection('down' )).toEqual({ number: 4, position: positions3x3.middleLeft   });
				expect(puzzle.getPieceByDirection('left' )).toEqual({ number: 7, position: positions3x3.bottomMiddle });
				expect(puzzle.getPieceByDirection('right')).toEqual(false);
			});

			it("should only return the pieces for left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual(false);
				expect(puzzle.getPieceByDirection('down' )).toEqual({ number: 5, position: positions3x3.middleMiddle });
				expect(puzzle.getPieceByDirection('left' )).toEqual({ number: 8, position: positions3x3.bottomRight  });
				expect(puzzle.getPieceByDirection('right')).toEqual({ number: 7, position: positions3x3.bottomLeft   });
			});

			it("should only return the pieces for left and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual(false);
				expect(puzzle.getPieceByDirection('down' )).toEqual({ number: 6, position: positions3x3.middleRight  });
				expect(puzzle.getPieceByDirection('left' )).toEqual(false);
				expect(puzzle.getPieceByDirection('right')).toEqual({ number: 8, position: positions3x3.bottomMiddle });
			});

			it("should throw an exception if the direction is invalid", function() {
				expect(function() { puzzle.getPieceByDirection('uup'); }).toThrow(DIRECTION_INVALID);
				expect(function() { puzzle.getPieceByDirection(''   ); }).toThrow(DIRECTION_INVALID);
				expect(function() { puzzle.getPieceByDirection(null ); }).toThrow(DIRECTION_INVALID);
				expect(function() { puzzle.getPieceByDirection(     ); }).toThrow(DIRECTION_INVALID);
			});
		});
	});

	describe("Moves: ", function() {

		describe("canMove()", function() {
			it("should only allow left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
				expect(puzzle.canMove(5)).toEqual(false);
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual(false);

				expect(puzzle.canMove(1, 1)).toEqual(false);
				expect(puzzle.canMove(1, 2)).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
				expect(puzzle.canMove(1, 3)).toEqual(false);
				expect(puzzle.canMove(2, 1)).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
				expect(puzzle.canMove(2, 2)).toEqual(false);
				expect(puzzle.canMove(2, 3)).toEqual(false);
				expect(puzzle.canMove(3, 1)).toEqual(false);
				expect(puzzle.canMove(3, 2)).toEqual(false);
				expect(puzzle.canMove(3, 3)).toEqual(false);

				expect(puzzle.canMove([1, 1])).toEqual(false);
				expect(puzzle.canMove([1, 2])).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
				expect(puzzle.canMove([1, 3])).toEqual(false);
				expect(puzzle.canMove([2, 1])).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
				expect(puzzle.canMove([2, 2])).toEqual(false);
				expect(puzzle.canMove([2, 3])).toEqual(false);
				expect(puzzle.canMove([3, 1])).toEqual(false);
				expect(puzzle.canMove([3, 2])).toEqual(false);
				expect(puzzle.canMove([3, 3])).toEqual(false);

				expect(puzzle.canMove({ row: 1, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 1, col: 2 })).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
				expect(puzzle.canMove({ row: 1, col: 3 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 1 })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
				expect(puzzle.canMove({ row: 2, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 3 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 3 })).toEqual(false);
			});

			it("should allow left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
				expect(puzzle.canMove(2)).toEqual(false);
				expect(puzzle.canMove(3)).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
				expect(puzzle.canMove(4)).toEqual(false);
				expect(puzzle.canMove(5)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual(false);

				expect(puzzle.canMove(1, 1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
				expect(puzzle.canMove(1, 2)).toEqual(false);
				expect(puzzle.canMove(1, 3)).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
				expect(puzzle.canMove(2, 1)).toEqual(false);
				expect(puzzle.canMove(2, 2)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
				expect(puzzle.canMove(2, 3)).toEqual(false);
				expect(puzzle.canMove(3, 1)).toEqual(false);
				expect(puzzle.canMove(3, 2)).toEqual(false);
				expect(puzzle.canMove(3, 3)).toEqual(false);

				expect(puzzle.canMove([1, 1])).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
				expect(puzzle.canMove([1, 2])).toEqual(false);
				expect(puzzle.canMove([1, 3])).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
				expect(puzzle.canMove([2, 1])).toEqual(false);
				expect(puzzle.canMove([2, 2])).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
				expect(puzzle.canMove([2, 3])).toEqual(false);
				expect(puzzle.canMove([3, 1])).toEqual(false);
				expect(puzzle.canMove([3, 2])).toEqual(false);
				expect(puzzle.canMove([3, 3])).toEqual(false);

				expect(puzzle.canMove({ row: 1, col: 1 })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
				expect(puzzle.canMove({ row: 1, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 1, col: 3 })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
				expect(puzzle.canMove({ row: 2, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 2 })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
				expect(puzzle.canMove({ row: 2, col: 3 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 3 })).toEqual(false);
			});

			it("should only allow right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual(false);
				expect(puzzle.canMove(5)).toEqual(false);
				expect(puzzle.canMove(6)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual(false);

				expect(puzzle.canMove(1, 1)).toEqual(false);
				expect(puzzle.canMove(1, 2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
				expect(puzzle.canMove(1, 3)).toEqual(false);
				expect(puzzle.canMove(2, 1)).toEqual(false);
				expect(puzzle.canMove(2, 2)).toEqual(false);
				expect(puzzle.canMove(2, 3)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
				expect(puzzle.canMove(3, 1)).toEqual(false);
				expect(puzzle.canMove(3, 2)).toEqual(false);
				expect(puzzle.canMove(3, 3)).toEqual(false);

				expect(puzzle.canMove([1, 1])).toEqual(false);
				expect(puzzle.canMove([1, 2])).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
				expect(puzzle.canMove([1, 3])).toEqual(false);
				expect(puzzle.canMove([2, 1])).toEqual(false);
				expect(puzzle.canMove([2, 2])).toEqual(false);
				expect(puzzle.canMove([2, 3])).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
				expect(puzzle.canMove([3, 1])).toEqual(false);
				expect(puzzle.canMove([3, 2])).toEqual(false);
				expect(puzzle.canMove([3, 3])).toEqual(false);

				expect(puzzle.canMove({ row: 1, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 1, col: 2 })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
				expect(puzzle.canMove({ row: 1, col: 3 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 3 })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
				expect(puzzle.canMove({ row: 3, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 3 })).toEqual(false);
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
				expect(puzzle.canMove(2)).toEqual(false);
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual(false);
				expect(puzzle.canMove(5)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual(false);

				expect(puzzle.canMove(1, 1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
				expect(puzzle.canMove(1, 2)).toEqual(false);
				expect(puzzle.canMove(1, 3)).toEqual(false);
				expect(puzzle.canMove(2, 1)).toEqual(false);
				expect(puzzle.canMove(2, 2)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
				expect(puzzle.canMove(2, 3)).toEqual(false);
				expect(puzzle.canMove(3, 1)).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
				expect(puzzle.canMove(3, 2)).toEqual(false);
				expect(puzzle.canMove(3, 3)).toEqual(false);

				expect(puzzle.canMove([1, 1])).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
				expect(puzzle.canMove([1, 2])).toEqual(false);
				expect(puzzle.canMove([1, 3])).toEqual(false);
				expect(puzzle.canMove([2, 1])).toEqual(false);
				expect(puzzle.canMove([2, 2])).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
				expect(puzzle.canMove([2, 3])).toEqual(false);
				expect(puzzle.canMove([3, 1])).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
				expect(puzzle.canMove([3, 2])).toEqual(false);
				expect(puzzle.canMove([3, 3])).toEqual(false);

				expect(puzzle.canMove({ row: 1, col: 1 })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
				expect(puzzle.canMove({ row: 1, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 1, col: 3 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 2 })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
				expect(puzzle.canMove({ row: 2, col: 3 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 1 })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
				expect(puzzle.canMove({ row: 3, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 3 })).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
				expect(puzzle.canMove(5)).toEqual(false);
				expect(puzzle.canMove(6)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
				expect(puzzle.canMove(9)).toEqual(false);

				expect(puzzle.canMove(1, 1)).toEqual(false);
				expect(puzzle.canMove(1, 2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
				expect(puzzle.canMove(1, 3)).toEqual(false);
				expect(puzzle.canMove(2, 1)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
				expect(puzzle.canMove(2, 2)).toEqual(false);
				expect(puzzle.canMove(2, 3)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
				expect(puzzle.canMove(3, 1)).toEqual(false);
				expect(puzzle.canMove(3, 2)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
				expect(puzzle.canMove(3, 3)).toEqual(false);

				expect(puzzle.canMove([1, 1])).toEqual(false);
				expect(puzzle.canMove([1, 2])).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
				expect(puzzle.canMove([1, 3])).toEqual(false);
				expect(puzzle.canMove([2, 1])).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
				expect(puzzle.canMove([2, 2])).toEqual(false);
				expect(puzzle.canMove([2, 3])).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
				expect(puzzle.canMove([3, 1])).toEqual(false);
				expect(puzzle.canMove([3, 2])).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
				expect(puzzle.canMove([3, 3])).toEqual(false);

				expect(puzzle.canMove({ row: 1, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 1, col: 2 })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
				expect(puzzle.canMove({ row: 1, col: 3 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 1 })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
				expect(puzzle.canMove({ row: 2, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 3 })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
				expect(puzzle.canMove({ row: 3, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 2 })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
				expect(puzzle.canMove({ row: 3, col: 3 })).toEqual(false);
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual(false);
				expect(puzzle.canMove(3)).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
				expect(puzzle.canMove(4)).toEqual(false);
				expect(puzzle.canMove(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });

				expect(puzzle.canMove(1, 1)).toEqual(false);
				expect(puzzle.canMove(1, 2)).toEqual(false);
				expect(puzzle.canMove(1, 3)).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
				expect(puzzle.canMove(2, 1)).toEqual(false);
				expect(puzzle.canMove(2, 2)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
				expect(puzzle.canMove(2, 3)).toEqual(false);
				expect(puzzle.canMove(3, 1)).toEqual(false);
				expect(puzzle.canMove(3, 2)).toEqual(false);
				expect(puzzle.canMove(3, 3)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });

				expect(puzzle.canMove([1, 1])).toEqual(false);
				expect(puzzle.canMove([1, 2])).toEqual(false);
				expect(puzzle.canMove([1, 3])).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
				expect(puzzle.canMove([2, 1])).toEqual(false);
				expect(puzzle.canMove([2, 2])).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
				expect(puzzle.canMove([2, 3])).toEqual(false);
				expect(puzzle.canMove([3, 1])).toEqual(false);
				expect(puzzle.canMove([3, 2])).toEqual(false);
				expect(puzzle.canMove([3, 3])).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });

				expect(puzzle.canMove({ row: 1, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 1, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 1, col: 3 })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
				expect(puzzle.canMove({ row: 2, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 2 })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
				expect(puzzle.canMove({ row: 2, col: 3 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 3 })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual(false);
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
				expect(puzzle.canMove(5)).toEqual(false);
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
				expect(puzzle.canMove(9)).toEqual(false);

				expect(puzzle.canMove(1, 1)).toEqual(false);
				expect(puzzle.canMove(1, 2)).toEqual(false);
				expect(puzzle.canMove(1, 3)).toEqual(false);
				expect(puzzle.canMove(2, 1)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
				expect(puzzle.canMove(2, 2)).toEqual(false);
				expect(puzzle.canMove(2, 3)).toEqual(false);
				expect(puzzle.canMove(3, 1)).toEqual(false);
				expect(puzzle.canMove(3, 2)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
				expect(puzzle.canMove(3, 3)).toEqual(false);

				expect(puzzle.canMove([1, 1])).toEqual(false);
				expect(puzzle.canMove([1, 2])).toEqual(false);
				expect(puzzle.canMove([1, 3])).toEqual(false);
				expect(puzzle.canMove([2, 1])).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
				expect(puzzle.canMove([2, 2])).toEqual(false);
				expect(puzzle.canMove([2, 3])).toEqual(false);
				expect(puzzle.canMove([3, 1])).toEqual(false);
				expect(puzzle.canMove([3, 2])).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
				expect(puzzle.canMove([3, 3])).toEqual(false);

				expect(puzzle.canMove({ row: 1, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 1, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 1, col: 3 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 1 })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
				expect(puzzle.canMove({ row: 2, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 3 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 2 })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
				expect(puzzle.canMove({ row: 3, col: 3 })).toEqual(false);
			});

			it("should only allow left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual(false);
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual(false);
				expect(puzzle.canMove(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });

				expect(puzzle.canMove(1, 1)).toEqual(false);
				expect(puzzle.canMove(1, 2)).toEqual(false);
				expect(puzzle.canMove(1, 3)).toEqual(false);
				expect(puzzle.canMove(2, 1)).toEqual(false);
				expect(puzzle.canMove(2, 2)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
				expect(puzzle.canMove(2, 3)).toEqual(false);
				expect(puzzle.canMove(3, 1)).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
				expect(puzzle.canMove(3, 2)).toEqual(false);
				expect(puzzle.canMove(3, 3)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });

				expect(puzzle.canMove([1, 1])).toEqual(false);
				expect(puzzle.canMove([1, 2])).toEqual(false);
				expect(puzzle.canMove([1, 3])).toEqual(false);
				expect(puzzle.canMove([2, 1])).toEqual(false);
				expect(puzzle.canMove([2, 2])).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
				expect(puzzle.canMove([2, 3])).toEqual(false);
				expect(puzzle.canMove([3, 1])).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
				expect(puzzle.canMove([3, 2])).toEqual(false);
				expect(puzzle.canMove([3, 3])).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });

				expect(puzzle.canMove({ row: 1, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 1, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 1, col: 3 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 2 })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
				expect(puzzle.canMove({ row: 2, col: 3 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 1 })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
				expect(puzzle.canMove({ row: 3, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 3 })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });
			});

			it("should only allow right and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual(false);
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual(false);
				expect(puzzle.canMove(5)).toEqual(false);
				expect(puzzle.canMove(6)).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
				expect(puzzle.canMove(9)).toEqual(false);

				expect(puzzle.canMove(1, 1)).toEqual(false);
				expect(puzzle.canMove(1, 2)).toEqual(false);
				expect(puzzle.canMove(1, 3)).toEqual(false);
				expect(puzzle.canMove(2, 1)).toEqual(false);
				expect(puzzle.canMove(2, 2)).toEqual(false);
				expect(puzzle.canMove(2, 3)).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
				expect(puzzle.canMove(3, 1)).toEqual(false);
				expect(puzzle.canMove(3, 2)).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
				expect(puzzle.canMove(3, 3)).toEqual(false);

				expect(puzzle.canMove([1, 1])).toEqual(false);
				expect(puzzle.canMove([1, 2])).toEqual(false);
				expect(puzzle.canMove([1, 3])).toEqual(false);
				expect(puzzle.canMove([2, 1])).toEqual(false);
				expect(puzzle.canMove([2, 2])).toEqual(false);
				expect(puzzle.canMove([2, 3])).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
				expect(puzzle.canMove([3, 1])).toEqual(false);
				expect(puzzle.canMove([3, 2])).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
				expect(puzzle.canMove([3, 3])).toEqual(false);

				expect(puzzle.canMove({ row: 1, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 1, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 1, col: 3 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 2 })).toEqual(false);
				expect(puzzle.canMove({ row: 2, col: 3 })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
				expect(puzzle.canMove({ row: 3, col: 1 })).toEqual(false);
				expect(puzzle.canMove({ row: 3, col: 2 })).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
				expect(puzzle.canMove({ row: 3, col: 3 })).toEqual(false);
			});

			it("should throw an exception if the arguments are invalid", function() {
				expect(function() { puzzle.canMove(-1); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.canMove( 0); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.canMove(10); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.canMove(-1, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.canMove( 0, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.canMove(10, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.canMove(1, -1); }).toThrow(COL_INVALID);
				expect(function() { puzzle.canMove(1,  0); }).toThrow(COL_INVALID);
				expect(function() { puzzle.canMove(1, 10); }).toThrow(COL_INVALID);
				expect(function() { puzzle.canMove([-1, 1]); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.canMove([ 0, 1]); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.canMove([10, 1]); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.canMove([1, -1]); }).toThrow(COL_INVALID);
				expect(function() { puzzle.canMove([1,  0]); }).toThrow(COL_INVALID);
				expect(function() { puzzle.canMove([1, 10]); }).toThrow(COL_INVALID);
				expect(function() { puzzle.canMove({ row: -1, col:  1 }); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.canMove({ row:  0, col:  1 }); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.canMove({ row: 10, col:  1 }); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.canMove({ row:  1, col: -1 }); }).toThrow(COL_INVALID);
				expect(function() { puzzle.canMove({ row:  1, col:  0 }); }).toThrow(COL_INVALID);
				expect(function() { puzzle.canMove({ row:  1, col: 10 }); }).toThrow(COL_INVALID);
				expect(function() { puzzle.canMove(null); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.canMove(    ); }).toThrow(INDEX_INVALID);
			});
		});

		describe("canMoveByNumber()", function() {
			it("should only allow left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(1)).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
				expect(puzzle.canMoveByNumber(2)).toEqual(false);
				expect(puzzle.canMoveByNumber(3)).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
				expect(puzzle.canMoveByNumber(4)).toEqual(false);
				expect(puzzle.canMoveByNumber(5)).toEqual(false);
				expect(puzzle.canMoveByNumber(6)).toEqual(false);
				expect(puzzle.canMoveByNumber(7)).toEqual(false);
				expect(puzzle.canMoveByNumber(8)).toEqual(false);
			});

			it("should allow left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByNumber(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(2)).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
				expect(puzzle.canMoveByNumber(3)).toEqual(false);
				expect(puzzle.canMoveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
				expect(puzzle.canMoveByNumber(5)).toEqual(false);
				expect(puzzle.canMoveByNumber(6)).toEqual(false);
				expect(puzzle.canMoveByNumber(7)).toEqual(false);
				expect(puzzle.canMoveByNumber(8)).toEqual(false);
			});

			it("should only allow right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByNumber(1)).toEqual(false);
				expect(puzzle.canMoveByNumber(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(3)).toEqual(false);
				expect(puzzle.canMoveByNumber(4)).toEqual(false);
				expect(puzzle.canMoveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
				expect(puzzle.canMoveByNumber(6)).toEqual(false);
				expect(puzzle.canMoveByNumber(7)).toEqual(false);
				expect(puzzle.canMoveByNumber(8)).toEqual(false);
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByNumber(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
				expect(puzzle.canMoveByNumber(2)).toEqual(false);
				expect(puzzle.canMoveByNumber(3)).toEqual(false);
				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
				expect(puzzle.canMoveByNumber(5)).toEqual(false);
				expect(puzzle.canMoveByNumber(6)).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
				expect(puzzle.canMoveByNumber(7)).toEqual(false);
				expect(puzzle.canMoveByNumber(8)).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByNumber(1)).toEqual(false);
				expect(puzzle.canMoveByNumber(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
				expect(puzzle.canMoveByNumber(3)).toEqual(false);
				expect(puzzle.canMoveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
				expect(puzzle.canMoveByNumber(6)).toEqual(false);
				expect(puzzle.canMoveByNumber(7)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
				expect(puzzle.canMoveByNumber(8)).toEqual(false);
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle.canMoveByNumber(1)).toEqual(false);
				expect(puzzle.canMoveByNumber(2)).toEqual(false);
				expect(puzzle.canMoveByNumber(3)).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
				expect(puzzle.canMoveByNumber(4)).toEqual(false);
				expect(puzzle.canMoveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(6)).toEqual(false);
				expect(puzzle.canMoveByNumber(7)).toEqual(false);
				expect(puzzle.canMoveByNumber(8)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle.canMoveByNumber(1)).toEqual(false);
				expect(puzzle.canMoveByNumber(2)).toEqual(false);
				expect(puzzle.canMoveByNumber(3)).toEqual(false);
				expect(puzzle.canMoveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
				expect(puzzle.canMoveByNumber(5)).toEqual(false);
				expect(puzzle.canMoveByNumber(6)).toEqual(false);
				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(7)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
				expect(puzzle.canMoveByNumber(8)).toEqual(false);
			});

			it("should only allow left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle.canMoveByNumber(1)).toEqual(false);
				expect(puzzle.canMoveByNumber(2)).toEqual(false);
				expect(puzzle.canMoveByNumber(3)).toEqual(false);
				expect(puzzle.canMoveByNumber(4)).toEqual(false);
				expect(puzzle.canMoveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
				expect(puzzle.canMoveByNumber(6)).toEqual(false);
				expect(puzzle.canMoveByNumber(7)).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(8)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });
			});

			it("should only allow right and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				expect(puzzle.canMoveByNumber(1)).toEqual(false);
				expect(puzzle.canMoveByNumber(2)).toEqual(false);
				expect(puzzle.canMoveByNumber(3)).toEqual(false);
				expect(puzzle.canMoveByNumber(4)).toEqual(false);
				expect(puzzle.canMoveByNumber(5)).toEqual(false);
				expect(puzzle.canMoveByNumber(6)).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
				expect(puzzle.canMoveByNumber(7)).toEqual(false);
				expect(puzzle.canMoveByNumber(8)).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
				expect(puzzle.canMoveByNumber(0)).toEqual(false);
			});

			it("should throw an exception if the number is invalid", function() {
				expect(function() { puzzle.canMoveByNumber(-1  ); }).toThrow(NUMBER_INVALID);
				expect(function() { puzzle.canMoveByNumber( 9  ); }).toThrow(NUMBER_INVALID);
				expect(function() { puzzle.canMoveByNumber(10  ); }).toThrow(NUMBER_INVALID);
				expect(function() { puzzle.canMoveByNumber(null); }).toThrow(NUMBER_INVALID);
				expect(function() { puzzle.canMoveByNumber(    ); }).toThrow(NUMBER_INVALID);
			});
		});

		describe("canMoveByDirection()", function() {
			it("should only allow left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
				expect(puzzle.canMoveByDirection('down' )).toEqual(false);
				expect(puzzle.canMoveByDirection('left' )).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
				expect(puzzle.canMoveByDirection('right')).toEqual(false);
			});

			it("should only allow left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
				expect(puzzle.canMoveByDirection('down' )).toEqual(false);
				expect(puzzle.canMoveByDirection('left' )).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
				expect(puzzle.canMoveByDirection('right')).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
			});

			it("should only allow right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
				expect(puzzle.canMoveByDirection('down' )).toEqual(false);
				expect(puzzle.canMoveByDirection('left' )).toEqual(false);
				expect(puzzle.canMoveByDirection('right')).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
				expect(puzzle.canMoveByDirection('down' )).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
				expect(puzzle.canMoveByDirection('left' )).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
				expect(puzzle.canMoveByDirection('right')).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
				expect(puzzle.canMoveByDirection('down' )).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
				expect(puzzle.canMoveByDirection('left' )).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
				expect(puzzle.canMoveByDirection('right')).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });
				expect(puzzle.canMoveByDirection('down' )).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
				expect(puzzle.canMoveByDirection('left' )).toEqual(false);
				expect(puzzle.canMoveByDirection('right')).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual(false);
				expect(puzzle.canMoveByDirection('down' )).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
				expect(puzzle.canMoveByDirection('left' )).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
				expect(puzzle.canMoveByDirection('right')).toEqual(false);
			});

			it("should only allow left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual(false);
				expect(puzzle.canMoveByDirection('down' )).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
				expect(puzzle.canMoveByDirection('left' )).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });
				expect(puzzle.canMoveByDirection('right')).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
			});

			it("should only allow left and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual(false);
				expect(puzzle.canMoveByDirection('down' )).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
				expect(puzzle.canMoveByDirection('left' )).toEqual(false);
				expect(puzzle.canMoveByDirection('right')).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
			});

			it("should throw an exception if the direction value is invalid", function() {
				puzzle = new SliderPuzzle({
					board: board3x3
				});

				expect(function() { puzzle.canMoveByDirection('uup'); }).toThrow(DIRECTION_INVALID);
				expect(function() { puzzle.canMoveByDirection(''   ); }).toThrow(DIRECTION_INVALID);
				expect(function() { puzzle.canMoveByDirection(null ); }).toThrow(DIRECTION_INVALID);
				expect(function() { puzzle.canMoveByDirection(     ); }).toThrow(DIRECTION_INVALID);
			});
		});

		describe("_canMoveByPiece()", function() {
			it("should only allow left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.topLeft      })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topMiddle    })).toEqual({ number: 1, from: positions3x3.topMiddle,  to: positions3x3.topLeft, direction: 'left'  });
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topRight     })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual({ number: 3, from: positions3x3.middleLeft, to: positions3x3.topLeft, direction: 'up'    });
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
			});

			it("should allow left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.topMiddle    })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topRight     })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
			});

			it("should only allow right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,   to: positions3x3.topRight, direction: 'right' });
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.topRight     })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight, to: positions3x3.topRight, direction: 'up'    });
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.middleLeft   })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.middleRight  })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.bottomLeft   })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
			});

			it("should only allow left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomLeft   })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });
			});

			it("should only allow right and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomLeft   })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomMiddle })).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.bottomRight  })).toEqual(false);
			});
		});

		describe("_canMoveByMove()", function() {
			it("should only allow left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.topLeft,      to: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  })).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
				expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topRight,     to: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
				expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topLeft })).toEqual(false);
			});

			it("should allow left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
				expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.topMiddle,    to: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
				expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
				expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topMiddle })).toEqual(false);
			});

			it("should only allow right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
				expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.topRight,     to: positions3x3.topRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
				expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topRight })).toEqual(false);
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
				expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.middleLeft,   to: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
				expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
				expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleLeft })).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
				expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
				expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.middleMiddle, to: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
				expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
				expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleMiddle })).toEqual(false);
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
				expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
				expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.middleRight,  to: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
				expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.bottomLeft,   to: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
				expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomLeft })).toEqual(false);
			});

			it("should only allow left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
				expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
				expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.bottomMiddle, to: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });
			});

			it("should only allow right and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
				expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomRight })).toEqual(false);
				expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' })).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
				expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.bottomRight,  to: positions3x3.bottomRight })).toEqual(false);
			});
		});

		describe("move()", function() {
			it("should only allow left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.move(1)).toEqual(false);
				expect(puzzle.move(2)).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle.move(3)).toEqual(false);
				expect(puzzle.move(4)).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle.move(5)).toEqual(false);
				expect(puzzle.move(6)).toEqual(false);
				expect(puzzle.move(7)).toEqual(false);
				expect(puzzle.move(8)).toEqual(false);
				expect(puzzle.move(9)).toEqual(false);

				expect(puzzle.move(1, 1)).toEqual(false);
				expect(puzzle.move(1, 2)).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle.move(1, 3)).toEqual(false);
				expect(puzzle.move(2, 1)).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle.move(2, 2)).toEqual(false);
				expect(puzzle.move(2, 3)).toEqual(false);
				expect(puzzle.move(3, 1)).toEqual(false);
				expect(puzzle.move(3, 2)).toEqual(false);
				expect(puzzle.move(3, 3)).toEqual(false);

				expect(puzzle.move([1, 1])).toEqual(false);
				expect(puzzle.move([1, 2])).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle.move([1, 3])).toEqual(false);
				expect(puzzle.move([2, 1])).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle.move([2, 2])).toEqual(false);
				expect(puzzle.move([2, 3])).toEqual(false);
				expect(puzzle.move([3, 1])).toEqual(false);
				expect(puzzle.move([3, 2])).toEqual(false);
				expect(puzzle.move([3, 3])).toEqual(false);

				expect(puzzle.move({ row: 1, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 1, col: 2 })).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle.move({ row: 1, col: 3 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 1 })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle.move({ row: 2, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 3 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 3 })).toEqual(false);
			});

			it("should allow left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.move(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.move(2)).toEqual(false);
				expect(puzzle.move(3)).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.move(4)).toEqual(false);
				expect(puzzle.move(5)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.move(6)).toEqual(false);
				expect(puzzle.move(7)).toEqual(false);
				expect(puzzle.move(8)).toEqual(false);
				expect(puzzle.move(9)).toEqual(false);

				expect(puzzle.move(1, 1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.move(1, 2)).toEqual(false);
				expect(puzzle.move(1, 3)).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.move(2, 1)).toEqual(false);
				expect(puzzle.move(2, 2)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.move(2, 3)).toEqual(false);
				expect(puzzle.move(3, 1)).toEqual(false);
				expect(puzzle.move(3, 2)).toEqual(false);
				expect(puzzle.move(3, 3)).toEqual(false);

				expect(puzzle.move([1, 1])).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.move([1, 2])).toEqual(false);
				expect(puzzle.move([1, 3])).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.move([2, 1])).toEqual(false);
				expect(puzzle.move([2, 2])).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.move([2, 3])).toEqual(false);
				expect(puzzle.move([3, 1])).toEqual(false);
				expect(puzzle.move([3, 2])).toEqual(false);
				expect(puzzle.move([3, 3])).toEqual(false);

				expect(puzzle.move({ row: 1, col: 1 })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.move({ row: 1, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 1, col: 3 })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.move({ row: 2, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 2 })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.move({ row: 2, col: 3 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 3 })).toEqual(false);
			});

			it("should only allow right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.move(1)).toEqual(false);
				expect(puzzle.move(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle.move(3)).toEqual(false);
				expect(puzzle.move(4)).toEqual(false);
				expect(puzzle.move(5)).toEqual(false);
				expect(puzzle.move(6)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle.move(7)).toEqual(false);
				expect(puzzle.move(8)).toEqual(false);
				expect(puzzle.move(9)).toEqual(false);

				expect(puzzle.move(1, 1)).toEqual(false);
				expect(puzzle.move(1, 2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle.move(1, 3)).toEqual(false);
				expect(puzzle.move(2, 1)).toEqual(false);
				expect(puzzle.move(2, 2)).toEqual(false);
				expect(puzzle.move(2, 3)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle.move(3, 1)).toEqual(false);
				expect(puzzle.move(3, 2)).toEqual(false);
				expect(puzzle.move(3, 3)).toEqual(false);

				expect(puzzle.move([1, 1])).toEqual(false);
				expect(puzzle.move([1, 2])).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle.move([1, 3])).toEqual(false);
				expect(puzzle.move([2, 1])).toEqual(false);
				expect(puzzle.move([2, 2])).toEqual(false);
				expect(puzzle.move([2, 3])).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle.move([3, 1])).toEqual(false);
				expect(puzzle.move([3, 2])).toEqual(false);
				expect(puzzle.move([3, 3])).toEqual(false);

				expect(puzzle.move({ row: 1, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 1, col: 2 })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle.move({ row: 1, col: 3 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 3 })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle.move({ row: 3, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 3 })).toEqual(false);
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle.move(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.move(2)).toEqual(false);
				expect(puzzle.move(3)).toEqual(false);
				expect(puzzle.move(4)).toEqual(false);
				expect(puzzle.move(5)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.move(6)).toEqual(false);
				expect(puzzle.move(7)).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.move(8)).toEqual(false);
				expect(puzzle.move(9)).toEqual(false);

				expect(puzzle.move(1, 1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.move(1, 2)).toEqual(false);
				expect(puzzle.move(1, 3)).toEqual(false);
				expect(puzzle.move(2, 1)).toEqual(false);
				expect(puzzle.move(2, 2)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.move(2, 3)).toEqual(false);
				expect(puzzle.move(3, 1)).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.move(3, 2)).toEqual(false);
				expect(puzzle.move(3, 3)).toEqual(false);

				expect(puzzle.move([1, 1])).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.move([1, 2])).toEqual(false);
				expect(puzzle.move([1, 3])).toEqual(false);
				expect(puzzle.move([2, 1])).toEqual(false);
				expect(puzzle.move([2, 2])).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.move([2, 3])).toEqual(false);
				expect(puzzle.move([3, 1])).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.move([3, 2])).toEqual(false);
				expect(puzzle.move([3, 3])).toEqual(false);

				expect(puzzle.move({ row: 1, col: 1 })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.move({ row: 1, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 1, col: 3 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 2 })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.move({ row: 2, col: 3 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 1 })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.move({ row: 3, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 3 })).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle.move(1)).toEqual(false);
				expect(puzzle.move(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move(3)).toEqual(false);
				expect(puzzle.move(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move(5)).toEqual(false);
				expect(puzzle.move(6)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move(7)).toEqual(false);
				expect(puzzle.move(8)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move(9)).toEqual(false);

				expect(puzzle.move(1, 1)).toEqual(false);
				expect(puzzle.move(1, 2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move(1, 3)).toEqual(false);
				expect(puzzle.move(2, 1)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move(2, 2)).toEqual(false);
				expect(puzzle.move(2, 3)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move(3, 1)).toEqual(false);
				expect(puzzle.move(3, 2)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move(3, 3)).toEqual(false);

				expect(puzzle.move([1, 1])).toEqual(false);
				expect(puzzle.move([1, 2])).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move([1, 3])).toEqual(false);
				expect(puzzle.move([2, 1])).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move([2, 2])).toEqual(false);
				expect(puzzle.move([2, 3])).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move([3, 1])).toEqual(false);
				expect(puzzle.move([3, 2])).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move([3, 3])).toEqual(false);

				expect(puzzle.move({ row: 1, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 1, col: 2 })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move({ row: 1, col: 3 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 1 })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move({ row: 2, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 3 })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move({ row: 3, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 2 })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move({ row: 3, col: 3 })).toEqual(false);
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle.move(1)).toEqual(false);
				expect(puzzle.move(2)).toEqual(false);
				expect(puzzle.move(3)).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle.move(4)).toEqual(false);
				expect(puzzle.move(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();expect(puzzle.move(6)).toEqual(false);
				expect(puzzle.move(7)).toEqual(false);
				expect(puzzle.move(8)).toEqual(false);
				expect(puzzle.move(9)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();

				expect(puzzle.move(1, 1)).toEqual(false);
				expect(puzzle.move(1, 2)).toEqual(false);
				expect(puzzle.move(1, 3)).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle.move(2, 1)).toEqual(false);
				expect(puzzle.move(2, 2)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle.move(2, 3)).toEqual(false);
				expect(puzzle.move(3, 1)).toEqual(false);
				expect(puzzle.move(3, 2)).toEqual(false);
				expect(puzzle.move(3, 3)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();

				expect(puzzle.move([1, 1])).toEqual(false);
				expect(puzzle.move([1, 2])).toEqual(false);
				expect(puzzle.move([1, 3])).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle.move([2, 1])).toEqual(false);
				expect(puzzle.move([2, 2])).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle.move([2, 3])).toEqual(false);
				expect(puzzle.move([3, 1])).toEqual(false);
				expect(puzzle.move([3, 2])).toEqual(false);
				expect(puzzle.move([3, 3])).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();

				expect(puzzle.move({ row: 1, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 1, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 1, col: 3 })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle.move({ row: 2, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 2 })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle.move({ row: 2, col: 3 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 3 })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle.move(1)).toEqual(false);
				expect(puzzle.move(2)).toEqual(false);
				expect(puzzle.move(3)).toEqual(false);
				expect(puzzle.move(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle.move(5)).toEqual(false);
				expect(puzzle.move(6)).toEqual(false);
				expect(puzzle.move(7)).toEqual(false);
				expect(puzzle.move(8)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle.move(9)).toEqual(false);

				expect(puzzle.move(1, 1)).toEqual(false);
				expect(puzzle.move(1, 2)).toEqual(false);
				expect(puzzle.move(1, 3)).toEqual(false);
				expect(puzzle.move(2, 1)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle.move(2, 2)).toEqual(false);
				expect(puzzle.move(2, 3)).toEqual(false);
				expect(puzzle.move(3, 1)).toEqual(false);
				expect(puzzle.move(3, 2)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle.move(3, 3)).toEqual(false);

				expect(puzzle.move([1, 1])).toEqual(false);
				expect(puzzle.move([1, 2])).toEqual(false);
				expect(puzzle.move([1, 3])).toEqual(false);
				expect(puzzle.move([2, 1])).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle.move([2, 2])).toEqual(false);
				expect(puzzle.move([2, 3])).toEqual(false);
				expect(puzzle.move([3, 1])).toEqual(false);
				expect(puzzle.move([3, 2])).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle.move([3, 3])).toEqual(false);

				expect(puzzle.move({ row: 1, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 1, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 1, col: 3 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 1 })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle.move({ row: 2, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 3 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 2 })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle.move({ row: 3, col: 3 })).toEqual(false);
			});

			it("should only allow left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle.move(1)).toEqual(false);
				expect(puzzle.move(2)).toEqual(false);
				expect(puzzle.move(3)).toEqual(false);
				expect(puzzle.move(4)).toEqual(false);
				expect(puzzle.move(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle.move(6)).toEqual(false);
				expect(puzzle.move(7)).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle.move(8)).toEqual(false);
				expect(puzzle.move(9)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();

				expect(puzzle.move(1, 1)).toEqual(false);
				expect(puzzle.move(1, 2)).toEqual(false);
				expect(puzzle.move(1, 3)).toEqual(false);
				expect(puzzle.move(2, 1)).toEqual(false);
				expect(puzzle.move(2, 2)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle.move(2, 3)).toEqual(false);
				expect(puzzle.move(3, 1)).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle.move(3, 2)).toEqual(false);
				expect(puzzle.move(3, 3)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();

				expect(puzzle.move([1, 1])).toEqual(false);
				expect(puzzle.move([1, 2])).toEqual(false);
				expect(puzzle.move([1, 3])).toEqual(false);
				expect(puzzle.move([2, 1])).toEqual(false);
				expect(puzzle.move([2, 2])).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle.move([2, 3])).toEqual(false);
				expect(puzzle.move([3, 1])).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle.move([3, 2])).toEqual(false);
				expect(puzzle.move([3, 3])).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();

				expect(puzzle.move({ row: 1, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 1, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 1, col: 3 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 2 })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle.move({ row: 2, col: 3 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 1 })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle.move({ row: 3, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 3 })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
			});

			it("should only allow right and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				expect(puzzle.move(1)).toEqual(false);
				expect(puzzle.move(2)).toEqual(false);
				expect(puzzle.move(3)).toEqual(false);
				expect(puzzle.move(4)).toEqual(false);
				expect(puzzle.move(5)).toEqual(false);
				expect(puzzle.move(6)).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle.move(7)).toEqual(false);
				expect(puzzle.move(8)).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle.move(9)).toEqual(false);

				expect(puzzle.move(1, 1)).toEqual(false);
				expect(puzzle.move(1, 2)).toEqual(false);
				expect(puzzle.move(1, 3)).toEqual(false);
				expect(puzzle.move(2, 1)).toEqual(false);
				expect(puzzle.move(2, 2)).toEqual(false);
				expect(puzzle.move(2, 3)).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle.move(3, 1)).toEqual(false);
				expect(puzzle.move(3, 2)).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle.move(3, 3)).toEqual(false);

				expect(puzzle.move([1, 1])).toEqual(false);
				expect(puzzle.move([1, 2])).toEqual(false);
				expect(puzzle.move([1, 3])).toEqual(false);
				expect(puzzle.move([2, 1])).toEqual(false);
				expect(puzzle.move([2, 2])).toEqual(false);
				expect(puzzle.move([2, 3])).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle.move([3, 1])).toEqual(false);
				expect(puzzle.move([3, 2])).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle.move([3, 3])).toEqual(false);

				expect(puzzle.move({ row: 1, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 1, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 1, col: 3 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 2 })).toEqual(false);
				expect(puzzle.move({ row: 2, col: 3 })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle.move({ row: 3, col: 1 })).toEqual(false);
				expect(puzzle.move({ row: 3, col: 2 })).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle.move({ row: 3, col: 3 })).toEqual(false);
			});

			it("should throw an exception if the arguments are invalid", function() {
				expect(function() { puzzle.move(-1); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.move( 0); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.move(10); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.move(-1, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.move( 0, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.move(10, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.move(1, -1); }).toThrow(COL_INVALID);
				expect(function() { puzzle.move(1,  0); }).toThrow(COL_INVALID);
				expect(function() { puzzle.move(1, 10); }).toThrow(COL_INVALID);
				expect(function() { puzzle.move([-1, 1]); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.move([ 0, 1]); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.move([10, 1]); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.move([1, -1]); }).toThrow(COL_INVALID);
				expect(function() { puzzle.move([1,  0]); }).toThrow(COL_INVALID);
				expect(function() { puzzle.move([1, 10]); }).toThrow(COL_INVALID);
				expect(function() { puzzle.move({ row: -1, col:  1 }); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.move({ row:  0, col:  1 }); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.move({ row: 10, col:  1 }); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.move({ row:  1, col: -1 }); }).toThrow(COL_INVALID);
				expect(function() { puzzle.move({ row:  1, col:  0 }); }).toThrow(COL_INVALID);
				expect(function() { puzzle.move({ row:  1, col: 10 }); }).toThrow(COL_INVALID);
				expect(function() { puzzle.move(null); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.move(    ); }).toThrow(INDEX_INVALID);
			});

			it("should allow a piece next to the hole to be moved exactly once", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle.move(1)).toEqual(false);
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.move(2)).toEqual(false);
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle.move(3)).toEqual(false);
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle.move(6)).toEqual(false);
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.move(5)).toEqual(false);
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.move(4)).toEqual(false);
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle.move(7)).toEqual(false);
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle.move(8)).toEqual(false);
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle.move(9)).toEqual(false);
			});

			it("should update the hole after a successful move", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				puzzle.move(1);
				expect(puzzle._hole).toEqual(1);
				puzzle.move(2);
				expect(puzzle._hole).toEqual(2);
				puzzle.move(3);
				expect(puzzle._hole).toEqual(3);
				puzzle.move(6);
				expect(puzzle._hole).toEqual(6);
				puzzle.move(5);
				expect(puzzle._hole).toEqual(5);
				puzzle.move(4);
				expect(puzzle._hole).toEqual(4);
				puzzle.move(7);
				expect(puzzle._hole).toEqual(7);
				puzzle.move(8);
				expect(puzzle._hole).toEqual(8);
				puzzle.move(9);
				expect(puzzle._hole).toEqual(9);
			});

			it("should not update the hole after an unsuccessful move", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				puzzle.move(1);
				expect(puzzle._hole).toEqual(9);
				puzzle.move(2);
				expect(puzzle._hole).toEqual(9);
				puzzle.move(3);
				expect(puzzle._hole).toEqual(9);
				puzzle.move(4);
				expect(puzzle._hole).toEqual(9);
				puzzle.move(5);
				expect(puzzle._hole).toEqual(9);

				puzzle.move(6); // successful
				puzzle.move(3); // successful
				puzzle.move(2); // successful

				puzzle.move(6);
				expect(puzzle._hole).toEqual(2);
				puzzle.move(7);
				expect(puzzle._hole).toEqual(2);
				puzzle.move(8);
				expect(puzzle._hole).toEqual(2);
				puzzle.move(9);
				expect(puzzle._hole).toEqual(2);
			});

			it("should update the board after a successful move", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				puzzle.move(1);
				expect(puzzle._board).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
				puzzle.move(2);
				expect(puzzle._board).toEqual([1, 0, 2, 3, 4, 5, 6, 7, 8]);
				puzzle.move(3);
				expect(puzzle._board).toEqual([1, 2, 0, 3, 4, 5, 6, 7, 8]);
				puzzle.move(6);
				expect(puzzle._board).toEqual([1, 2, 5, 3, 4, 0, 6, 7, 8]);
				puzzle.move(5);
				expect(puzzle._board).toEqual([1, 2, 5, 3, 0, 4, 6, 7, 8]);
				puzzle.move(4);
				expect(puzzle._board).toEqual([1, 2, 5, 0, 3, 4, 6, 7, 8]);
				puzzle.move(7);
				expect(puzzle._board).toEqual([1, 2, 5, 6, 3, 4, 0, 7, 8]);
				puzzle.move(8);
				expect(puzzle._board).toEqual([1, 2, 5, 6, 3, 4, 7, 0, 8]);
				puzzle.move(9);
				expect(puzzle._board).toEqual([1, 2, 5, 6, 3, 4, 7, 8, 0]);
			});

			it("should not update the board after an unsuccessful move", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				puzzle.move(1);
				expect(puzzle._board).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);
				puzzle.move(2);
				expect(puzzle._board).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);
				puzzle.move(3);
				expect(puzzle._board).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);
				puzzle.move(4);
				expect(puzzle._board).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);
				puzzle.move(5);
				expect(puzzle._board).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);

				puzzle.move(6); // successful
				puzzle.move(3); // successful
				puzzle.move(2); // successful

				puzzle.move(6);
				expect(puzzle._board).toEqual([1, 0, 2, 4, 5, 3, 7, 8, 6]);
				puzzle.move(7);
				expect(puzzle._board).toEqual([1, 0, 2, 4, 5, 3, 7, 8, 6]);
				puzzle.move(8);
				expect(puzzle._board).toEqual([1, 0, 2, 4, 5, 3, 7, 8, 6]);
				puzzle.move(9);
				expect(puzzle._board).toEqual([1, 0, 2, 4, 5, 3, 7, 8, 6]);
			});
		});

		describe("moveByNumber()", function() {
			it("should only allow left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.moveByNumber(0)).toEqual(false);
				expect(puzzle.moveByNumber(1)).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle.moveByNumber(2)).toEqual(false);
				expect(puzzle.moveByNumber(3)).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle.moveByNumber(4)).toEqual(false);
				expect(puzzle.moveByNumber(5)).toEqual(false);
				expect(puzzle.moveByNumber(6)).toEqual(false);
				expect(puzzle.moveByNumber(7)).toEqual(false);
				expect(puzzle.moveByNumber(8)).toEqual(false);
			});

			it("should allow left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.moveByNumber(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.moveByNumber(0)).toEqual(false);
				expect(puzzle.moveByNumber(2)).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.moveByNumber(3)).toEqual(false);
				expect(puzzle.moveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.moveByNumber(5)).toEqual(false);
				expect(puzzle.moveByNumber(6)).toEqual(false);
				expect(puzzle.moveByNumber(7)).toEqual(false);
				expect(puzzle.moveByNumber(8)).toEqual(false);
			});

			it("should only allow right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.moveByNumber(1)).toEqual(false);
				expect(puzzle.moveByNumber(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle.moveByNumber(0)).toEqual(false);
				expect(puzzle.moveByNumber(3)).toEqual(false);
				expect(puzzle.moveByNumber(4)).toEqual(false);
				expect(puzzle.moveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle.moveByNumber(6)).toEqual(false);
				expect(puzzle.moveByNumber(7)).toEqual(false);
				expect(puzzle.moveByNumber(8)).toEqual(false);
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle.moveByNumber(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.moveByNumber(2)).toEqual(false);
				expect(puzzle.moveByNumber(3)).toEqual(false);
				expect(puzzle.moveByNumber(0)).toEqual(false);
				expect(puzzle.moveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.moveByNumber(5)).toEqual(false);
				expect(puzzle.moveByNumber(6)).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.moveByNumber(7)).toEqual(false);
				expect(puzzle.moveByNumber(8)).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle.moveByNumber(1)).toEqual(false);
				expect(puzzle.moveByNumber(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.moveByNumber(3)).toEqual(false);
				expect(puzzle.moveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.moveByNumber(0)).toEqual(false);
				expect(puzzle.moveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.moveByNumber(6)).toEqual(false);
				expect(puzzle.moveByNumber(7)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.moveByNumber(8)).toEqual(false);
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle.moveByNumber(1)).toEqual(false);
				expect(puzzle.moveByNumber(2)).toEqual(false);
				expect(puzzle.moveByNumber(3)).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle.moveByNumber(4)).toEqual(false);
				expect(puzzle.moveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle.moveByNumber(0)).toEqual(false);
				expect(puzzle.moveByNumber(6)).toEqual(false);
				expect(puzzle.moveByNumber(7)).toEqual(false);
				expect(puzzle.moveByNumber(8)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle.moveByNumber(1)).toEqual(false);
				expect(puzzle.moveByNumber(2)).toEqual(false);
				expect(puzzle.moveByNumber(3)).toEqual(false);
				expect(puzzle.moveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle.moveByNumber(5)).toEqual(false);
				expect(puzzle.moveByNumber(6)).toEqual(false);
				expect(puzzle.moveByNumber(0)).toEqual(false);
				expect(puzzle.moveByNumber(7)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle.moveByNumber(8)).toEqual(false);
			});

			it("should only allow left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle.moveByNumber(1)).toEqual(false);
				expect(puzzle.moveByNumber(2)).toEqual(false);
				expect(puzzle.moveByNumber(3)).toEqual(false);
				expect(puzzle.moveByNumber(4)).toEqual(false);
				expect(puzzle.moveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle.moveByNumber(6)).toEqual(false);
				expect(puzzle.moveByNumber(7)).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle.moveByNumber(0)).toEqual(false);
				expect(puzzle.moveByNumber(8)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
			});

			it("should only allow right and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				expect(puzzle.moveByNumber(1)).toEqual(false);
				expect(puzzle.moveByNumber(2)).toEqual(false);
				expect(puzzle.moveByNumber(3)).toEqual(false);
				expect(puzzle.moveByNumber(4)).toEqual(false);
				expect(puzzle.moveByNumber(5)).toEqual(false);
				expect(puzzle.moveByNumber(6)).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle.moveByNumber(7)).toEqual(false);
				expect(puzzle.moveByNumber(8)).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle.moveByNumber(0)).toEqual(false);
			});

			it("should throw an exception if the number is invalid", function() {
				expect(function() { puzzle.moveByNumber(-1  ); }).toThrow(NUMBER_INVALID);
				expect(function() { puzzle.moveByNumber( 9  ); }).toThrow(NUMBER_INVALID);
				expect(function() { puzzle.moveByNumber(10  ); }).toThrow(NUMBER_INVALID);
				expect(function() { puzzle.moveByNumber(null); }).toThrow(NUMBER_INVALID);
				expect(function() { puzzle.moveByNumber(    ); }).toThrow(NUMBER_INVALID);
			});
		});

		describe("moveByDirection()", function() {
			it("should only allow left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.moveByDirection('up'   )).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle.moveByDirection('down' )).toEqual(false);
				expect(puzzle.moveByDirection('left' )).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle.moveByDirection('right')).toEqual(false);
			});

			it("should only allow left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.moveByDirection('up'   )).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.moveByDirection('down' )).toEqual(false);
				expect(puzzle.moveByDirection('left' )).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle.moveByDirection('right')).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
			});

			it("should only allow right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.moveByDirection('up'   )).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle.moveByDirection('down' )).toEqual(false);
				expect(puzzle.moveByDirection('left' )).toEqual(false);
				expect(puzzle.moveByDirection('right')).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle.moveByDirection('up'   )).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.moveByDirection('down' )).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.moveByDirection('left' )).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle.moveByDirection('right')).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle.moveByDirection('up'   )).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.moveByDirection('down' )).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.moveByDirection('left' )).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle.moveByDirection('right')).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle.moveByDirection('up'   )).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle.moveByDirection('down' )).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle.moveByDirection('left' )).toEqual(false);
				expect(puzzle.moveByDirection('right')).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle.moveByDirection('up'   )).toEqual(false);
				expect(puzzle.moveByDirection('down' )).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle.moveByDirection('left' )).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle.moveByDirection('right')).toEqual(false);
			});

			it("should only allow left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle.moveByDirection('up'   )).toEqual(false);
				expect(puzzle.moveByDirection('down' )).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle.moveByDirection('left' )).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle.moveByDirection('right')).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
			});

			it("should only allow left and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				expect(puzzle.moveByDirection('up'   )).toEqual(false);
				expect(puzzle.moveByDirection('down' )).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle.moveByDirection('left' )).toEqual(false);
				expect(puzzle.moveByDirection('right')).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
			});

			it("should throw an exception if the direction value is invalid", function() {
				puzzle = new SliderPuzzle({
					board: board3x3
				});

				expect(function() { puzzle.moveByDirection('uup'); }).toThrow(DIRECTION_INVALID);
				expect(function() { puzzle.moveByDirection(''   ); }).toThrow(DIRECTION_INVALID);
				expect(function() { puzzle.moveByDirection(null ); }).toThrow(DIRECTION_INVALID);
				expect(function() { puzzle.moveByDirection(     ); }).toThrow(DIRECTION_INVALID);
			});
		});

		describe("moveRandomly()", function() {
			it("should always allow for a random move", function() {
				puzzle = new SliderPuzzle();

				for (var i = 0; i < 1000; i++) {
					expect(puzzle.moveRandomly()).toBeTruthy();
				}
			});

			it("should not move a piece back and forth", function() {
				var move;
				var lastDirection;

				puzzle = new SliderPuzzle();

				for (var i = 0; i < 1000; i++) {
					move = puzzle.moveRandomly();

					if (move) {
						if (move.direction === 'up'   ) expect(lastDirection).not.toEqual('down' );
						if (move.direction === 'down' ) expect(lastDirection).not.toEqual('up'   );
						if (move.direction === 'left' ) expect(lastDirection).not.toEqual('right');
						if (move.direction === 'right') expect(lastDirection).not.toEqual('left' );
					}

					lastDirection = move.direction;
				}
			});
		});

		describe("_moveByPiece()", function() {
			it("should only allow left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._moveByPiece({ number: 0, position: positions3x3.topLeft      })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topMiddle    })).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topRight     })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
			});

			it("should allow left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 0, position: positions3x3.topMiddle    })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topRight     })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
			});

			it("should only allow right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 0, position: positions3x3.topRight     })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 0, position: positions3x3.middleLeft   })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 0, position: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 0, position: positions3x3.middleRight  })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 0, position: positions3x3.bottomLeft   })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
			});

			it("should only allow left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomLeft   })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 0, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
			});

			it("should only allow right and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomLeft   })).toEqual(false);
				expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomMiddle })).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle._moveByPiece({ number: 0, position: positions3x3.bottomRight  })).toEqual(false);
			});
		});

		describe("_moveByMove()", function() {
			it("should only allow left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._moveByMove({ number: 0, from: positions3x3.topLeft,      to: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  })).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 2, from: positions3x3.topRight,     to: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(1)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topLeft })).toEqual(false);
			});

			it("should allow left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 0, from: positions3x3.topMiddle,    to: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._moveByMove({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(2)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._moveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topMiddle })).toEqual(false);
			});

			it("should only allow right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 0, from: positions3x3.topRight,     to: positions3x3.topRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(3)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topRight })).toEqual(false);
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 0, from: positions3x3.middleLeft,   to: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(4)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleLeft })).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._moveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 0, from: positions3x3.middleMiddle, to: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(5)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleMiddle })).toEqual(false);
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 0, from: positions3x3.middleRight,  to: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , timestamp: jasmine.any(Date) });
				expect(puzzle.move(6)).toBeTruthy();
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 0, from: positions3x3.bottomLeft,   to: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(7)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomLeft })).toEqual(false);
			});

			it("should only allow left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._moveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._moveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 0, from: positions3x3.bottomMiddle, to: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(8)).toBeTruthy();
			});

			it("should only allow right and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomRight })).toEqual(false);
				expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' })).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', timestamp: jasmine.any(Date) });
				expect(puzzle.move(9)).toBeTruthy();
				expect(puzzle._moveByMove({ number: 0, from: positions3x3.bottomRight,  to: positions3x3.bottomRight })).toEqual(false);
			});
		});

		describe("_getMoveByPiece()", function() {
			it("should return the left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.topLeft      })).toEqual({ number: 0, from: positions3x3.topLeft,      to: positions3x3.topLeft });
				expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topMiddle    })).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
				expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topRight     })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topLeft });
				expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
				expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topLeft });
				expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topLeft });
				expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topLeft });
				expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topLeft });
				expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topLeft });
			});

			it("should return the left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
				expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.topMiddle    })).toEqual({ number: 0, from: positions3x3.topMiddle,    to: positions3x3.topMiddle });
				expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topRight     })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
				expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topMiddle });
				expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
				expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topMiddle });
				expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topMiddle });
				expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topMiddle });
				expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topMiddle });
			});

			it("should return the right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topRight });
				expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
				expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.topRight     })).toEqual({ number: 0, from: positions3x3.topRight,     to: positions3x3.topRight });
				expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topRight });
				expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topRight });
				expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
				expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topRight });
				expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topRight });
				expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topRight });
			});

			it("should return the left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
				expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleLeft });
				expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleLeft });
				expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.middleLeft   })).toEqual({ number: 0, from: positions3x3.middleLeft,   to: positions3x3.middleLeft });
				expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
				expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleLeft });
				expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
				expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleLeft });
				expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleLeft });
			});

			it("should return the left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleMiddle });
				expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
				expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleMiddle });
				expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
				expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.middleMiddle })).toEqual({ number: 0, from: positions3x3.middleMiddle, to: positions3x3.middleMiddle });
				expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
				expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleMiddle });
				expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
				expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleMiddle });
			});

			it("should return the right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleRight });
				expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleRight });
				expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
				expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleRight });
				expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
				expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.middleRight  })).toEqual({ number: 0, from: positions3x3.middleRight,  to: positions3x3.middleRight });
				expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleRight });
				expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleRight });
				expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });
			});

			it("should return the left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomLeft });
				expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomLeft });
				expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomLeft });
				expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
				expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomLeft });
				expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomLeft });
				expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.bottomLeft   })).toEqual({ number: 0, from: positions3x3.bottomLeft,   to: positions3x3.bottomLeft });
				expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
				expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomLeft });
			});

			it("should return the left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomMiddle });
				expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomMiddle });
				expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomMiddle });
				expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomMiddle });
				expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
				expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomMiddle });
				expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomLeft   })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
				expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.bottomMiddle })).toEqual({ number: 0, from: positions3x3.bottomMiddle, to: positions3x3.bottomMiddle });
				expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });
			});

			it("should return the right and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomRight });
				expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomRight });
				expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomRight });
				expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomRight });
				expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomRight });
				expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
				expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomLeft   })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomRight });
				expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomMiddle })).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
				expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.bottomRight  })).toEqual({ number: 0, from: positions3x3.bottomRight,  to: positions3x3.bottomRight });
			});
		});

		describe("_getDirection()", function() {
			it("should return the correct direction for a move ", function() {
				expect(puzzle._getDirection({ number: 1, from: positions3x3.middleMiddle, to: positions3x3.topMiddle    })).toEqual('up'   );
				expect(puzzle._getDirection({ number: 1, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle })).toEqual('down' );
				expect(puzzle._getDirection({ number: 1, from: positions3x3.middleMiddle, to: positions3x3.middleLeft   })).toEqual('left' );
				expect(puzzle._getDirection({ number: 1, from: positions3x3.middleMiddle, to: positions3x3.middleRight  })).toEqual('right');
			});
		});
	});
});
