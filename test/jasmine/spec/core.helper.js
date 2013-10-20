describe("Helper: ", function() {

	var puzzle;

	var ROW_INVALID			= 'invalid row';
	var COL_INVALID			= 'invalid col';
	var INDEX_INVALID		= 'invalid index';
	var NUMBER_INVALID		= 'invalid number';
	var DIRECTION_INVALID	= 'invalid direction';

	// a 3x3 board with 0 replaced for 9, solved
	var board3x3 = [1,	2,	3,
					4,	5,	6,
					7,	8,	0];

	// positions on a 3x3 board
	var positions3x3 = {
		topLeft:		{ index: 1, row: 1, col: 1 },
		topMiddle:		{ index: 2, row: 1, col: 2 },
		topRight:		{ index: 3, row: 1, col: 3 },
		middleLeft:		{ index: 4, row: 2, col: 1 },
		middleMiddle:	{ index: 5, row: 2, col: 2 },
		middleRight:	{ index: 6, row: 2, col: 3 },
		bottomLeft:		{ index: 7, row: 3, col: 1 },
		bottomMiddle:	{ index: 8, row: 3, col: 2 },
		bottomRight:	{ index: 9, row: 3, col: 3 }
	};

	// positions on a 3x3 board
	var pieces3x3 = {
		topLeft:		{ number: 1, position: positions3x3.topLeft },
		topMiddle:		{ number: 2, position: positions3x3.topMiddle },
		topRight:		{ number: 3, position: positions3x3.topRight },
		middleLeft:		{ number: 4, position: positions3x3.middleLeft },
		middleMiddle:	{ number: 5, position: positions3x3.middleMiddle },
		middleRight:	{ number: 6, position: positions3x3.middleRight },
		bottomLeft:		{ number: 7, position: positions3x3.bottomLeft },
		bottomMiddle:	{ number: 8, position: positions3x3.bottomMiddle },
		bottomRight:	{ number: 0, position: positions3x3.bottomRight }
	};

	describe("Solving: ", function() {

		describe("isSolvable()", function() {
			it("should identify a solvable board as solvable", function() {
				puzzle = new SliderPuzzle({
					board: [1,	2,
							0,	3]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [1,	2,
							3,	0]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [1,	2,
							0,	4]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [1,	2,
							4,	0]
				});
				expect(puzzle.isSolvable()).toEqual(true);

				puzzle = new SliderPuzzle({
					board: [1,	2,	3,
							4,	5,	0],
					rows: 2
				});
				expect(puzzle.isSolvable()).toEqual(true);
			});

			it("should not identify a non-solvable board as solvable", function() {
				puzzle = new SliderPuzzle({
					board: [2,	1,
							3,	0]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [1,	3,
							2,	0]
				});
				expect(puzzle.isSolvable()).toEqual(false);

				puzzle = new SliderPuzzle({
					board: [1,	2,	3,
							5,	4,	0],
					rows: 2
				});
				expect(puzzle.isSolvable()).toEqual(false);
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

		describe("getPositionByRowCol()", function() {
			it("should create a position object from given row and col numbers", function() {
				expect(puzzle.getPositionByRowCol(1, 1)).toEqual(positions3x3.topLeft);
				expect(puzzle.getPositionByRowCol(1, 2)).toEqual(positions3x3.topMiddle);
				expect(puzzle.getPositionByRowCol(1, 3)).toEqual(positions3x3.topRight);
				expect(puzzle.getPositionByRowCol(2, 1)).toEqual(positions3x3.middleLeft);
				expect(puzzle.getPositionByRowCol(2, 2)).toEqual(positions3x3.middleMiddle);
				expect(puzzle.getPositionByRowCol(2, 3)).toEqual(positions3x3.middleRight);
				expect(puzzle.getPositionByRowCol(3, 1)).toEqual(positions3x3.bottomLeft);
				expect(puzzle.getPositionByRowCol(3, 2)).toEqual(positions3x3.bottomMiddle);
				expect(puzzle.getPositionByRowCol(3, 3)).toEqual(positions3x3.bottomRight);
			});

			it("should throw an exception if the row or col value is out of bounds", function() {
				expect(function() { puzzle.getPositionByRowCol(-1, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPositionByRowCol( 0, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPositionByRowCol(10, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPositionByRowCol(1, -1); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPositionByRowCol(1,  0); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPositionByRowCol(1, 10); }).toThrow(COL_INVALID);
			});
		});

		describe("getPositionByIndex()", function() {
			it("should create a position object from a given one-dimensional index", function() {
				expect(puzzle.getPositionByIndex(1)).toEqual(positions3x3.topLeft);
				expect(puzzle.getPositionByIndex(2)).toEqual(positions3x3.topMiddle);
				expect(puzzle.getPositionByIndex(3)).toEqual(positions3x3.topRight);
				expect(puzzle.getPositionByIndex(4)).toEqual(positions3x3.middleLeft);
				expect(puzzle.getPositionByIndex(5)).toEqual(positions3x3.middleMiddle);
				expect(puzzle.getPositionByIndex(6)).toEqual(positions3x3.middleRight);
				expect(puzzle.getPositionByIndex(7)).toEqual(positions3x3.bottomLeft);
				expect(puzzle.getPositionByIndex(8)).toEqual(positions3x3.bottomMiddle);
				expect(puzzle.getPositionByIndex(9)).toEqual(positions3x3.bottomRight);
			});

			it("should throw an exception if the one-dimensional index is out of bounds", function() {
				expect(function() { puzzle.getPositionByIndex(-1); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.getPositionByIndex( 0); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.getPositionByIndex(10); }).toThrow(INDEX_INVALID);
			});
		});

		describe("normalizePosition()", function() {
			it("should handle a one-dimensional index", function() {
				expect(puzzle.normalizePosition(1)).toEqual(positions3x3.topLeft);
				expect(puzzle.normalizePosition(2)).toEqual(positions3x3.topMiddle);
				expect(puzzle.normalizePosition(3)).toEqual(positions3x3.topRight);
				expect(puzzle.normalizePosition(4)).toEqual(positions3x3.middleLeft);
				expect(puzzle.normalizePosition(5)).toEqual(positions3x3.middleMiddle);
				expect(puzzle.normalizePosition(6)).toEqual(positions3x3.middleRight);
				expect(puzzle.normalizePosition(7)).toEqual(positions3x3.bottomLeft);
				expect(puzzle.normalizePosition(8)).toEqual(positions3x3.bottomMiddle);
				expect(puzzle.normalizePosition(9)).toEqual(positions3x3.bottomRight);
			});

			it("should handle row and col passed in as seperate arguments", function() {
				expect(puzzle.normalizePosition(1, 1)).toEqual(positions3x3.topLeft);
				expect(puzzle.normalizePosition(1, 2)).toEqual(positions3x3.topMiddle);
				expect(puzzle.normalizePosition(1, 3)).toEqual(positions3x3.topRight);
				expect(puzzle.normalizePosition(2, 1)).toEqual(positions3x3.middleLeft);
				expect(puzzle.normalizePosition(2, 2)).toEqual(positions3x3.middleMiddle);
				expect(puzzle.normalizePosition(2, 3)).toEqual(positions3x3.middleRight);
				expect(puzzle.normalizePosition(3, 1)).toEqual(positions3x3.bottomLeft);
				expect(puzzle.normalizePosition(3, 2)).toEqual(positions3x3.bottomMiddle);
				expect(puzzle.normalizePosition(3, 3)).toEqual(positions3x3.bottomRight);
			});

			it("should handle row and col passed in as an array", function() {
				expect(puzzle.normalizePosition([1, 1])).toEqual(positions3x3.topLeft);
				expect(puzzle.normalizePosition([1, 2])).toEqual(positions3x3.topMiddle);
				expect(puzzle.normalizePosition([1, 3])).toEqual(positions3x3.topRight);
				expect(puzzle.normalizePosition([2, 1])).toEqual(positions3x3.middleLeft);
				expect(puzzle.normalizePosition([2, 2])).toEqual(positions3x3.middleMiddle);
				expect(puzzle.normalizePosition([2, 3])).toEqual(positions3x3.middleRight);
				expect(puzzle.normalizePosition([3, 1])).toEqual(positions3x3.bottomLeft);
				expect(puzzle.normalizePosition([3, 2])).toEqual(positions3x3.bottomMiddle);
				expect(puzzle.normalizePosition([3, 3])).toEqual(positions3x3.bottomRight);
			});

			it("should handle row and col passed in as an object", function() {
				expect(puzzle.normalizePosition({ row: 1, col: 1 })).toEqual(positions3x3.topLeft);
				expect(puzzle.normalizePosition({ row: 1, col: 2 })).toEqual(positions3x3.topMiddle);
				expect(puzzle.normalizePosition({ row: 1, col: 3 })).toEqual(positions3x3.topRight);
				expect(puzzle.normalizePosition({ row: 2, col: 1 })).toEqual(positions3x3.middleLeft);
				expect(puzzle.normalizePosition({ row: 2, col: 2 })).toEqual(positions3x3.middleMiddle);
				expect(puzzle.normalizePosition({ row: 2, col: 3 })).toEqual(positions3x3.middleRight);
				expect(puzzle.normalizePosition({ row: 3, col: 1 })).toEqual(positions3x3.bottomLeft);
				expect(puzzle.normalizePosition({ row: 3, col: 2 })).toEqual(positions3x3.bottomMiddle);
				expect(puzzle.normalizePosition({ row: 3, col: 3 })).toEqual(positions3x3.bottomRight);
			});

			it("should throw an exception if the arguments are out of bounds", function() {
				expect(function() { puzzle.normalizePosition(-1); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.normalizePosition( 0); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.normalizePosition(10); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.normalizePosition(-1, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.normalizePosition( 0, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.normalizePosition(10, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.normalizePosition(1, -1); }).toThrow(COL_INVALID);
				expect(function() { puzzle.normalizePosition(1,  0); }).toThrow(COL_INVALID);
				expect(function() { puzzle.normalizePosition(1, 10); }).toThrow(COL_INVALID);
				expect(function() { puzzle.normalizePosition([-1, 1]); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.normalizePosition([ 0, 1]); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.normalizePosition([10, 1]); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.normalizePosition([1, -1]); }).toThrow(COL_INVALID);
				expect(function() { puzzle.normalizePosition([1,  0]); }).toThrow(COL_INVALID);
				expect(function() { puzzle.normalizePosition([1, 10]); }).toThrow(COL_INVALID);
				expect(function() { puzzle.normalizePosition({ row: -1, col:  1 }); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.normalizePosition({ row:  0, col:  1 }); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.normalizePosition({ row: 10, col:  1 }); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.normalizePosition({ row:  1, col: -1 }); }).toThrow(COL_INVALID);
				expect(function() { puzzle.normalizePosition({ row:  1, col:  0 }); }).toThrow(COL_INVALID);
				expect(function() { puzzle.normalizePosition({ row:  1, col: 10 }); }).toThrow(COL_INVALID);
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
			it("should return the piece based on its index", function() {
				expect(puzzle.getPiece(1)).toEqual(pieces3x3.topLeft);
				expect(puzzle.getPiece(2)).toEqual(pieces3x3.topMiddle);
				expect(puzzle.getPiece(3)).toEqual(pieces3x3.topRight);
				expect(puzzle.getPiece(4)).toEqual(pieces3x3.middleLeft);
				expect(puzzle.getPiece(5)).toEqual(pieces3x3.middleMiddle);
				expect(puzzle.getPiece(6)).toEqual(pieces3x3.middleRight);
				expect(puzzle.getPiece(7)).toEqual(pieces3x3.bottomLeft);
				expect(puzzle.getPiece(8)).toEqual(pieces3x3.bottomMiddle);
				expect(puzzle.getPiece(9)).toEqual(pieces3x3.bottomRight);
			});

			it("should handle row and col passed in as seperate arguments", function() {
				expect(puzzle.getPiece(1, 1)).toEqual(pieces3x3.topLeft);
				expect(puzzle.getPiece(1, 2)).toEqual(pieces3x3.topMiddle);
				expect(puzzle.getPiece(1, 3)).toEqual(pieces3x3.topRight);
				expect(puzzle.getPiece(2, 1)).toEqual(pieces3x3.middleLeft);
				expect(puzzle.getPiece(2, 2)).toEqual(pieces3x3.middleMiddle);
				expect(puzzle.getPiece(2, 3)).toEqual(pieces3x3.middleRight);
				expect(puzzle.getPiece(3, 1)).toEqual(pieces3x3.bottomLeft);
				expect(puzzle.getPiece(3, 2)).toEqual(pieces3x3.bottomMiddle);
				expect(puzzle.getPiece(3, 3)).toEqual(pieces3x3.bottomRight);
			});

			it("should handle row and col passed in as an array", function() {
				expect(puzzle.getPiece([1, 1])).toEqual(pieces3x3.topLeft);
				expect(puzzle.getPiece([1, 2])).toEqual(pieces3x3.topMiddle);
				expect(puzzle.getPiece([1, 3])).toEqual(pieces3x3.topRight);
				expect(puzzle.getPiece([2, 1])).toEqual(pieces3x3.middleLeft);
				expect(puzzle.getPiece([2, 2])).toEqual(pieces3x3.middleMiddle);
				expect(puzzle.getPiece([2, 3])).toEqual(pieces3x3.middleRight);
				expect(puzzle.getPiece([3, 1])).toEqual(pieces3x3.bottomLeft);
				expect(puzzle.getPiece([3, 2])).toEqual(pieces3x3.bottomMiddle);
				expect(puzzle.getPiece([3, 3])).toEqual(pieces3x3.bottomRight);
			});

			it("should handle row and col passed in as an object", function() {
				expect(puzzle.getPiece({ row: 1, col: 1 })).toEqual(pieces3x3.topLeft);
				expect(puzzle.getPiece({ row: 1, col: 2 })).toEqual(pieces3x3.topMiddle);
				expect(puzzle.getPiece({ row: 1, col: 3 })).toEqual(pieces3x3.topRight);
				expect(puzzle.getPiece({ row: 2, col: 1 })).toEqual(pieces3x3.middleLeft);
				expect(puzzle.getPiece({ row: 2, col: 2 })).toEqual(pieces3x3.middleMiddle);
				expect(puzzle.getPiece({ row: 2, col: 3 })).toEqual(pieces3x3.middleRight);
				expect(puzzle.getPiece({ row: 3, col: 1 })).toEqual(pieces3x3.bottomLeft);
				expect(puzzle.getPiece({ row: 3, col: 2 })).toEqual(pieces3x3.bottomMiddle);
				expect(puzzle.getPiece({ row: 3, col: 3 })).toEqual(pieces3x3.bottomRight);
			});

			it("should throw an exception if the arguments are out of bounds", function() {
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
			});
		});

		describe("getPieceByNumber()", function() {
			it("should return the piece based on its number", function() {
				expect(puzzle.getPieceByNumber(1)).toEqual(pieces3x3.topLeft);
				expect(puzzle.getPieceByNumber(2)).toEqual(pieces3x3.topMiddle);
				expect(puzzle.getPieceByNumber(3)).toEqual(pieces3x3.topRight);
				expect(puzzle.getPieceByNumber(4)).toEqual(pieces3x3.middleLeft);
				expect(puzzle.getPieceByNumber(5)).toEqual(pieces3x3.middleMiddle);
				expect(puzzle.getPieceByNumber(6)).toEqual(pieces3x3.middleRight);
				expect(puzzle.getPieceByNumber(7)).toEqual(pieces3x3.bottomLeft);
				expect(puzzle.getPieceByNumber(8)).toEqual(pieces3x3.bottomMiddle);
				expect(puzzle.getPieceByNumber(0)).toEqual(pieces3x3.bottomRight);
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

				expect(puzzle.getPieceByDirection('up'   )).toEqual({ number : 3, position : positions3x3.middleLeft });
				expect(puzzle.getPieceByDirection('down' )).toEqual(false);
				expect(puzzle.getPieceByDirection('left' )).toEqual({ number : 1, position : positions3x3.topMiddle });
				expect(puzzle.getPieceByDirection('right')).toEqual(false);
			});

			it("should only return the pieces for left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual({ number : 4, position : positions3x3.middleMiddle });
				expect(puzzle.getPieceByDirection('down' )).toEqual(false);
				expect(puzzle.getPieceByDirection('left' )).toEqual({ number : 2, position : positions3x3.topRight });
				expect(puzzle.getPieceByDirection('right')).toEqual({ number : 1, position : positions3x3.topLeft });
			});

			it("should only return the pieces for right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual({ number : 5, position : positions3x3.middleRight });
				expect(puzzle.getPieceByDirection('down' )).toEqual(false);
				expect(puzzle.getPieceByDirection('left' )).toEqual(false);
				expect(puzzle.getPieceByDirection('right')).toEqual({ number : 2, position : positions3x3.topMiddle });
			});

			it("should only return the pieces for left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual({ number : 6, position : positions3x3.bottomLeft });
				expect(puzzle.getPieceByDirection('down' )).toEqual({ number : 1, position : positions3x3.topLeft });
				expect(puzzle.getPieceByDirection('left' )).toEqual({ number : 4, position : positions3x3.middleMiddle });
				expect(puzzle.getPieceByDirection('right')).toEqual(false);
			});

			it("should return the pieces for left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual({ number : 7, position : positions3x3.bottomMiddle });
				expect(puzzle.getPieceByDirection('down' )).toEqual({ number : 2, position : positions3x3.topMiddle });
				expect(puzzle.getPieceByDirection('left' )).toEqual({ number : 5, position : positions3x3.middleRight });
				expect(puzzle.getPieceByDirection('right')).toEqual({ number : 4, position : positions3x3.middleLeft });
			});

			it("should only return the pieces for right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual({ number : 8, position : positions3x3.bottomRight });
				expect(puzzle.getPieceByDirection('down' )).toEqual({ number : 3, position : positions3x3.topRight });
				expect(puzzle.getPieceByDirection('left' )).toEqual(false);
				expect(puzzle.getPieceByDirection('right')).toEqual({ number : 5, position : positions3x3.middleMiddle });
			});

			it("should only return the pieces for left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual(false);
				expect(puzzle.getPieceByDirection('down' )).toEqual({ number : 4, position : positions3x3.middleLeft });
				expect(puzzle.getPieceByDirection('left' )).toEqual({ number : 7, position : positions3x3.bottomMiddle });
				expect(puzzle.getPieceByDirection('right')).toEqual(false);
			});

			it("should only return the pieces for left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual(false);
				expect(puzzle.getPieceByDirection('down' )).toEqual({ number : 5, position : positions3x3.middleMiddle });
				expect(puzzle.getPieceByDirection('left' )).toEqual({ number : 8, position : positions3x3.bottomRight });
				expect(puzzle.getPieceByDirection('right')).toEqual({ number : 7, position : positions3x3.bottomLeft });
			});

			it("should only return the pieces for left and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				expect(puzzle.getPieceByDirection('up'   )).toEqual(false);
				expect(puzzle.getPieceByDirection('down' )).toEqual({ number : 6, position : positions3x3.middleRight });
				expect(puzzle.getPieceByDirection('left' )).toEqual(false);
				expect(puzzle.getPieceByDirection('right')).toEqual({ number : 8, position : positions3x3.bottomMiddle });
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

		describe("_canMoveByPiece()", function() {
			it("should only allow left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topMiddle })).toEqual({ number : 1, from: positions3x3.topMiddle, to: positions3x3.topLeft, direction: 'left' });
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topRight })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.middleLeft })).toEqual({ number : 3, from: positions3x3.middleLeft, to: positions3x3.topLeft, direction: 'up' });
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight })).toEqual(false);
			});

			it("should allow left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft })).toEqual({ number : 1, from: positions3x3.topLeft, to: positions3x3.topMiddle, direction: 'right' });
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topRight })).toEqual({ number : 2, from: positions3x3.topRight, to: positions3x3.topMiddle, direction: 'left' });
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number : 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up' });
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight })).toEqual(false);
			});

			it("should only allow right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle })).toEqual({ number : 2, from: positions3x3.topMiddle, to: positions3x3.topRight, direction: 'right' });
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.topRight })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleRight })).toEqual({ number : 5, from: positions3x3.middleRight, to: positions3x3.topRight, direction: 'up' });
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight })).toEqual(false);
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft })).toEqual({ number : 1, from: positions3x3.topLeft, to: positions3x3.middleLeft, direction: 'down' });
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number : 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' });
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft })).toEqual({ number : 6, from: positions3x3.bottomLeft, to: positions3x3.middleLeft, direction: 'up' });
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight })).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle })).toEqual({ number : 2, from: positions3x3.topMiddle, to: positions3x3.middleMiddle, direction: 'down' });
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleLeft })).toEqual({ number : 4, from: positions3x3.middleLeft, to: positions3x3.middleMiddle, direction: 'right' });
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleRight })).toEqual({ number : 5, from: positions3x3.middleRight, to: positions3x3.middleMiddle, direction: 'left' });
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number : 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up' });
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight })).toEqual(false);
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight })).toEqual({ number : 3, from: positions3x3.topRight, to: positions3x3.middleRight, direction: 'down' });
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number : 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight })).toEqual({ number : 8, from: positions3x3.bottomRight, to: positions3x3.middleRight, direction: 'up' });
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleLeft })).toEqual({ number : 4, from: positions3x3.middleLeft, to: positions3x3.bottomLeft, direction: 'down' });
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number : 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' });
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight })).toEqual(false);
			});

			it("should only allow left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number : 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' });
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.middleRight })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomLeft })).toEqual({ number : 7, from: positions3x3.bottomLeft, to: positions3x3.bottomMiddle, direction: 'right' });
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.bottomMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight })).toEqual({ number : 8, from: positions3x3.bottomRight, to: positions3x3.bottomMiddle, direction: 'left' });
			});

			it("should only allow right and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.middleRight })).toEqual({ number : 6, from: positions3x3.middleRight, to: positions3x3.bottomRight, direction: 'down' });
				expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomLeft })).toEqual(false);
				expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomMiddle })).toEqual({ number : 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
				expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.bottomRight })).toEqual(false);
			});
		});

		describe("canMove()", function() {
			it("should only allow left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual({ number : 1, from: positions3x3.topMiddle, to: positions3x3.topLeft, direction: 'left' });
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual({ number : 3, from: positions3x3.middleLeft, to: positions3x3.topLeft, direction: 'up' });
				expect(puzzle.canMove(5)).toEqual(false);
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual(false);
			});

			it("should allow left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual({ number : 1, from: positions3x3.topLeft, to: positions3x3.topMiddle, direction: 'right' });
				expect(puzzle.canMove(2)).toEqual(false);
				expect(puzzle.canMove(3)).toEqual({ number : 2, from: positions3x3.topRight, to: positions3x3.topMiddle, direction: 'left' });
				expect(puzzle.canMove(4)).toEqual(false);
				expect(puzzle.canMove(5)).toEqual({ number : 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up' });
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual(false);
			});

			it("should only allow right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual({ number : 2, from: positions3x3.topMiddle, to: positions3x3.topRight, direction: 'right' });
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual(false);
				expect(puzzle.canMove(5)).toEqual(false);
				expect(puzzle.canMove(6)).toEqual({ number : 5, from: positions3x3.middleRight, to: positions3x3.topRight, direction: 'up' });
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual(false);
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual({ number : 1, from: positions3x3.topLeft, to: positions3x3.middleLeft, direction: 'down' });
				expect(puzzle.canMove(2)).toEqual(false);
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual(false);
				expect(puzzle.canMove(5)).toEqual({ number : 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' });
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual({ number : 6, from: positions3x3.bottomLeft, to: positions3x3.middleLeft, direction: 'up' });
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual({ number : 2, from: positions3x3.topMiddle, to: positions3x3.middleMiddle, direction: 'down' });
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual({ number : 4, from: positions3x3.middleLeft, to: positions3x3.middleMiddle, direction: 'right' });
				expect(puzzle.canMove(5)).toEqual(false);
				expect(puzzle.canMove(6)).toEqual({ number : 5, from: positions3x3.middleRight, to: positions3x3.middleMiddle, direction: 'left' });
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual({ number : 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up' });
				expect(puzzle.canMove(9)).toEqual(false);
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual(false);
				expect(puzzle.canMove(3)).toEqual({ number : 3, from: positions3x3.topRight, to: positions3x3.middleRight, direction: 'down' });
				expect(puzzle.canMove(4)).toEqual(false);
				expect(puzzle.canMove(5)).toEqual({ number : 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual({ number : 8, from: positions3x3.bottomRight, to: positions3x3.middleRight, direction: 'up' });
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual(false);
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual({ number : 4, from: positions3x3.middleLeft, to: positions3x3.bottomLeft, direction: 'down' });
				expect(puzzle.canMove(5)).toEqual(false);
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual({ number : 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' });
				expect(puzzle.canMove(9)).toEqual(false);
			});

			it("should only allow left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual(false);
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual(false);
				expect(puzzle.canMove(5)).toEqual({ number : 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' });
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual({ number : 7, from: positions3x3.bottomLeft, to: positions3x3.bottomMiddle, direction: 'right' });
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual({ number : 8, from: positions3x3.bottomRight, to: positions3x3.bottomMiddle, direction: 'left' });
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
				expect(puzzle.canMove(6)).toEqual({ number : 6, from: positions3x3.middleRight, to: positions3x3.bottomRight, direction: 'down' });
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual({ number : 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
				expect(puzzle.canMove(9)).toEqual(false);
			});
		});

		describe("canMoveByNumber()", function() {
			it("should only allow left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(1)).toEqual({ number : 1, from: positions3x3.topMiddle, to: positions3x3.topLeft, direction: 'left' });
				expect(puzzle.canMoveByNumber(2)).toEqual(false);
				expect(puzzle.canMoveByNumber(3)).toEqual({ number : 3, from: positions3x3.middleLeft, to: positions3x3.topLeft, direction: 'up' });
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

				expect(puzzle.canMoveByNumber(1)).toEqual({ number : 1, from: positions3x3.topLeft, to: positions3x3.topMiddle, direction: 'right' });
				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(2)).toEqual({ number : 2, from: positions3x3.topRight, to: positions3x3.topMiddle, direction: 'left' });
				expect(puzzle.canMoveByNumber(3)).toEqual(false);
				expect(puzzle.canMoveByNumber(4)).toEqual({ number : 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up' });
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
				expect(puzzle.canMoveByNumber(2)).toEqual({ number : 2, from: positions3x3.topMiddle, to: positions3x3.topRight, direction: 'right' });
				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(3)).toEqual(false);
				expect(puzzle.canMoveByNumber(4)).toEqual(false);
				expect(puzzle.canMoveByNumber(5)).toEqual({ number : 5, from: positions3x3.middleRight, to: positions3x3.topRight, direction: 'up' });
				expect(puzzle.canMoveByNumber(6)).toEqual(false);
				expect(puzzle.canMoveByNumber(7)).toEqual(false);
				expect(puzzle.canMoveByNumber(8)).toEqual(false);
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByNumber(1)).toEqual({ number : 1, from: positions3x3.topLeft, to: positions3x3.middleLeft, direction: 'down' });
				expect(puzzle.canMoveByNumber(2)).toEqual(false);
				expect(puzzle.canMoveByNumber(3)).toEqual(false);
				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(4)).toEqual({ number : 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' });
				expect(puzzle.canMoveByNumber(5)).toEqual(false);
				expect(puzzle.canMoveByNumber(6)).toEqual({ number : 6, from: positions3x3.bottomLeft, to: positions3x3.middleLeft, direction: 'up' });
				expect(puzzle.canMoveByNumber(7)).toEqual(false);
				expect(puzzle.canMoveByNumber(8)).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByNumber(1)).toEqual(false);
				expect(puzzle.canMoveByNumber(2)).toEqual({ number : 2, from: positions3x3.topMiddle, to: positions3x3.middleMiddle, direction: 'down' });
				expect(puzzle.canMoveByNumber(3)).toEqual(false);
				expect(puzzle.canMoveByNumber(4)).toEqual({ number : 4, from: positions3x3.middleLeft, to: positions3x3.middleMiddle, direction: 'right' });
				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(5)).toEqual({ number : 5, from: positions3x3.middleRight, to: positions3x3.middleMiddle, direction: 'left' });
				expect(puzzle.canMoveByNumber(6)).toEqual(false);
				expect(puzzle.canMoveByNumber(7)).toEqual({ number : 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up' });
				expect(puzzle.canMoveByNumber(8)).toEqual(false);
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle.canMoveByNumber(1)).toEqual(false);
				expect(puzzle.canMoveByNumber(2)).toEqual(false);
				expect(puzzle.canMoveByNumber(3)).toEqual({ number : 3, from: positions3x3.topRight, to: positions3x3.middleRight, direction: 'down' });
				expect(puzzle.canMoveByNumber(4)).toEqual(false);
				expect(puzzle.canMoveByNumber(5)).toEqual({ number : 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(6)).toEqual(false);
				expect(puzzle.canMoveByNumber(7)).toEqual(false);
				expect(puzzle.canMoveByNumber(8)).toEqual({ number : 8, from: positions3x3.bottomRight, to: positions3x3.middleRight, direction: 'up' });
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle.canMoveByNumber(1)).toEqual(false);
				expect(puzzle.canMoveByNumber(2)).toEqual(false);
				expect(puzzle.canMoveByNumber(3)).toEqual(false);
				expect(puzzle.canMoveByNumber(4)).toEqual({ number : 4, from: positions3x3.middleLeft, to: positions3x3.bottomLeft, direction: 'down' });
				expect(puzzle.canMoveByNumber(5)).toEqual(false);
				expect(puzzle.canMoveByNumber(6)).toEqual(false);
				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(7)).toEqual({ number : 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' });
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
				expect(puzzle.canMoveByNumber(5)).toEqual({ number : 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' });
				expect(puzzle.canMoveByNumber(6)).toEqual(false);
				expect(puzzle.canMoveByNumber(7)).toEqual({ number : 7, from: positions3x3.bottomLeft, to: positions3x3.bottomMiddle, direction: 'right' });
				expect(puzzle.canMoveByNumber(0)).toEqual(false);
				expect(puzzle.canMoveByNumber(8)).toEqual({ number : 8, from: positions3x3.bottomRight, to: positions3x3.bottomMiddle, direction: 'left' });
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
				expect(puzzle.canMoveByNumber(6)).toEqual({ number : 6, from: positions3x3.middleRight, to: positions3x3.bottomRight, direction: 'down' });
				expect(puzzle.canMoveByNumber(7)).toEqual(false);
				expect(puzzle.canMoveByNumber(8)).toEqual({ number : 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
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

				expect(puzzle.canMoveByDirection('up'   )).toEqual({ number : 3, from: positions3x3.middleLeft, to: positions3x3.topLeft, direction: 'up' });
				expect(puzzle.canMoveByDirection('down' )).toEqual(false);
				expect(puzzle.canMoveByDirection('left' )).toEqual({ number : 1, from: positions3x3.topMiddle, to: positions3x3.topLeft, direction: 'left' });
				expect(puzzle.canMoveByDirection('right')).toEqual(false);
			});

			it("should only allow left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual({ number : 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up' });
				expect(puzzle.canMoveByDirection('down' )).toEqual(false);
				expect(puzzle.canMoveByDirection('left' )).toEqual({ number : 2, from: positions3x3.topRight, to: positions3x3.topMiddle, direction: 'left' });
				expect(puzzle.canMoveByDirection('right')).toEqual({ number : 1, from: positions3x3.topLeft, to: positions3x3.topMiddle, direction: 'right' });
			});

			it("should only allow right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual({ number : 5, from: positions3x3.middleRight, to: positions3x3.topRight, direction: 'up' });
				expect(puzzle.canMoveByDirection('down' )).toEqual(false);
				expect(puzzle.canMoveByDirection('left' )).toEqual(false);
				expect(puzzle.canMoveByDirection('right')).toEqual({ number : 2, from: positions3x3.topMiddle, to: positions3x3.topRight, direction: 'right' });
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual({ number : 6, from: positions3x3.bottomLeft, to: positions3x3.middleLeft, direction: 'up' });
				expect(puzzle.canMoveByDirection('down' )).toEqual({ number : 1, from: positions3x3.topLeft, to: positions3x3.middleLeft, direction: 'down' });
				expect(puzzle.canMoveByDirection('left' )).toEqual({ number : 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' });
				expect(puzzle.canMoveByDirection('right')).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual({ number : 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up' });
				expect(puzzle.canMoveByDirection('down' )).toEqual({ number : 2, from: positions3x3.topMiddle, to: positions3x3.middleMiddle, direction: 'down' });
				expect(puzzle.canMoveByDirection('left' )).toEqual({ number : 5, from: positions3x3.middleRight, to: positions3x3.middleMiddle, direction: 'left' });
				expect(puzzle.canMoveByDirection('right')).toEqual({ number : 4, from: positions3x3.middleLeft, to: positions3x3.middleMiddle, direction: 'right' });
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual({ number : 8, from: positions3x3.bottomRight, to: positions3x3.middleRight, direction: 'up' });
				expect(puzzle.canMoveByDirection('down' )).toEqual({ number : 3, from: positions3x3.topRight, to: positions3x3.middleRight, direction: 'down' });
				expect(puzzle.canMoveByDirection('left' )).toEqual(false);
				expect(puzzle.canMoveByDirection('right')).toEqual({ number : 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual(false);
				expect(puzzle.canMoveByDirection('down' )).toEqual({ number : 4, from: positions3x3.middleLeft, to: positions3x3.bottomLeft, direction: 'down' });
				expect(puzzle.canMoveByDirection('left' )).toEqual({ number : 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' });
				expect(puzzle.canMoveByDirection('right')).toEqual(false);
			});

			it("should only allow left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual(false);
				expect(puzzle.canMoveByDirection('down' )).toEqual({ number : 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' });
				expect(puzzle.canMoveByDirection('left' )).toEqual({ number : 8, from: positions3x3.bottomRight, to: positions3x3.bottomMiddle, direction: 'left' });
				expect(puzzle.canMoveByDirection('right')).toEqual({ number : 7, from: positions3x3.bottomLeft, to: positions3x3.bottomMiddle, direction: 'right' });
			});

			it("should only allow left and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});

				expect(puzzle.canMoveByDirection('up'   )).toEqual(false);
				expect(puzzle.canMoveByDirection('down' )).toEqual({ number : 6, from: positions3x3.middleRight, to: positions3x3.bottomRight, direction: 'down' });
				expect(puzzle.canMoveByDirection('left' )).toEqual(false);
				expect(puzzle.canMoveByDirection('right')).toEqual({ number : 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
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

		describe("move()", function() {
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
		});

		describe("_getDirection()", function() {
			it("should return the correct direction for a move ", function() {
				expect(puzzle._getDirection({ number : 1, from: positions3x3.middleMiddle, to: positions3x3.topMiddle })).toEqual('up');
				expect(puzzle._getDirection({ number : 1, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle })).toEqual('down');
				expect(puzzle._getDirection({ number : 1, from: positions3x3.middleMiddle, to: positions3x3.middleLeft })).toEqual('left');
				expect(puzzle._getDirection({ number : 1, from: positions3x3.middleMiddle, to: positions3x3.middleRight })).toEqual('right');
			});
		});
	});
});
