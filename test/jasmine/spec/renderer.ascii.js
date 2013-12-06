describe("ASCII Renderer:", function() {

	it("should render the board correctly", function() {
		puzzle = new SliderPuzzle({
			board: board2x2
		});
		expect(puzzle.toString()).toEqual("\n" +
			"+---+---+\n" +
			"| 3 | 2 |\n" +
			"+---+---+\n" +
			"| 1 |   |\n" +
			"+---+---+\n"
		);

		puzzle = new SliderPuzzle({
			board: board3x3
		});
		expect(puzzle.toString()).toEqual("\n" +
			"+---+---+---+\n" +
			"| 1 | 2 | 3 |\n" +
			"+---+---+---+\n" +
			"| 4 | 5 | 6 |\n" +
			"+---+---+---+\n" +
			"| 7 | 8 |   |\n" +
			"+---+---+---+\n"
		);

		puzzle = new SliderPuzzle({
			board: [2, 4, 6, 8, 10, 12, 14, 0, 1, 3, 5, 7, 9, 11, 13, 15]
		});
		expect(puzzle.toString()).toEqual("\n" +
			"+----+----+----+----+\n" +
			"|  2 |  4 |  6 |  8 |\n" +
			"+----+----+----+----+\n" +
			"| 10 | 12 | 14 |    |\n" +
			"+----+----+----+----+\n" +
			"|  1 |  3 |  5 |  7 |\n" +
			"+----+----+----+----+\n" +
			"|  9 | 11 | 13 | 15 |\n" +
			"+----+----+----+----+\n"
		);

		puzzle = new SliderPuzzle({
			board: board2x5,
			rows: 2
		});
		expect(puzzle.toString()).toEqual("\n" +
			"+---+---+---+---+---+\n" +
			"|   | 9 | 8 | 7 | 6 |\n" +
			"+---+---+---+---+---+\n" +
			"| 5 | 4 | 3 | 2 | 1 |\n" +
			"+---+---+---+---+---+\n"
		);
	});
});
