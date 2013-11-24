describe("Initialization:", function() {

	var puzzle;

	// 0 replaced for 4, unsolvable
	var board2x2 = [3,	2,
					1,	0];

	// 0 replaced for 9, solved
	var board3x3 = [1,	2,	3,
					4,	5,	6,
					7,	8,	0];

	// 0 replaced for 16, different initial and solved hole positions
	var board4x4 = [2,	4,	6,	8,
					10,	12,	14,	0,
					1,	3,	5,	7,
					9,	11,	13,	15];

	// 0 replaced for 10, different initial and solved hole positions
	var board2x5 = [0,	9,
					8,	7,
					6,	5,
					4,	3,
					2,	1];

	describe("When initialized, a slider puzzle", function() {

		it("should parse a specified rows value as an integer", function() {
			puzzle = new SliderPuzzle({
				rows: "5"
			});
			expect(puzzle.options.rows).toEqual(5);

			puzzle = new SliderPuzzle({
				rows: "5.1"
			});
			expect(puzzle.options.rows).toEqual(5);

			puzzle = new SliderPuzzle({
				rows: 5.2
			});
			expect(puzzle.options.rows).toEqual(5);
		});

		it("should parse a specified cols value as an integer", function() {
			puzzle = new SliderPuzzle({
				cols: "6"
			});
			expect(puzzle.options.cols).toEqual(6);

			puzzle = new SliderPuzzle({
				cols: "6.9"
			});
			expect(puzzle.options.cols).toEqual(6);

			puzzle = new SliderPuzzle({
				cols: 6.8
			});
			expect(puzzle.options.cols).toEqual(6);
		});

		it("should throw an exception if rows is less than 2 or cannot be parsed as an integer", function() {
			var ROWS_INVALID = "invalid rows value";

			expect(function() {
				new SliderPuzzle({
					rows: 1
				});
			}).toThrow(ROWS_INVALID);

			expect(function() {
				new SliderPuzzle({
					rows: 0
				});
			}).toThrow(ROWS_INVALID);

			expect(function() {
				new SliderPuzzle({
					rows: -1
				});
			}).toThrow(ROWS_INVALID);

			expect(function() {
				new SliderPuzzle({
					rows: "-2"
				});
			}).toThrow(ROWS_INVALID);

			expect(function() {
				new SliderPuzzle({
					rows: "test"
				});
			}).toThrow(ROWS_INVALID);

			expect(function() {
				new SliderPuzzle({
					rows: false
				});
			}).toThrow(ROWS_INVALID);

			expect(function() {
				new SliderPuzzle({
					rows: null
				});
			}).toThrow(ROWS_INVALID);
		});

		it("should throw an exception if cols is less than 2 or cannot be parsed as an integer", function() {
			var COLS_INVALID = "invalid cols value";

			expect(function() {
				new SliderPuzzle({
					cols: 1
				});
			}).toThrow(COLS_INVALID);

			expect(function() {
				new SliderPuzzle({
					cols: 0
				});
			}).toThrow(COLS_INVALID);

			expect(function() {
				new SliderPuzzle({
					cols: -1
				});
			}).toThrow(COLS_INVALID);

			expect(function() {
				new SliderPuzzle({
					cols: "-2"
				});
			}).toThrow(COLS_INVALID);

			expect(function() {
				new SliderPuzzle({
					cols: "test"
				});
			}).toThrow(COLS_INVALID);

			expect(function() {
				new SliderPuzzle({
					cols: false
				});
			}).toThrow(COLS_INVALID);

			expect(function() {
				new SliderPuzzle({
					cols: null
				});
			}).toThrow(COLS_INVALID);
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

		it("should have 4 rows if only cols are specified", function() {
			puzzle = new SliderPuzzle({
				cols: 3
			});
			expect(puzzle.options.rows).toEqual(4);
			expect(puzzle.options.cols).toEqual(3);
		});

		it("should have 4 cols if only rows are specified", function() {
			puzzle = new SliderPuzzle({
				rows: 5
			});
			expect(puzzle.options.rows).toEqual(5);
			expect(puzzle.options.cols).toEqual(4);
		});

		it("should have 4 rows and 4 cols if neither is specified", function() {
			puzzle = new SliderPuzzle();
			expect(puzzle.options.rows).toEqual(4);
			expect(puzzle.options.cols).toEqual(4);

			puzzle = new SliderPuzzle({});
			expect(puzzle.options.rows).toEqual(4);
			expect(puzzle.options.cols).toEqual(4);
		});

		it("should throw an exception if the signature calculation fails due to a big board", function() {
			expect(function() { new SliderPuzzle({
				rows: 15,
				cols: 15
			}); }).toThrow();
		});

	});

	describe("When initialized WITH a board, a slider puzzle", function() {
		var BOARD_INVALID  = 'invalid board';
		var BOARD_MISMATCH = 'board does not match rows and cols';

		it("should throw an exception if board is not an array", function() {
			expect(function() {
				new SliderPuzzle({
					board: 4
				});
			}).toThrow(BOARD_INVALID);

			expect(function() {
				new SliderPuzzle({
					board: "test"
				});
			}).toThrow(BOARD_INVALID);

			expect(function() {
				new SliderPuzzle({
					board: false
				});
			}).toThrow(BOARD_INVALID);

			expect(function() {
				new SliderPuzzle({
					board: {}
				});
			}).toThrow(BOARD_INVALID);
		});

		it("should throw an exception if an empty board is specified", function() {
			expect(function() {
				new SliderPuzzle({
					board: []
				});
			}).toThrow(BOARD_MISMATCH);

			expect(function() {
				new SliderPuzzle({
					board: [],
					rows: 3
				});
			}).toThrow(BOARD_MISMATCH);

			expect(function() {
				new SliderPuzzle({
					board: [],
					cols: 4
				});
			}).toThrow(BOARD_MISMATCH);

			expect(function() {
				new SliderPuzzle({
					board: [],
					rows: 2,
					cols: 5
				});
			}).toThrow(BOARD_MISMATCH);
		});

		it("should infer rows and cols by assuming the board is square, if neither is specified", function() {
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

		it("should throw an exception if rows and cols cannot be inferred, if neither is specified", function() {
			// because the board is not square
			expect(function() {
				new SliderPuzzle({
					board: board2x5
				});
			}).toThrow(BOARD_MISMATCH);

			expect(function() {
				new SliderPuzzle({
					board: [0, 1, 2]
				});
			}).toThrow(BOARD_MISMATCH);

			// because the inferred values are less than 2
			expect(function() {
				new SliderPuzzle({
					board: [1]
				});
			}).toThrow(BOARD_MISMATCH);
		});

		it("should infer a missing rows or cols value if only one is specified", function() {
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

		it("should throw an exception if a missing rows or col option cannot be inferred", function() {
			// because the specified rows or cols value is greater than board size
			expect(function() {
				new SliderPuzzle({
					board: board2x2,
					rows: 5
				});
			}).toThrow(BOARD_MISMATCH);

			expect(function() {
				new SliderPuzzle({
					board: board3x3,
					cols: 13
				});
			}).toThrow(BOARD_MISMATCH);

			// because the specified rows or cols value equals board size
			expect(function() {
				new SliderPuzzle({
					board: board2x2,
					rows: 4
				});
			}).toThrow(BOARD_MISMATCH);

			expect(function() {
				new SliderPuzzle({
					board: board3x3,
					cols: 9
				});
			}).toThrow(BOARD_MISMATCH);

			// because the inferred rows and cols values do not match the board size
			expect(function() {
				new SliderPuzzle({
					board: board3x3,
					rows: 4
				});
			}).toThrow(BOARD_MISMATCH);

			expect(function() {
				new SliderPuzzle({
					board: board4x4,
					cols: 5
				});
			}).toThrow(BOARD_MISMATCH);
		});

		it("should allow both rows and cols to also be specified", function() {
			puzzle = new SliderPuzzle({
				board: board4x4,
				rows: 4,
				cols: 4
			});
			expect(puzzle.options.rows).toEqual(4);
			expect(puzzle.options.cols).toEqual(4);

			puzzle = new SliderPuzzle({
				board: board4x4,
				rows: 8,
				cols: 2
			});
			expect(puzzle.options.rows).toEqual(8);
			expect(puzzle.options.cols).toEqual(2);
		});

		it("should throw an exception if rows and cols are also specified and do not match the board", function() {
			// (rows * cols) is less than board size
			expect(function() {
				new SliderPuzzle({
					board: board4x4,
					rows: 2,
					cols: 3
				});
			}).toThrow(BOARD_MISMATCH);

			// (rows * cols) is greater than board size
			expect(function() {
				new SliderPuzzle({
					board: board4x4,
					rows: 4,
					cols: 5
				});
			}).toThrow(BOARD_MISMATCH);
		});

		it("should accept a valid board and infer the hole values", function() {
			puzzle = new SliderPuzzle({
				board: [1,	2,
						0,	3]
			});
			expect(puzzle._board).toEqual([1, 2, 0, 3]);
			expect(puzzle._initialHole).toEqual(3);
			expect(puzzle.options.hole).toEqual(4);

			puzzle = new SliderPuzzle({
				board: [1,	2,
						3,	0]
			});
			expect(puzzle._board).toEqual([1, 2, 3, 0]);
			expect(puzzle._initialHole).toEqual(4);
			expect(puzzle.options.hole).toEqual(4);

			puzzle = new SliderPuzzle({
				board: [1,	2,
						0,	4]
			});
			expect(puzzle._board).toEqual([1, 2, 0, 4]);
			expect(puzzle._initialHole).toEqual(3);
			expect(puzzle.options.hole).toEqual(3);

			puzzle = new SliderPuzzle({
				board: [1,	2,
						4,	0]
			});
			expect(puzzle._board).toEqual([1, 2, 4, 0]);
			expect(puzzle._initialHole).toEqual(4);
			expect(puzzle.options.hole).toEqual(3);

			puzzle = new SliderPuzzle({
				board: [1,	0,
						3,	4]
			});
			expect(puzzle._board).toEqual([1, 0, 3, 4]);
			expect(puzzle._initialHole).toEqual(2);
			expect(puzzle.options.hole).toEqual(2);

			puzzle = new SliderPuzzle({
				board: [0,	1,
						3,	4]
			});
			expect(puzzle._board).toEqual([0, 1, 3, 4]);
			expect(puzzle._initialHole).toEqual(1);
			expect(puzzle.options.hole).toEqual(2);

			puzzle = new SliderPuzzle({
				board: [1,	2,	3,
						4,	5,	0],
				rows: 2
			});
			expect(puzzle._board).toEqual([1, 2, 3, 4, 5, 0]);
			expect(puzzle._initialHole).toEqual(6);
			expect(puzzle.options.hole).toEqual(6);

			puzzle = new SliderPuzzle({
				board: [0,	1,	2,
						3,	4,	5],
				rows: 2
			});
			expect(puzzle._board).toEqual([0, 1, 2, 3, 4, 5]);
			expect(puzzle._initialHole).toEqual(1);
			expect(puzzle.options.hole).toEqual(6);
		});

		it("should throw an exception if the board is invalid", function() {
			expect(function() {
				new SliderPuzzle({
					board: [4, 3, 2, 1]
				});
			}).toThrow(BOARD_INVALID);

			expect(function() {
				new SliderPuzzle({
					board: [-4, -3, -2, -1]
				});
			}).toThrow(BOARD_INVALID);

			expect(function() {
				new SliderPuzzle({
					board: [2, 1, 0, -1]
				});
			}).toThrow(BOARD_INVALID);

			expect(function() {
				new SliderPuzzle({
					board: [5, 4, 3, 0]
				});
			}).toThrow(BOARD_INVALID);

			expect(function() {
				new SliderPuzzle({
					board: [0, 1, 4, 5]
				});
			}).toThrow(BOARD_INVALID);

			expect(function() {
				new SliderPuzzle({
					board: [1, 1, 2, 0]
				});
			}).toThrow(BOARD_INVALID);

			expect(function() {
				new SliderPuzzle({
					board: [1, 0, 2, 0]
				});
			}).toThrow(BOARD_INVALID);
		});

		// ATTENTION there's a chance that this test succeeds while the implementation is wrong
		it("should never shuffle the solved board", function() {
			for (var i = 0; i < 100; i++) {
				puzzle = new SliderPuzzle({
					rows: 2,
					cols: 2
				});
				expect(puzzle.isSolved()).toEqual(false);
				expect(puzzle._board).not.toEqual([1,2,3,0]);
			}
		});
	});

	describe("When initialized WITH a hole, a slider puzzle", function() {
		var HOLE_INVALID  = 'invalid hole value';
		var HOLE_MISMATCH = 'hole does not match rows and cols';

		it("should parse a specified hole value as an integer", function() {
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

		it("should throw an exception if hole is less than 1 or cannot be parsed as an integer", function() {
			expect(function() {
				new SliderPuzzle({
					hole: 0
				});
			}).toThrow(HOLE_INVALID);

			expect(function() {
				new SliderPuzzle({
					hole: -1
				});
			}).toThrow(HOLE_INVALID);

			expect(function() {
				new SliderPuzzle({
					hole: "-2"
				});
			}).toThrow(HOLE_INVALID);

			expect(function() {
				new SliderPuzzle({
					hole: "test"
				});
			}).toThrow(HOLE_INVALID);

			expect(function() {
				new SliderPuzzle({
					hole: false
				});
			}).toThrow(HOLE_INVALID);

			expect(function() {
				new SliderPuzzle({
					hole: null
				});
			}).toThrow(HOLE_INVALID);
		});

		it("should throw an exception if a specified hole value does not match rows and cols", function() {
			expect(function() {
				new SliderPuzzle({
					hole: 17
				});
			}).toThrow(HOLE_MISMATCH);

			expect(function() {
				new SliderPuzzle({
					rows: 2,
					cols: 2,
					hole: 6
				});
			}).toThrow(HOLE_MISMATCH);

			expect(function() {
				new SliderPuzzle({
					rows: 3,
					hole: 13
				});
			}).toThrow(HOLE_MISMATCH);
		});

		it("should accept a valid hole value", function() {
			for (var i = 0; i < 16; i++) {
				puzzle = new SliderPuzzle({
					hole: i + 1
				});
				expect(puzzle.getSolvedBoard()[i]).toEqual(0);
				expect(puzzle.options.hole).toEqual(i + 1);
			}

			for (i = 0; i < 15; i++) {
				puzzle = new SliderPuzzle({
					rows: 3,
					cols: 5,
					hole: i + 1
				});
				expect(puzzle.getSolvedBoard()[i]).toEqual(0);
				expect(puzzle.options.hole).toEqual(i + 1);
			}
		});

		it("should place all numbers from 1 to (rows*cols) on the board with the hole value replaced by 0", function() {
			puzzle = new SliderPuzzle({
				hole: 1
			});
			expect(puzzle.getSolvedBoard()[0]).toEqual(0);
			for (var i = 1; i < 16; i++) {
				expect(puzzle.getSolvedBoard()[i]).toEqual(i + 1);
			}

			puzzle = new SliderPuzzle({
				rows: 2,
				cols: 2,
				hole: 1
			});
			expect(puzzle.getSolvedBoard()[0]).toEqual(0);
			expect(puzzle.getSolvedBoard()[1]).toEqual(2);
			expect(puzzle.getSolvedBoard()[2]).toEqual(3);
			expect(puzzle.getSolvedBoard()[3]).toEqual(4);

			puzzle = new SliderPuzzle({
				rows: 2,
				cols: 2,
				hole: 2
			});
			expect(puzzle.getSolvedBoard()[0]).toEqual(1);
			expect(puzzle.getSolvedBoard()[1]).toEqual(0);
			expect(puzzle.getSolvedBoard()[2]).toEqual(3);
			expect(puzzle.getSolvedBoard()[3]).toEqual(4);

			puzzle = new SliderPuzzle({
				rows: 2,
				cols: 2,
				hole: 3
			});
			expect(puzzle.getSolvedBoard()[0]).toEqual(1);
			expect(puzzle.getSolvedBoard()[1]).toEqual(2);
			expect(puzzle.getSolvedBoard()[2]).toEqual(0);
			expect(puzzle.getSolvedBoard()[3]).toEqual(4);

			puzzle = new SliderPuzzle({
				rows: 2,
				cols: 2,
				hole: 4
			});
			expect(puzzle.getSolvedBoard()[0]).toEqual(1);
			expect(puzzle.getSolvedBoard()[1]).toEqual(2);
			expect(puzzle.getSolvedBoard()[2]).toEqual(3);
			expect(puzzle.getSolvedBoard()[3]).toEqual(0);
		});

		it("should ignore a specified hole value if a board is also specified", function() {
			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3],
				hole: 2
			});
			expect(puzzle._board[0]).toEqual(0);
			expect(puzzle.options.hole).toEqual(4);

			puzzle = new SliderPuzzle({
				board: [8, 7, 6, 5, 4, 3, 2, 1, 0],
				hole: 0
			});
			expect(puzzle._board[8]).toEqual(0);
			expect(puzzle.options.hole).toEqual(9);

			puzzle = new SliderPuzzle({
				board: [3, 2, 1, 0, 4, 5, 6, 7, 8, 9, 10, 11],
				rows: 3,
				hole: 1
			});
			expect(puzzle._board[3]).toEqual(0);
			expect(puzzle.options.hole).toEqual(12);
		});

		it("should place the hole at the bottom right position if not specified", function() {
			puzzle = new SliderPuzzle();
			expect(puzzle.getSolvedBoard()[15]).toEqual(0);
			expect(puzzle.options.hole).toEqual(16);

			puzzle = new SliderPuzzle({});
			expect(puzzle.getSolvedBoard()[15]).toEqual(0);
			expect(puzzle.options.hole).toEqual(16);

			puzzle = new SliderPuzzle({
				rows: 2,
				cols: 2
			});
			expect(puzzle.getSolvedBoard()[3]).toEqual(0);
			expect(puzzle.options.hole).toEqual(4);

			puzzle = new SliderPuzzle({
				rows: 3,
				cols: 5
			});
			expect(puzzle.getSolvedBoard()[14]).toEqual(0);
			expect(puzzle.options.hole).toEqual(15);

			puzzle = new SliderPuzzle({
				rows: 3
			});
			expect(puzzle.getSolvedBoard()[11]).toEqual(0);
			expect(puzzle.options.hole).toEqual(12);
		});

		it("should place the hole at the bottom right position if only the initial hole position is specified", function() {
			puzzle = new SliderPuzzle({
				initialHole: 1
			});
			expect(puzzle._board[0]).toEqual(0);
			expect(puzzle.options.hole).toEqual(16);
			expect(puzzle.options.initialHole).toEqual(1);

			puzzle = new SliderPuzzle({
				rows: 3,
				cols: 5,
				initialHole: 5
			});
			expect(puzzle._board[4]).toEqual(0);
			expect(puzzle.options.hole).toEqual(15);
			expect(puzzle.options.initialHole).toEqual(5);

			puzzle = new SliderPuzzle({
				rows: 3,
				initialHole: 8
			});
			expect(puzzle._board[7]).toEqual(0);
			expect(puzzle.options.hole).toEqual(12);
			expect(puzzle.options.initialHole).toEqual(8);
		});
	});

	describe("When initialized WITH an initial hole, a slider puzzle", function() {
		var INITIAL_HOLE_INVALID  = 'invalid initialHole value';
		var INITIAL_HOLE_MISMATCH = 'initialHole does not match rows and cols';

		it("should parse a specified initial hole value as an integer", function() {
			puzzle = new SliderPuzzle({
				initialHole: "5"
			});
			expect(puzzle._initialHole).toEqual(5);

			puzzle = new SliderPuzzle({
				initialHole: "5.1"
			});
			expect(puzzle._initialHole).toEqual(5);

			puzzle = new SliderPuzzle({
				initialHole: 5.2
			});
			expect(puzzle._initialHole).toEqual(5);
		});

		it("should throw an exception if initial hole is less than 1 or cannot be parsed as an integer", function() {
			expect(function() {
				new SliderPuzzle({
					initialHole: 0
				});
			}).toThrow(INITIAL_HOLE_INVALID);

			expect(function() {
				new SliderPuzzle({
					initialHole: -1
				});
			}).toThrow(INITIAL_HOLE_INVALID);

			expect(function() {
				new SliderPuzzle({
					initialHole: "-2"
				});
			}).toThrow(INITIAL_HOLE_INVALID);

			expect(function() {
				new SliderPuzzle({
					initialHole: "test"
				});
			}).toThrow(INITIAL_HOLE_INVALID);

			expect(function() {
				new SliderPuzzle({
					initialHole: false
				});
			}).toThrow(INITIAL_HOLE_INVALID);

			expect(function() {
				new SliderPuzzle({
					initialHole: null
				});
			}).toThrow(INITIAL_HOLE_INVALID);
		});

		it("should throw an exception if a specified initial hole value does not match rows and cols", function() {
			expect(function() {
				new SliderPuzzle({
					initialHole: 17
				});
			}).toThrow(INITIAL_HOLE_MISMATCH);

			expect(function() {
				new SliderPuzzle({
					rows: 2,
					cols: 2,
					initialHole: 6
				});
			}).toThrow(INITIAL_HOLE_MISMATCH);

			expect(function() {
				new SliderPuzzle({
					rows: 3,
					initialHole: 13
				});
			}).toThrow(INITIAL_HOLE_MISMATCH);
		});

		it("should accept a valid initial hole value", function() {
			for (var i = 0; i < 16; i++) {
				puzzle = new SliderPuzzle({
					initialHole: i + 1
				});
				expect(puzzle._board[i]).toEqual(0);
				expect(puzzle._initialHole).toEqual(i + 1);
			}

			for (i = 0; i < 15; i++) {
				puzzle = new SliderPuzzle({
					rows: 3,
					cols: 5,
					initialHole: i + 1
				});
				expect(puzzle._board[i]).toEqual(0);
				expect(puzzle._initialHole).toEqual(i + 1);
			}
		});

		it("should ignore a specified initial hole value if a board is also specified", function() {
			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3],
				initialHole: 2
			});
			expect(puzzle._board[0]).toEqual(0);
			expect(puzzle._initialHole).toEqual(1);
			expect(puzzle.options.initialHole).toBeUndefined();

			puzzle = new SliderPuzzle({
				board: [8, 7, 6, 5, 4, 3, 2, 1, 0],
				initialHole: 0
			});
			expect(puzzle._board[8]).toEqual(0);
			expect(puzzle._initialHole).toEqual(9);
			expect(puzzle.options.initialHole).toBeUndefined();

			puzzle = new SliderPuzzle({
				board: [3, 2, 1, 0, 4, 5, 6, 7, 8, 9, 10, 11],
				rows: 3,
				initialHole: 1
			});
			expect(puzzle._board[3]).toEqual(0);
			expect(puzzle._initialHole).toEqual(4);
			expect(puzzle.options.initialHole).toBeUndefined();
		});
	});

	describe("When initialized with the shuffle option, a slider puzzle", function() {
		it("should parse a specified shuffle value as an integer", function() {
			puzzle = new SliderPuzzle({
				shuffle: 0
			});
			expect(puzzle.options.shuffle).toEqual(0);

			puzzle = new SliderPuzzle({
				shuffle: 1
			});
			expect(puzzle.options.shuffle).toEqual(1);

			puzzle = new SliderPuzzle({
				shuffle: 3.5
			});
			expect(puzzle.options.shuffle).toEqual(3);
		});

		it("should handle a specified shuffle value as a boolean if it is less then 0 or cannot be parsed as an integer", function() {
			puzzle = new SliderPuzzle({
				shuffle: true
			});
			expect(puzzle.options.shuffle).toEqual(true);

			puzzle = new SliderPuzzle({
				shuffle: false
			});
			expect(puzzle.options.shuffle).toEqual(false);

			puzzle = new SliderPuzzle({
				shuffle: -1
			});
			expect(puzzle.options.shuffle).toEqual(true);

			puzzle = new SliderPuzzle({
				shuffle: "-2"
			});
			expect(puzzle.options.shuffle).toEqual(true);

			puzzle = new SliderPuzzle({
				shuffle: "test"
			});
			expect(puzzle.options.shuffle).toEqual(true);

			puzzle = new SliderPuzzle({
				shuffle: null
			});
			expect(puzzle.options.shuffle).toEqual(false);
		});

		it("should shuffle the board if the shuffle option is set to true or is not specified", function() {
			puzzle = new SliderPuzzle({
				shuffle: true
			});
			expect(puzzle.isSolved()).toEqual(false);
			expect(puzzle._playing).toEqual(true);

			puzzle = new SliderPuzzle();
			expect(puzzle.isSolved()).toEqual(false);
			expect(puzzle._playing).toEqual(true);

			puzzle = new SliderPuzzle({});
			expect(puzzle.isSolved()).toEqual(false);
			expect(puzzle._playing).toEqual(true);
		});

		it("should initialize (but not start) with the solved board if the shuffle option is set to false", function() {
			puzzle = new SliderPuzzle({
				rows: 2,
				cols: 2,
				shuffle: false
			});
			expect(puzzle.isSolved()).toEqual(true);
			expect(puzzle._board).toEqual(puzzle.getSolvedBoard());
			expect(puzzle._board).toEqual([1,2,3,0]);
			expect(puzzle._playing).toEqual(false);
		});

		it("should start with the solved board if the shuffle option is set to 0", function() {
			puzzle = new SliderPuzzle({
				rows: 2,
				cols: 2,
				shuffle: 0
			});
			expect(puzzle.isSolved()).toEqual(true);
			expect(puzzle._board).toEqual(puzzle.getSolvedBoard());
			expect(puzzle._board).toEqual([1,2,3,0]);
			expect(puzzle._playing).toEqual(true);
		});

		it("should start with the board one move away from the solved board if the shuffle option is set to 1", function() {
			puzzle = new SliderPuzzle({
				rows: 2,
				cols: 2,
				shuffle: 1
			});
			expect(puzzle.isSolved()).toEqual(false);
			expect(puzzle._board).toEqualAny([[1,2,0,3], [1,0,3,2]]);
			expect(puzzle._playing).toEqual(true);
		});

		it("should start with the board two moves away from the solved board if the shuffle option is set to 2", function() {
			puzzle = new SliderPuzzle({
				rows: 2,
				cols: 2,
				shuffle: 2
			});
			expect(puzzle.isSolved()).toEqual(false);
			expect(puzzle._board).toEqualAny([[0,2,1,3], [0,1,3,2]]);
			expect(puzzle._playing).toEqual(true);
		});
	});
});
