describe("Initialization:", function() {

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

	describe("When initialized, a slider puzzle", function() {

		it("should parse a specified rows or cols value into an integer", function() {
			puzzle = new SliderPuzzle({
				rows: "5",
				cols: "6"
			});
			expect(puzzle.options.rows).toEqual(5);
			expect(puzzle.options.cols).toEqual(6);

			puzzle = new SliderPuzzle({
				rows: "5.1",
				cols: "6.9"
			});
			expect(puzzle.options.rows).toEqual(5);
			expect(puzzle.options.cols).toEqual(6);

			puzzle = new SliderPuzzle({
				rows: 5.2,
				cols: 6.8
			});
			expect(puzzle.options.rows).toEqual(5);
			expect(puzzle.options.cols).toEqual(6);
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

			expect(function() {
				new SliderPuzzle({
					rows: false
				});
			}).toThrow(exceptionString);


			expect(function() {
				new SliderPuzzle({
					rows: null
				});
			}).toThrow(exceptionString);
		});

		it("should throw an exception if cols is less than 2 or cannot be parsed as an integer", function() {
			var exceptionString = "invalid cols value";

			expect(function() {
				new SliderPuzzle({
					cols: 1
				});
			}).toThrow(exceptionString);

			expect(function() {
				new SliderPuzzle({
					cols: 0
				});
			}).toThrow(exceptionString);

			expect(function() {
				new SliderPuzzle({
					cols: -1
				});
			}).toThrow(exceptionString);

			expect(function() {
				new SliderPuzzle({
					cols: "-2"
				});
			}).toThrow(exceptionString);

			expect(function() {
				new SliderPuzzle({
					cols: "test"
				});
			}).toThrow(exceptionString);

			expect(function() {
				new SliderPuzzle({
					cols: false
				});
			}).toThrow(exceptionString);


			expect(function() {
				new SliderPuzzle({
					cols: null
				});
			}).toThrow(exceptionString);
		});
	});

	describe("When initialized WITHOUT a board, a slider puzzle", function() {

		it("should have the specified number of rows and cols", function() {
			puzzle = new SliderPuzzle({
				rows: 3,
				cols: 11
			});
			expect(puzzle.options.rows).toEqual(3);
			expect(puzzle.options.cols).toEqual(11);
		});

		it("should have 4 rows, if not specified", function() {
			puzzle = new SliderPuzzle({
				cols: 3
			});
			expect(puzzle.options.rows).toEqual(4);
			expect(puzzle.options.cols).toEqual(3);
		});

		it("should have 4 cols, if not specified", function() {
			puzzle = new SliderPuzzle({
				rows: 5
			});
			expect(puzzle.options.rows).toEqual(5);
			expect(puzzle.options.cols).toEqual(4);
		});

		it("should have 4 rows and 4 cols, if none is specified", function() {
			puzzle = new SliderPuzzle();
			expect(puzzle.options.rows).toEqual(4);
			expect(puzzle.options.cols).toEqual(4);

			puzzle = new SliderPuzzle({});
			expect(puzzle.options.rows).toEqual(4);
			expect(puzzle.options.cols).toEqual(4);
		});
	});

	describe("When initialized WITH a board, a slider puzzle", function() {
		var exceptionString = "board does not match rows or cols";

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
					cols: 4
				});
			}).toThrow();

			expect(function() {
				new SliderPuzzle({
					board: [],
					rows: 2,
					cols: 5
				});
			}).toThrow();
		});

		it("should infer rows and cols by assuming both have the same value, if none is specified", function() {
			puzzle = new SliderPuzzle({
				board: board2x2
			});
			expect(puzzle.options.rows).toEqual(2);
			expect(puzzle.options.cols).toEqual(2);

			puzzle = new SliderPuzzle({
				board: board3x3
			});
			expect(puzzle.options.rows).toEqual(3);
			expect(puzzle.options.cols).toEqual(3);

			puzzle = new SliderPuzzle({
				board: board4x4
			});
			expect(puzzle.options.rows).toEqual(4);
			expect(puzzle.options.cols).toEqual(4);
		});

		it("should throw an exception if neither rows nor cols are specified and the board is not square", function() {
			expect(function() {
				new SliderPuzzle({
					board: board2x5
				});
			}).toThrow(exceptionString);
		});

		it("should infer a rows or cols value if only one is specified", function() {
			puzzle = new SliderPuzzle({
				board: board3x3,
				rows: 3
			});
			expect(puzzle.options.rows).toEqual(3);
			expect(puzzle.options.cols).toEqual(3);

			puzzle = new SliderPuzzle({
				board: board3x3,
				cols: 3
			});
			expect(puzzle.options.rows).toEqual(3);
			expect(puzzle.options.cols).toEqual(3);

			puzzle = new SliderPuzzle({
				board: board2x5,
				rows: 2
			});
			expect(puzzle.options.rows).toEqual(2);
			expect(puzzle.options.cols).toEqual(5);

			puzzle = new SliderPuzzle({
				board: board2x5,
				cols: 5
			});
			expect(puzzle.options.rows).toEqual(2);
			expect(puzzle.options.cols).toEqual(5);
		});

		describe("should throw an exception if a missing rows or col option cannot be inferred", function() {

			it("because the specified rows or cols value is greater than board size", function() {
				// (the calculated rows or cols value is less than 1)

				expect(function() {
					new SliderPuzzle({
						board: board2x2,
						rows: 5
					});
				}).toThrow(exceptionString);

				expect(function() {
					new SliderPuzzle({
						board: board2x2,
						cols: 5
					});
				}).toThrow(exceptionString);
			});

			it("because the specified rows or cols value equals board size", function() {
				// (the calculated rows or cols value is 1)

				expect(function() {
					new SliderPuzzle({
						board: board2x2,
						rows: 4
					});
				}).toThrow(exceptionString);

				expect(function() {
					new SliderPuzzle({
						board: board2x2,
						cols: 4
					});
				}).toThrow(exceptionString);
			});

			it("because the board size cannot be divided by the specified rows or cols value without a remainder", function() {
				// the calculated rows or cols value is not an integer

				expect(function() {
					new SliderPuzzle({
						board: board4x4,
						rows: 3
					});
				}).toThrow(exceptionString);

				expect(function() {
					new SliderPuzzle({
						board: board4x4,
						cols: 5
					});
				}).toThrow(exceptionString);
			});
		});

		it("should throw an exception if rows and cols are also specified and do not match", function() {
			// rows * cols is less than board size
			expect(function() {
				new SliderPuzzle({
					board: board4x4,
					rows: 2,
					cols: 3
				});
			}).toThrow(exceptionString);

			// rows * cols is greater than board size
			expect(function() {
				new SliderPuzzle({
					board: board4x4,
					rows: 4,
					cols: 5
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

	it("should parse a specified hole position into an integer", function() {
		puzzle = new SliderPuzzle({
			hole: "5"
		});
		expect(puzzle.options.hole).toEqual(5);

		puzzle = new SliderPuzzle({
			hole: "5.1"
		});
		expect(puzzle.options.hole).toEqual(5);

		puzzle = new SliderPuzzle({
			hole: 5.2
		});
		expect(puzzle.options.hole).toEqual(5);
	});

	it("should throw an exception if hole is less than 0 or cannot be parsed as an integer", function() {
		var exceptionString = "invalid hole value";

		expect(function() {
			new SliderPuzzle({
				hole: -1
			});
		}).toThrow(exceptionString);

		expect(function() {
			new SliderPuzzle({
				hole: "-2"
			});
		}).toThrow(exceptionString);

		expect(function() {
			new SliderPuzzle({
				hole: "test"
			});
		}).toThrow(exceptionString);

		expect(function() {
			new SliderPuzzle({
				hole: null
			});
		}).toThrow(exceptionString);
	});

	it("should allow a hole position to be specified", function() {
		for (var i = 0; i < 16; i++) {
			puzzle = new SliderPuzzle({
				hole: i
			});
			expect(puzzle.hole).toEqual(i);
			expect(puzzle.board[i]).toEqual(0);
		}

		for (i = 0; i < 15; i++) {
			puzzle = new SliderPuzzle({
				rows: 3,
				cols: 5,
				hole: i
			});
			expect(puzzle.hole).toEqual(i);
			expect(puzzle.board[i]).toEqual(0);
		}

	});

	it("should ignore a specified hole position if a board is also specified", function() {
		puzzle = new SliderPuzzle({
			board: [0, 1, 2, 3],
			hole: 2
		});
		expect(puzzle.hole).toEqual(0);
		expect(puzzle.board[0]).toEqual(0);

		puzzle = new SliderPuzzle({
			board: [8, 7, 6, 5, 4, 3, 2, 1, 0],
			hole: 0
		});
		expect(puzzle.hole).toEqual(8);
		expect(puzzle.board[8]).toEqual(0);

		puzzle = new SliderPuzzle({
			board: [3, 2, 1, 0, 4, 5, 6, 7, 8, 9, 10, 11],
			rows: 3,
			hole: 1
		});
		expect(puzzle.hole).toEqual(3);
		expect(puzzle.board[3]).toEqual(0);
	});

	it("should place the hole at the bottom right position, if not specified", function() {
		puzzle = new SliderPuzzle();
		expect(puzzle.hole).toEqual(15);
		expect(puzzle.board[15]).toEqual(0);

		puzzle = new SliderPuzzle({});
		expect(puzzle.hole).toEqual(15);
		expect(puzzle.board[15]).toEqual(0);

		puzzle = new SliderPuzzle({
			rows: 2,
			cols: 2
		});
		expect(puzzle.hole).toEqual(3);
		expect(puzzle.board[3]).toEqual(0);

		puzzle = new SliderPuzzle({
			rows: 3,
			cols: 5
		});
		expect(puzzle.hole).toEqual(14);
		expect(puzzle.board[14]).toEqual(0);
	});
});
