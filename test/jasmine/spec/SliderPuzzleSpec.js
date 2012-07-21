describe("Slider Puzzle:", function() {
	var puzzle;
	var board3x3;
	var board4x4;
	var board2x5;

	beforeEach(function() {
		board2x2 = [3, 2, 1, 0];
		board3x3 = [1, 2, 3, 4, 5, 6, 7, 8, 0];
		board4x4 = [2, 4, 6, 8, 10, 12, 14, 0, 1, 3, 5, 7, 9, 11, 13, 15];
		board2x5 = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1];
	});

	describe("Initialization:", function() {

		describe("When initialized, a slider puzzle", function() {

			it ("should parse a specified rows or columns value into an integer", function() {
				puzzle = new SliderPuzzle({
					rows: "5",
					columns: "6"
				});
				expect(puzzle.rows).toEqual(5);
				expect(puzzle.columns).toEqual(6);

				puzzle = new SliderPuzzle({
					rows: "5.1",
					columns: "6.9"
				});
				expect(puzzle.rows).toEqual(5);
				expect(puzzle.columns).toEqual(6);

				puzzle = new SliderPuzzle({
					rows: 5.2,
					columns: 6.8
				});
				expect(puzzle.rows).toEqual(5);
				expect(puzzle.columns).toEqual(6);
			});

			it("should throw an exception if rows is less than 2 or cannot be parsed as an integer", function() {
				var exceptionString = "invalid rows value";

				expect(function() {
					new SliderPuzzle({
						rows: 1
					});
				}).toThrow(exceptionString);

				expect(function() {
					new SliderPuzzle({
						rows: 0
					});
				}).toThrow(exceptionString);

				expect(function() {
					new SliderPuzzle({
						rows: -1
					});
				}).toThrow(exceptionString);

				expect(function() {
					new SliderPuzzle({
						rows: "-2"
					});
				}).toThrow(exceptionString);

				expect(function() {
					new SliderPuzzle({
						rows: "test"
					});
				}).toThrow(exceptionString);
			});

			it("should throw an exception if columns is less than 2 or cannot be parsed as an integer", function() {
				var exceptionString = "invalid columns value";

				expect(function() {
					new SliderPuzzle({
						columns: 1
					});
				}).toThrow(exceptionString);

				expect(function() {
					new SliderPuzzle({
						columns: 0
					});
				}).toThrow(exceptionString);

				expect(function() {
					new SliderPuzzle({
						columns: -1
					});
				}).toThrow(exceptionString);

				expect(function() {
					new SliderPuzzle({
						columns: "-2"
					});
				}).toThrow(exceptionString);

				expect(function() {
					new SliderPuzzle({
						columns: "test"
					});
				}).toThrow(exceptionString);
			});
		});

		describe("When initialized WITHOUT a board, a slider puzzle", function() {

			it("should have the specified number of rows and columns", function() {
				puzzle = new SliderPuzzle({
					rows: 3,
					columns: 11
				});
				expect(puzzle.rows).toEqual(3);
				expect(puzzle.columns).toEqual(11);
			});

			it("should have 4 rows, if not specified", function() {
				puzzle = new SliderPuzzle({
					columns: 3
				});
				expect(puzzle.rows).toEqual(4);
				expect(puzzle.columns).toEqual(3);
			});

			it("should have 4 columns, if not specified", function() {
				puzzle = new SliderPuzzle({
					rows: 5
				});
				expect(puzzle.rows).toEqual(5);
				expect(puzzle.columns).toEqual(4);
			});

			it("should have 4 rows and 4 columns, if none is specified", function() {
				puzzle = new SliderPuzzle();
				expect(puzzle.rows).toEqual(4);
				expect(puzzle.columns).toEqual(4);
			});
		});

		describe("When initialized WITH a board, a slider puzzle", function() {
			var exceptionString = "board does not match rows or columns";

			it("should throw an exception if board is not an array", function() {
				var exceptionString = "invalid board";

				expect(function() {
					new SliderPuzzle({
						board: 4
					});
				}).toThrow(exceptionString);

				expect(function() {
					new SliderPuzzle({
						board: "test"
					});
				}).toThrow(exceptionString);

				expect(function() {
					new SliderPuzzle({
						board: {}
					});
				}).toThrow(exceptionString);
			});

			it("should throw an exception if an empty board is specified", function() {

				expect(function() {
					new SliderPuzzle({
						board: []
					});
				}).toThrow();

				expect(function() {
					new SliderPuzzle({
						board: [],
						rows: 3
					});
				}).toThrow();

				expect(function() {
					new SliderPuzzle({
						board: [],
						columns: 4
					});
				}).toThrow();

				expect(function() {
					new SliderPuzzle({
						board: [],
						rows: 2,
						columns: 5
					});
				}).toThrow();
			});

			it("should infer rows and columns by assuming both have the same value, if none is specified", function() {
				puzzle = new SliderPuzzle({
					board: board2x2
				});
				expect(puzzle.rows).toEqual(2);
				expect(puzzle.columns).toEqual(2);

				puzzle = new SliderPuzzle({
					board: board3x3
				});
				expect(puzzle.rows).toEqual(3);
				expect(puzzle.columns).toEqual(3);

				puzzle = new SliderPuzzle({
					board: board4x4
				});
				expect(puzzle.rows).toEqual(4);
				expect(puzzle.columns).toEqual(4);
			});

			it("should throw an exception if neither rows nor columns are specified and the board is not squared", function() {
				expect(function() {
					new SliderPuzzle({
						board: board2x5
					});
				}).toThrow(exceptionString);
			});

			it("should infer a rows or columns value if only one is specified", function() {
				puzzle = new SliderPuzzle({
					board: board3x3,
					rows: 3
				});
				expect(puzzle.rows).toEqual(3);
				expect(puzzle.columns).toEqual(3);

				puzzle = new SliderPuzzle({
					board: board3x3,
					columns: 3
				});
				expect(puzzle.rows).toEqual(3);
				expect(puzzle.columns).toEqual(3);

				puzzle = new SliderPuzzle({
					board: board2x5,
					rows: 2
				});
				expect(puzzle.rows).toEqual(2);
				expect(puzzle.columns).toEqual(5);

				puzzle = new SliderPuzzle({
					board: board2x5,
					columns: 5
				});
				expect(puzzle.rows).toEqual(2);
				expect(puzzle.columns).toEqual(5);
			});

			describe("should throw an exception if a missing rows or column option cannot be inferred", function() {

				it("because the specified rows or columns value is greater than board size", function() {
					// (the calculated rows or columns value is less than 1)

					expect(function() {
						new SliderPuzzle({
							board: board2x2,
							rows: 5
						});
					}).toThrow(exceptionString);

					expect(function() {
						new SliderPuzzle({
							board: board2x2,
							columns: 5
						});
					}).toThrow(exceptionString);
				});

				it("because the specified rows or columns value equals board size", function() {
					// (the calculated rows or columns value is 1)

					expect(function() {
						new SliderPuzzle({
							board: board2x2,
							rows: 4
						});
					}).toThrow(exceptionString);

					expect(function() {
						new SliderPuzzle({
							board: board2x2,
							columns: 4
						});
					}).toThrow(exceptionString);
				});

				it("because the board size cannot be divided by the specified rows or columns value without a remainder", function() {
					// the calculated rows or columns value is not an integer

					expect(function() {
						new SliderPuzzle({
							board: board4x4,
							rows: 3
						});
					}).toThrow(exceptionString);

					expect(function() {
						new SliderPuzzle({
							board: board4x4,
							columns: 5
						});
					}).toThrow(exceptionString);
				});
			});

			it("should throw an exception if rows and columns are also specified and do not match", function() {
				// rows * columns is less than board size
				expect(function() {
					new SliderPuzzle({
						board: board4x4,
						rows: 2,
						columns: 3
					});
				}).toThrow(exceptionString);

				// rows * columns is greater than board size
				expect(function() {
					new SliderPuzzle({
						board: board4x4,
						rows: 4,
						columns: 5
					});
				}).toThrow(exceptionString);
			});

			it("should throw an exception if the board is invalid", function() {
				var exceptionString = "invalid board";

				expect(function() {
					new SliderPuzzle({
						board: [4, 3, 2, 1]
					});
				}).toThrow(exceptionString);

				expect(function() {
					new SliderPuzzle({
						board: [2, 1, 0, -1]
					});
				}).toThrow(exceptionString);

				expect(function() {
					new SliderPuzzle({
						board: [4, 3, 2, 0]
					});
				}).toThrow(exceptionString);
			});
		});
	});

	describe("Helper: ", function() {
		// some sample positions on a 3x3 puzzle
		var positions = {
			topLeft:		{ row: 0, column: 0 },
			topRight:		{ row: 0, column: 2 },
			bottomLeft:		{ row: 2, column: 0 },
			bottomRight:	{ row: 2, column: 2 },
			middle:			{ row: 1, column: 1 }
		};

		beforeEach(function() {
			puzzle = new SliderPuzzle({
				board: board3x3
			});
		});

		describe("to1dPosition()", function() {
			it("should convert a two-dimensional row-column index into a one-dimensional index", function() {
				expect(puzzle.to1dPosition(positions.topLeft)    ).toEqual(0);
				expect(puzzle.to1dPosition(positions.topRight)   ).toEqual(2);
				expect(puzzle.to1dPosition(positions.bottomLeft) ).toEqual(6);
				expect(puzzle.to1dPosition(positions.bottomRight)).toEqual(8);
				expect(puzzle.to1dPosition(positions.middle)     ).toEqual(4);
			});
		});

		describe("to2dPosition()", function() {
			it("should convert a one-dimensional index into a two-dimensional row-column index", function() {
				expect(puzzle.to2dPosition(0)).toEqual(positions.topLeft);
				expect(puzzle.to2dPosition(2)).toEqual(positions.topRight);
				expect(puzzle.to2dPosition(6)).toEqual(positions.bottomLeft);
				expect(puzzle.to2dPosition(8)).toEqual(positions.bottomRight);
				expect(puzzle.to2dPosition(4)).toEqual(positions.middle);
			});
		});

		describe("normalizePosition()", function() {

			it("should handle row and column passed in as seperate arguments", function() {
				expect(puzzle.normalizePosition(0, 0)).toEqual(positions.topLeft);
				expect(puzzle.normalizePosition(0, 2)).toEqual(positions.topRight);
				expect(puzzle.normalizePosition(2, 0)).toEqual(positions.bottomLeft);
				expect(puzzle.normalizePosition(2, 2)).toEqual(positions.bottomRight);
				expect(puzzle.normalizePosition(1, 1)).toEqual(positions.middle);
			});

			it("should handle row and column passed in as an array", function() {
				expect(puzzle.normalizePosition([0, 0])).toEqual(positions.topLeft);
				expect(puzzle.normalizePosition([0, 2])).toEqual(positions.topRight);
				expect(puzzle.normalizePosition([2, 0])).toEqual(positions.bottomLeft);
				expect(puzzle.normalizePosition([2, 2])).toEqual(positions.bottomRight);
				expect(puzzle.normalizePosition([1, 1])).toEqual(positions.middle);
			});

			it("should handle row and column passed in as an object", function() {
				expect(puzzle.normalizePosition({ row: 0, column: 0 })).toEqual(positions.topLeft);
				expect(puzzle.normalizePosition({ row: 0, column: 2 })).toEqual(positions.topRight);
				expect(puzzle.normalizePosition({ row: 2, column: 0 })).toEqual(positions.bottomLeft);
				expect(puzzle.normalizePosition({ row: 2, column: 2 })).toEqual(positions.bottomRight);
				expect(puzzle.normalizePosition({ row: 1, column: 1 })).toEqual(positions.middle);
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

	}); // helpers

	describe("Renderer:", function() {

		describe("ASCII Renderer", function() {

			it("should render the board correctly", function() {
				puzzle = new SliderPuzzle({
					board: board2x2,
					rows: 2
				});
				expect(puzzle.toString()).toEqual("\n"
					+ "+---+---+\n"
					+ "| 3 | 2 |\n"
					+ "+---+---+\n"
					+ "| 1 |   |\n"
					+ "+---+---+\n"
				);

				puzzle = new SliderPuzzle({
					board: board3x3,
					rows: 3
				});
				expect(puzzle.toString()).toEqual("\n"
					+ "+---+---+---+\n"
					+ "| 1 | 2 | 3 |\n"
					+ "+---+---+---+\n"
					+ "| 4 | 5 | 6 |\n"
					+ "+---+---+---+\n"
					+ "| 7 | 8 |   |\n"
					+ "+---+---+---+\n"
				);

				puzzle = new SliderPuzzle({
					board: [2, 4, 6, 8, 10, 12, 14, 0, 1, 3, 5, 7, 9, 11, 13, 15]
				});
				expect(puzzle.toString()).toEqual("\n"
					+ "+----+----+----+----+\n"
					+ "|  2 |  4 |  6 |  8 |\n"
					+ "+----+----+----+----+\n"
					+ "| 10 | 12 | 14 |    |\n"
					+ "+----+----+----+----+\n"
					+ "|  1 |  3 |  5 |  7 |\n"
					+ "+----+----+----+----+\n"
					+ "|  9 | 11 | 13 | 15 |\n"
					+ "+----+----+----+----+\n"
				);

				puzzle = new SliderPuzzle({
					board: board2x5,
					rows: 2
				});
				expect(puzzle.toString()).toEqual("\n"
					+ "+---+---+---+---+---+\n"
					+ "|   | 9 | 8 | 7 | 6 |\n"
					+ "+---+---+---+---+---+\n"
					+ "| 5 | 4 | 3 | 2 | 1 |\n"
					+ "+---+---+---+---+---+\n"
				);
			});
		});
	});
});

