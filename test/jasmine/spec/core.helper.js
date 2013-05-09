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

	// some sample positions on a 3x3 puzzle
	var positions = {
		topLeft:		{ row: 0, col: 0 },
		topRight:		{ row: 0, col: 2 },
		bottomLeft:		{ row: 2, col: 0 },
		bottomRight:	{ row: 2, col: 2 },
		middle:			{ row: 1, col: 1 }
	};

	beforeEach(function() {
		puzzle = new SliderPuzzle({
			board: board3x3
		});
	});

	describe("to1dPosition()", function() {
		it("should convert a two-dimensional row-col index into a one-dimensional index", function() {
			expect(puzzle.to1dPosition(positions.topLeft)    ).toEqual(0);
			expect(puzzle.to1dPosition(positions.topRight)   ).toEqual(2);
			expect(puzzle.to1dPosition(positions.bottomLeft) ).toEqual(6);
			expect(puzzle.to1dPosition(positions.bottomRight)).toEqual(8);
			expect(puzzle.to1dPosition(positions.middle)     ).toEqual(4);
		});
	});

	describe("to2dPosition()", function() {
		it("should convert a one-dimensional index into a two-dimensional row-col index", function() {
			expect(puzzle.to2dPosition(0)).toEqual(positions.topLeft);
			expect(puzzle.to2dPosition(2)).toEqual(positions.topRight);
			expect(puzzle.to2dPosition(6)).toEqual(positions.bottomLeft);
			expect(puzzle.to2dPosition(8)).toEqual(positions.bottomRight);
			expect(puzzle.to2dPosition(4)).toEqual(positions.middle);
		});
	});

	describe("isSolvable()", function() {
		it("should identify a solvable board as solvable", function() {
			puzzle = new SliderPuzzle({
				board: [1,	2,
						0,	3]
			});
			expect(puzzle.isSolvable()).toBe(true);

			puzzle = new SliderPuzzle({
				board: [1,	2,
						3,	0]
			});
			expect(puzzle.isSolvable()).toBe(true);

			puzzle = new SliderPuzzle({
				board: [1,	2,
						0,	4]
			});
			expect(puzzle.isSolvable()).toBe(true);

			puzzle = new SliderPuzzle({
				board: [1,	2,
						4,	0]
			});
			expect(puzzle.isSolvable()).toBe(true);

			puzzle = new SliderPuzzle({
				board: [1,	2,	3,
						4,	5,	0],
				rows: 2
			});
			expect(puzzle.isSolvable()).toBe(true);
		});

		it("should not identify a non-solvable board as solvable", function() {
			puzzle = new SliderPuzzle({
				board: [2,	1,
						3,	0]
			});
			expect(puzzle.isSolvable()).toBe(false);

			puzzle = new SliderPuzzle({
				board: [1,	3,
						2,	0]
			});
			expect(puzzle.isSolvable()).toBe(false);

			puzzle = new SliderPuzzle({
				board: [1,	2,	3,
						5,	4,	0],
				rows: 2
			});
			expect(puzzle.isSolvable()).toBe(false);
		});
	});

	describe("isSolved()", function() {
		it("should identify a solved board as solved", function() {
			puzzle = new SliderPuzzle({
				board: [1,	2,
						3,	0]
			});
			expect(puzzle.isSolved()).toBe(true);

			puzzle = new SliderPuzzle({
				board: [1,	2,
						0,	4]
			});
			expect(puzzle.isSolved()).toBe(true);

			puzzle = new SliderPuzzle({
				board: [1,	2,	3,
						4,	5,	0],
				rows: 2
			});
			expect(puzzle.isSolved()).toBe(true);
		});

		it("should not identify a unsolved board as solved", function() {
			puzzle = new SliderPuzzle({
				board: [1,	2,
						0,	3]
			});
			expect(puzzle.isSolved()).toBe(false);

			puzzle = new SliderPuzzle({
				board: [1,	2,
						4,	0]
			});
			expect(puzzle.isSolved()).toBe(false);

			puzzle = new SliderPuzzle({
				board: [1,	2,	3,
						4,	0,	5],
				rows: 2
			});
			expect(puzzle.isSolved()).toBe(false);
		});
	});

	describe("normalizePosition()", function() {

		it("should handle row and col passed in as seperate arguments", function() {
			expect(puzzle.normalizePosition(0, 0)).toEqual(positions.topLeft);
			expect(puzzle.normalizePosition(0, 2)).toEqual(positions.topRight);
			expect(puzzle.normalizePosition(2, 0)).toEqual(positions.bottomLeft);
			expect(puzzle.normalizePosition(2, 2)).toEqual(positions.bottomRight);
			expect(puzzle.normalizePosition(1, 1)).toEqual(positions.middle);
		});

		it("should handle row and col passed in as an array", function() {
			expect(puzzle.normalizePosition([0, 0])).toEqual(positions.topLeft);
			expect(puzzle.normalizePosition([0, 2])).toEqual(positions.topRight);
			expect(puzzle.normalizePosition([2, 0])).toEqual(positions.bottomLeft);
			expect(puzzle.normalizePosition([2, 2])).toEqual(positions.bottomRight);
			expect(puzzle.normalizePosition([1, 1])).toEqual(positions.middle);
		});

		it("should handle row and col passed in as an object", function() {
			expect(puzzle.normalizePosition({ row: 0, col: 0 })).toEqual(positions.topLeft);
			expect(puzzle.normalizePosition({ row: 0, col: 2 })).toEqual(positions.topRight);
			expect(puzzle.normalizePosition({ row: 2, col: 0 })).toEqual(positions.bottomLeft);
			expect(puzzle.normalizePosition({ row: 2, col: 2 })).toEqual(positions.bottomRight);
			expect(puzzle.normalizePosition({ row: 1, col: 1 })).toEqual(positions.middle);
		});

		it("should handle a single value as the index of the one-dimensional board array", function() {
			expect(puzzle.normalizePosition(0)).toEqual(positions.topLeft);
			expect(puzzle.normalizePosition(2)).toEqual(positions.topRight);
			expect(puzzle.normalizePosition(6)).toEqual(positions.bottomLeft);
			expect(puzzle.normalizePosition(8)).toEqual(positions.bottomRight);
			expect(puzzle.normalizePosition(4)).toEqual(positions.middle);
		});
	});

	describe("getPosition()", function() {
		it("should find positions when given a label number", function() {
			expect(puzzle.getPosition(0)).toEqual(8);
			expect(puzzle.getPosition(1)).toEqual(0);
			expect(puzzle.getPosition(2)).toEqual(1);
			expect(puzzle.getPosition(3)).toEqual(2);
			expect(puzzle.getPosition(4)).toEqual(3);
			expect(puzzle.getPosition(5)).toEqual(4);
			expect(puzzle.getPosition(6)).toEqual(5);
			expect(puzzle.getPosition(7)).toEqual(6);
			expect(puzzle.getPosition(8)).toEqual(7);
		});

		// TODO disabled
		xit("should find positions when given a direction keyword", function() {
			expect(puzzle.getPosition('up'   )).toBeUndefined();
			expect(puzzle.getPosition('down' )).toEqual(5);
			expect(puzzle.getPosition('left' )).toBeUndefined();
			expect(puzzle.getPosition('right')).toEqual(7);
		});
	});

	describe("canMoveByPosition()", function() {
		it("should only allow down and right moves if the hole is bottom right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
			});

			expect(puzzle.canMoveByPosition(0, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(0, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(0, 2)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 2)).toBe(true);
			expect(puzzle.canMoveByPosition(2, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 1)).toBe(true);
			expect(puzzle.canMoveByPosition(2, 2)).toBe(false);
		});

		it("should only allow down, left and right moves if the hole is bottom middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
			});

			expect(puzzle.canMoveByPosition(0, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(0, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(0, 2)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 1)).toBe(true);
			expect(puzzle.canMoveByPosition(1, 2)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 0)).toBe(true);
			expect(puzzle.canMoveByPosition(2, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 2)).toBe(true);
		});

		it("should only allow down and left moves if the hole is bottom left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
			});

			expect(puzzle.canMoveByPosition(0, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(0, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(0, 2)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 0)).toBe(true);
			expect(puzzle.canMoveByPosition(1, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 2)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 1)).toBe(true);
			expect(puzzle.canMoveByPosition(2, 2)).toBe(false);
		});

		it("should only allow up, down and right moves if the hole is middle right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
			});

			expect(puzzle.canMoveByPosition(0, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(0, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(0, 2)).toBe(true);
			expect(puzzle.canMoveByPosition(1, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 1)).toBe(true);
			expect(puzzle.canMoveByPosition(1, 2)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 2)).toBe(true);
		});

		it("should allow up, down, left and right moves if the hole is middle middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
			});

			expect(puzzle.canMoveByPosition(0, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(0, 1)).toBe(true);
			expect(puzzle.canMoveByPosition(0, 2)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 0)).toBe(true);
			expect(puzzle.canMoveByPosition(1, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 2)).toBe(true);
			expect(puzzle.canMoveByPosition(2, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 1)).toBe(true);
			expect(puzzle.canMoveByPosition(2, 2)).toBe(false);
		});

		it("should only allow top, down and left moves if the hole is middle left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMoveByPosition(0, 0)).toBe(true);
			expect(puzzle.canMoveByPosition(0, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(0, 2)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 1)).toBe(true);
			expect(puzzle.canMoveByPosition(1, 2)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 0)).toBe(true);
			expect(puzzle.canMoveByPosition(2, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 2)).toBe(false);
		});

		it("should only allow down and right moves if the hole is top right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMoveByPosition(0, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(0, 1)).toBe(true);
			expect(puzzle.canMoveByPosition(0, 2)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 2)).toBe(true);
			expect(puzzle.canMoveByPosition(2, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 2)).toBe(false);
		});

		it("should allow down, left and right moves if the hole is top middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMoveByPosition(0, 0)).toBe(true);
			expect(puzzle.canMoveByPosition(0, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(0, 2)).toBe(true);
			expect(puzzle.canMoveByPosition(1, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 1)).toBe(true);
			expect(puzzle.canMoveByPosition(1, 2)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 2)).toBe(false);
		});

		it("should only allow down and left moves if the hole is top left", function() {
			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMoveByPosition(0, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(0, 1)).toBe(true);
			expect(puzzle.canMoveByPosition(0, 2)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 0)).toBe(true);
			expect(puzzle.canMoveByPosition(1, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(1, 2)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 0)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 1)).toBe(false);
			expect(puzzle.canMoveByPosition(2, 2)).toBe(false);
		});
	});

});
