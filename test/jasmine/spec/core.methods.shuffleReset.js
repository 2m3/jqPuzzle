describe("Shuffle and Reset: ", function() {

	describe("shuffle()", function() {
		var board;
		var solvedBoard = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];

		it("should shuffle a board that contains all numbers from 1 to row*cols with any one number replaced with 0", function() {
			puzzle = new SliderPuzzle();

			puzzle.shuffle();

			for (var i = 0; i < solvedBoard.length; i++) {
				expect(puzzle._board).toContain(solvedBoard[i]);
			}

			puzzle = new SliderPuzzle({
				hole: 3
			});

			puzzle.shuffle();

			for (i = 0; i < solvedBoard.length; i++) {
				expect(puzzle._board).toContain([1,2,0,4,5,6,7,8,9,10,11,12,13,14,15,16][i]);
			}

			puzzle = new SliderPuzzle({
				initialHole: 3
			});

			puzzle.shuffle();

			for (i = 0; i < solvedBoard.length; i++) {
				expect(puzzle._board).toContain(solvedBoard[i]);
			}

			puzzle = new SliderPuzzle({
				hole: 3,
				initialHole: 3
			});

			puzzle.shuffle();

			for (i = 0; i < solvedBoard.length; i++) {
				expect(puzzle._board).toContain([1,2,0,4,5,6,7,8,9,10,11,12,13,14,15,16][i]);
			}
		});

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
	});

	describe("restart()", function() {
		it("should generate the solved board if the shuffle value is 0", function() {
			puzzle = new SliderPuzzle();

			puzzle.restart(0);
			expect(puzzle._board).toEqual(puzzle.getSolvedBoard());
		});

		it("should generate one out of two boards if the shuffle value is 1", function() {
			for (var i = 0; i < 100; i++) {
				puzzle = new SliderPuzzle({
					rows: 2,
					cols: 2
				});

				puzzle.restart(1);
				expect(puzzle._board).toEqualAny([[1,2,0,3], [1,0,3,2]]);
			}
		});

		it("should generate one out of two boards if the shuffle value is 2", function() {
			for (var i = 0; i < 100; i++) {
				puzzle = new SliderPuzzle({
					rows: 2,
					cols: 2
				});

				puzzle.restart(2);
				expect(puzzle._board).toEqualAny([[0,2,1,3], [0,1,3,2]]);
			}
		});

		it("should throw an exception if the shuffle value is invalid", function() {
			var SHUFFLE_INVALID = "invalid shuffle value";

			puzzle = new SliderPuzzle();
			expect(function() { puzzle.restart(null); }).toThrow(SHUFFLE_INVALID);
		});
	});
});
