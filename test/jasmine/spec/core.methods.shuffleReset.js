describe("Shuffle and Reset: ", function() {

	describe("shuffle()", function() {
		var board;
		var solvedBoard = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];

		it("should shuffle the board when called after initializing the puzzle with the shuffle option not specified", function() {
			puzzle = new SliderPuzzle();

			board = puzzle._board;

			puzzle.shuffle();
			expect(puzzle._board).not.toEqual(board);
			expect(puzzle._board).not.toEqual(solvedBoard);
		});

		it("should shuffle the board when called after initializing the puzzle with the shuffle option set to true", function() {
			puzzle = new SliderPuzzle({
				shuffle: true
			});

			board = puzzle._board;

			puzzle.shuffle();
			expect(puzzle._board).not.toEqual(board);
			expect(puzzle._board).not.toEqual(solvedBoard);
		});

		it("should shuffle the board when called after initializing the puzzle with the shuffle option set to false", function() {
			puzzle = new SliderPuzzle({
				shuffle: false
			});

			board = puzzle._board;

			puzzle.shuffle();
			expect(puzzle._board).not.toEqual(board);
			expect(puzzle._board).not.toEqual(solvedBoard);
		});

		it("should shuffle the board when called after initializing the puzzle with the shuffle option set to an integer", function() {
			puzzle = new SliderPuzzle({
				shuffle: 0
			});

			board = puzzle._board;

			puzzle.shuffle();
			expect(puzzle._board).not.toEqual(board);
			expect(puzzle._board).not.toEqual(solvedBoard);

			puzzle = new SliderPuzzle({
				shuffle: 1
			});

			board = puzzle._board;

			puzzle.shuffle();
			expect(puzzle._board).not.toEqual(board);
			expect(puzzle._board).not.toEqual(solvedBoard);
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
