describe("Helper: ", function() {

	var puzzle;
	var board3x3;
	var board4x4;
	var board2x5;

	beforeEach(function() {
		// 0 replaced for 4, unsolvable
		board2x2 = [3,	2,
					1,	0];

		// 0 replaced for 9, solved
		board3x3 = [1,	2,	3,
					4,	5,	6,
					7,	8,	0];

		// 0 replaced for 16, different initial and solved hole positions
		board4x4 = [2,	4,	6,	8,
					10,	12,	14,	0,
					1,	3,	5,	7,
					9,	11,	13,	15];

		// 0 replaced for 10, different initial and solved hole positions
		board2x5 = [0,	9,
					8,	7,
					6,	5,
					4,	3,
					2,	1];
	});

	describe("Solving", function() {

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

	describe("Positions", function() {

		// some sample positions on a 3x3 puzzle
		var positions = {
			topLeft:		{ index: 1, row: 1, col: 1 },
			topRight:		{ index: 3, row: 1, col: 3 },
			bottomLeft:		{ index: 7, row: 3, col: 1 },
			bottomRight:	{ index: 9, row: 3, col: 3 },
			middle:			{ index: 5, row: 2, col: 2 }
		};

		beforeEach(function() {
			puzzle = new SliderPuzzle({
				board: board3x3
			});
		});

		describe("getPositionFromRowCol()", function() {
			var ROW_INVALID  = 'invalid row';
			var COL_INVALID  = 'invalid col';

			it("should create a position object from given row and col numbers", function() {
				expect(puzzle.getPositionFromRowCol(1, 1)).toEqual(positions.topLeft);
				expect(puzzle.getPositionFromRowCol(1, 3)).toEqual(positions.topRight);
				expect(puzzle.getPositionFromRowCol(3, 1)).toEqual(positions.bottomLeft);
				expect(puzzle.getPositionFromRowCol(3, 3)).toEqual(positions.bottomRight);
				expect(puzzle.getPositionFromRowCol(2, 2)).toEqual(positions.middle);
			});

			it("should throw an exception if the row or col value is out of bounds", function() {
				expect(function() { puzzle.getPositionFromRowCol(-1, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPositionFromRowCol( 0, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPositionFromRowCol(10, 1); }).toThrow(ROW_INVALID);
				expect(function() { puzzle.getPositionFromRowCol(1, -1); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPositionFromRowCol(1,  0); }).toThrow(COL_INVALID);
				expect(function() { puzzle.getPositionFromRowCol(1, 10); }).toThrow(COL_INVALID);
			});
		});

		describe("getPositionFromIndex()", function() {
			var INDEX_INVALID  = 'invalid index';

			it("should create a position object from a given one-dimensional index", function() {
				expect(puzzle.getPositionFromIndex(1)).toEqual(positions.topLeft);
				expect(puzzle.getPositionFromIndex(3)).toEqual(positions.topRight);
				expect(puzzle.getPositionFromIndex(7)).toEqual(positions.bottomLeft);
				expect(puzzle.getPositionFromIndex(9)).toEqual(positions.bottomRight);
				expect(puzzle.getPositionFromIndex(5)).toEqual(positions.middle);
			});

			it("should throw an exception if the one-dimensional index is out of bounds", function() {
				expect(function() { puzzle.getPositionFromIndex(-1); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.getPositionFromIndex( 0); }).toThrow(INDEX_INVALID);
				expect(function() { puzzle.getPositionFromIndex(10); }).toThrow(INDEX_INVALID);
			});
		});

		describe("normalizePosition()", function() {

			it("should handle row and col passed in as seperate arguments", function() {
				expect(puzzle.normalizePosition(1, 1)).toEqual(positions.topLeft);
				expect(puzzle.normalizePosition(1, 3)).toEqual(positions.topRight);
				expect(puzzle.normalizePosition(3, 1)).toEqual(positions.bottomLeft);
				expect(puzzle.normalizePosition(3, 3)).toEqual(positions.bottomRight);
				expect(puzzle.normalizePosition(2, 2)).toEqual(positions.middle);
			});

			it("should handle row and col passed in as an array", function() {
				expect(puzzle.normalizePosition([1, 1])).toEqual(positions.topLeft);
				expect(puzzle.normalizePosition([1, 3])).toEqual(positions.topRight);
				expect(puzzle.normalizePosition([3, 1])).toEqual(positions.bottomLeft);
				expect(puzzle.normalizePosition([3, 3])).toEqual(positions.bottomRight);
				expect(puzzle.normalizePosition([2, 2])).toEqual(positions.middle);
			});

			it("should handle row and col passed in as an object", function() {
				expect(puzzle.normalizePosition({ row: 1, col: 1 })).toEqual(positions.topLeft);
				expect(puzzle.normalizePosition({ row: 1, col: 3 })).toEqual(positions.topRight);
				expect(puzzle.normalizePosition({ row: 3, col: 1 })).toEqual(positions.bottomLeft);
				expect(puzzle.normalizePosition({ row: 3, col: 3 })).toEqual(positions.bottomRight);
				expect(puzzle.normalizePosition({ row: 2, col: 2 })).toEqual(positions.middle);
			});

			it("should handle a one-dimensional index", function() {
				expect(puzzle.normalizePosition(1)).toEqual(positions.topLeft);
				expect(puzzle.normalizePosition(3)).toEqual(positions.topRight);
				expect(puzzle.normalizePosition(7)).toEqual(positions.bottomLeft);
				expect(puzzle.normalizePosition(9)).toEqual(positions.bottomRight);
				expect(puzzle.normalizePosition(5)).toEqual(positions.middle);
			});

			it("should throw an exception if the arguments are out of bounds", function() {
				expect(function() { puzzle.normalizePosition(-1, 1); }).toThrow();
				expect(function() { puzzle.normalizePosition( 0, 1); }).toThrow();
				expect(function() { puzzle.normalizePosition(10, 1); }).toThrow();
				expect(function() { puzzle.normalizePosition(1, -1); }).toThrow();
				expect(function() { puzzle.normalizePosition(1,  0); }).toThrow();
				expect(function() { puzzle.normalizePosition(1, 10); }).toThrow();
				expect(function() { puzzle.normalizePosition([-1, 1]); }).toThrow();
				expect(function() { puzzle.normalizePosition([ 0, 1]); }).toThrow();
				expect(function() { puzzle.normalizePosition([10, 1]); }).toThrow();
				expect(function() { puzzle.normalizePosition([1, -1]); }).toThrow();
				expect(function() { puzzle.normalizePosition([1,  0]); }).toThrow();
				expect(function() { puzzle.normalizePosition([1, 10]); }).toThrow();
				expect(function() { puzzle.normalizePosition({ row: -1, col:  1 }); }).toThrow();
				expect(function() { puzzle.normalizePosition({ row:  0, col:  1 }); }).toThrow();
				expect(function() { puzzle.normalizePosition({ row: 10, col:  1 }); }).toThrow();
				expect(function() { puzzle.normalizePosition({ row:  1, col: -1 }); }).toThrow();
				expect(function() { puzzle.normalizePosition({ row:  1, col:  0 }); }).toThrow();
				expect(function() { puzzle.normalizePosition({ row:  1, col: 10 }); }).toThrow();
				expect(function() { puzzle.normalizePosition(-1); }).toThrow();
				expect(function() { puzzle.normalizePosition( 0); }).toThrow();
				expect(function() { puzzle.normalizePosition(10); }).toThrow();
			});
		});

		describe("getPosition()", function() {
			it("should find the position from a piece by its number", function() {
				expect(puzzle.getPosition(1)).toEqual({ index: 1, row: 1, col: 1 });
				expect(puzzle.getPosition(2)).toEqual({ index: 2, row: 1, col: 2 });
				expect(puzzle.getPosition(3)).toEqual({ index: 3, row: 1, col: 3 });
				expect(puzzle.getPosition(4)).toEqual({ index: 4, row: 2, col: 1 });
				expect(puzzle.getPosition(5)).toEqual({ index: 5, row: 2, col: 2 });
				expect(puzzle.getPosition(6)).toEqual({ index: 6, row: 2, col: 3 });
				expect(puzzle.getPosition(7)).toEqual({ index: 7, row: 3, col: 1 });
				expect(puzzle.getPosition(8)).toEqual({ index: 8, row: 3, col: 2 });
				expect(puzzle.getPosition(0)).toEqual({ index: 9, row: 3, col: 3 });
			});

			it("should throw an exception if the number is out of bounds", function() {
				expect(function() { puzzle.getPosition(-1); }).toThrow();
				expect(function() { puzzle.getPosition( 9); }).toThrow();
			});
		});
	});

	describe("Moves", function() {
		describe("canMoveDirection()", function() {
			it("should only allow left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});
				expect(puzzle.canMoveDirection('up'   )).toEqual(4);
				expect(puzzle.canMoveDirection('down' )).toEqual(false);
				expect(puzzle.canMoveDirection('left' )).toEqual(2);
				expect(puzzle.canMoveDirection('right')).toEqual(false);
			});

			it("should only allow left, right and up moves if the hole is top middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
				});
				expect(puzzle.canMoveDirection('up'   )).toEqual(5);
				expect(puzzle.canMoveDirection('down' )).toEqual(false);
				expect(puzzle.canMoveDirection('left' )).toEqual(3);
				expect(puzzle.canMoveDirection('right')).toEqual(1);
			});

			it("should only allow right and up moves if the hole is top right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
				});
				expect(puzzle.canMoveDirection('up'   )).toEqual(6);
				expect(puzzle.canMoveDirection('down' )).toEqual(false);
				expect(puzzle.canMoveDirection('left' )).toEqual(false);
				expect(puzzle.canMoveDirection('right')).toEqual(2);
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});
				expect(puzzle.canMoveDirection('up'   )).toEqual(7);
				expect(puzzle.canMoveDirection('down' )).toEqual(1);
				expect(puzzle.canMoveDirection('left' )).toEqual(5);
				expect(puzzle.canMoveDirection('right')).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});
				expect(puzzle.canMoveDirection('up'   )).toEqual(8);
				expect(puzzle.canMoveDirection('down' )).toEqual(2);
				expect(puzzle.canMoveDirection('left' )).toEqual(6);
				expect(puzzle.canMoveDirection('right')).toEqual(4);
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});
				expect(puzzle.canMoveDirection('up'   )).toEqual(9);
				expect(puzzle.canMoveDirection('down' )).toEqual(3);
				expect(puzzle.canMoveDirection('left' )).toEqual(false);
				expect(puzzle.canMoveDirection('right')).toEqual(5);
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});
				expect(puzzle.canMoveDirection('up'   )).toEqual(false);
				expect(puzzle.canMoveDirection('down' )).toEqual(4);
				expect(puzzle.canMoveDirection('left' )).toEqual(8);
				expect(puzzle.canMoveDirection('right')).toEqual(false);
			});

			it("should only allow left, right and down moves if the hole is bottom middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
				});
				expect(puzzle.canMoveDirection('up'   )).toEqual(false);
				expect(puzzle.canMoveDirection('down' )).toEqual(5);
				expect(puzzle.canMoveDirection('left' )).toEqual(9);
				expect(puzzle.canMoveDirection('right')).toEqual(7);
			});

			it("should only allow left and down moves if the hole is bottom right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
				});
				expect(puzzle.canMoveDirection('up'   )).toEqual(false);
				expect(puzzle.canMoveDirection('down' )).toEqual(6);
				expect(puzzle.canMoveDirection('left' )).toEqual(false);
				expect(puzzle.canMoveDirection('right')).toEqual(8);
			});

			it("should throw an exception if the direction value is invalid", function() {
				var DIRECTION_INVALID = 'invalid direction';

				puzzle = new SliderPuzzle({
					board: board3x3
				});

				expect(function() { puzzle.canMoveDirection('uup'); }).toThrow(DIRECTION_INVALID);
				expect(function() { puzzle.canMoveDirection(''   ); }).toThrow(DIRECTION_INVALID);
				expect(function() { puzzle.canMoveDirection(0    ); }).toThrow(DIRECTION_INVALID);
				expect(function() { puzzle.canMoveDirection(false); }).toThrow(DIRECTION_INVALID);
				expect(function() { puzzle.canMoveDirection(null ); }).toThrow(DIRECTION_INVALID);
				expect(function() { puzzle.canMoveDirection(     ); }).toThrow(DIRECTION_INVALID);
			});
		});

		describe("canMove()", function() {
			it("should only allow left and up moves if the hole is top left", function() {
				puzzle = new SliderPuzzle({
					board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual({ index : 2, row : 1, col : 2 });
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual({ index : 4, row : 2, col : 1 });
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

				expect(puzzle.canMove(1)).toEqual({ index : 1, row : 1, col : 1 });
				expect(puzzle.canMove(2)).toEqual(false);
				expect(puzzle.canMove(3)).toEqual({ index : 3, row : 1, col : 3 });
				expect(puzzle.canMove(4)).toEqual(false);
				expect(puzzle.canMove(5)).toEqual({ index : 5, row : 2, col : 2 });
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
				expect(puzzle.canMove(2)).toEqual({ index : 2, row : 1, col : 2 });
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual(false);
				expect(puzzle.canMove(5)).toEqual(false);
				expect(puzzle.canMove(6)).toEqual({ index : 6, row : 2, col : 3 });
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual(false);
			});

			it("should only allow left, up and down moves if the hole is middle left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual({ index : 1, row : 1, col : 1 });
				expect(puzzle.canMove(2)).toEqual(false);
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual(false);
				expect(puzzle.canMove(5)).toEqual({ index : 5, row : 2, col : 2 });
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual({ index : 7, row : 3, col : 1 });
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual(false);
			});

			it("should allow left, right, up and down moves if the hole is middle middle", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual({ index : 2, row : 1, col : 2 });
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual({ index : 4, row : 2, col : 1 });
				expect(puzzle.canMove(5)).toEqual(false);
				expect(puzzle.canMove(6)).toEqual({ index : 6, row : 2, col : 3 });
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual({ index : 8, row : 3, col : 2 });
				expect(puzzle.canMove(9)).toEqual(false);
			});

			it("should only allow right, up and down moves if the hole is middle right", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual(false);
				expect(puzzle.canMove(3)).toEqual({ index : 3, row : 1, col : 3 });
				expect(puzzle.canMove(4)).toEqual(false);
				expect(puzzle.canMove(5)).toEqual({ index : 5, row : 2, col : 2 });
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual({ index : 9, row : 3, col : 3 });
			});

			it("should only allow left and down moves if the hole is bottom left", function() {
				puzzle = new SliderPuzzle({
					board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
				});

				expect(puzzle.canMove(1)).toEqual(false);
				expect(puzzle.canMove(2)).toEqual(false);
				expect(puzzle.canMove(3)).toEqual(false);
				expect(puzzle.canMove(4)).toEqual({ index : 4, row : 2, col : 1 });
				expect(puzzle.canMove(5)).toEqual(false);
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual({ index : 8, row : 3, col : 2 });
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
				expect(puzzle.canMove(5)).toEqual({ index : 5, row : 2, col : 2 });
				expect(puzzle.canMove(6)).toEqual(false);
				expect(puzzle.canMove(7)).toEqual({ index : 7, row : 3, col : 1 });
				expect(puzzle.canMove(8)).toEqual(false);
				expect(puzzle.canMove(9)).toEqual({ index : 9, row : 3, col : 3 });
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
				expect(puzzle.canMove(6)).toEqual({ index : 6, row : 2, col : 3 });
				expect(puzzle.canMove(7)).toEqual(false);
				expect(puzzle.canMove(8)).toEqual({ index : 8, row : 3, col : 2 });
				expect(puzzle.canMove(9)).toEqual(false);
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
	});
});
