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
