describe("Pieces: ", function() {
	beforeEach(function() {
		puzzle = new SliderPuzzle({
			board: board3x3
		});
	});

	describe("getPiece()", function() {
		it("should return a piece based on a one-dimensional index", function() {
			expect(puzzle.getPiece(1)).toEqual(pieces3x3.topLeft     );
			expect(puzzle.getPiece(2)).toEqual(pieces3x3.topMiddle   );
			expect(puzzle.getPiece(3)).toEqual(pieces3x3.topRight    );
			expect(puzzle.getPiece(4)).toEqual(pieces3x3.middleLeft  );
			expect(puzzle.getPiece(5)).toEqual(pieces3x3.middleMiddle);
			expect(puzzle.getPiece(6)).toEqual(pieces3x3.middleRight );
			expect(puzzle.getPiece(7)).toEqual(pieces3x3.bottomLeft  );
			expect(puzzle.getPiece(8)).toEqual(pieces3x3.bottomMiddle);
			expect(puzzle.getPiece(9)).toEqual(pieces3x3.bottomRight );
		});

		it("should return a piece based on row and col passed in as seperate arguments", function() {
			expect(puzzle.getPiece(1, 1)).toEqual(pieces3x3.topLeft     );
			expect(puzzle.getPiece(1, 2)).toEqual(pieces3x3.topMiddle   );
			expect(puzzle.getPiece(1, 3)).toEqual(pieces3x3.topRight    );
			expect(puzzle.getPiece(2, 1)).toEqual(pieces3x3.middleLeft  );
			expect(puzzle.getPiece(2, 2)).toEqual(pieces3x3.middleMiddle);
			expect(puzzle.getPiece(2, 3)).toEqual(pieces3x3.middleRight );
			expect(puzzle.getPiece(3, 1)).toEqual(pieces3x3.bottomLeft  );
			expect(puzzle.getPiece(3, 2)).toEqual(pieces3x3.bottomMiddle);
			expect(puzzle.getPiece(3, 3)).toEqual(pieces3x3.bottomRight );
		});

		it("should return a piece based on row and col passed in as an array", function() {
			expect(puzzle.getPiece([1, 1])).toEqual(pieces3x3.topLeft     );
			expect(puzzle.getPiece([1, 2])).toEqual(pieces3x3.topMiddle   );
			expect(puzzle.getPiece([1, 3])).toEqual(pieces3x3.topRight    );
			expect(puzzle.getPiece([2, 1])).toEqual(pieces3x3.middleLeft  );
			expect(puzzle.getPiece([2, 2])).toEqual(pieces3x3.middleMiddle);
			expect(puzzle.getPiece([2, 3])).toEqual(pieces3x3.middleRight );
			expect(puzzle.getPiece([3, 1])).toEqual(pieces3x3.bottomLeft  );
			expect(puzzle.getPiece([3, 2])).toEqual(pieces3x3.bottomMiddle);
			expect(puzzle.getPiece([3, 3])).toEqual(pieces3x3.bottomRight );
		});

		it("should return a piece based on row and col passed in as an object", function() {
			expect(puzzle.getPiece({ row: 1, col: 1 })).toEqual(pieces3x3.topLeft     );
			expect(puzzle.getPiece({ row: 1, col: 2 })).toEqual(pieces3x3.topMiddle   );
			expect(puzzle.getPiece({ row: 1, col: 3 })).toEqual(pieces3x3.topRight    );
			expect(puzzle.getPiece({ row: 2, col: 1 })).toEqual(pieces3x3.middleLeft  );
			expect(puzzle.getPiece({ row: 2, col: 2 })).toEqual(pieces3x3.middleMiddle);
			expect(puzzle.getPiece({ row: 2, col: 3 })).toEqual(pieces3x3.middleRight );
			expect(puzzle.getPiece({ row: 3, col: 1 })).toEqual(pieces3x3.bottomLeft  );
			expect(puzzle.getPiece({ row: 3, col: 2 })).toEqual(pieces3x3.bottomMiddle);
			expect(puzzle.getPiece({ row: 3, col: 3 })).toEqual(pieces3x3.bottomRight );
		});

		it("should throw an exception if the arguments are invalid", function() {
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
			expect(function() { puzzle.getPiece(null); }).toThrow(INDEX_INVALID);
			expect(function() { puzzle.getPiece(    ); }).toThrow(INDEX_INVALID);
		});
	});

	describe("getPieceByNumber()", function() {
		it("should return a piece based on its number", function() {
			expect(puzzle.getPieceByNumber(1)).toEqual(pieces3x3.topLeft     );
			expect(puzzle.getPieceByNumber(2)).toEqual(pieces3x3.topMiddle   );
			expect(puzzle.getPieceByNumber(3)).toEqual(pieces3x3.topRight    );
			expect(puzzle.getPieceByNumber(4)).toEqual(pieces3x3.middleLeft  );
			expect(puzzle.getPieceByNumber(5)).toEqual(pieces3x3.middleMiddle);
			expect(puzzle.getPieceByNumber(6)).toEqual(pieces3x3.middleRight );
			expect(puzzle.getPieceByNumber(7)).toEqual(pieces3x3.bottomLeft  );
			expect(puzzle.getPieceByNumber(8)).toEqual(pieces3x3.bottomMiddle);
			expect(puzzle.getPieceByNumber(0)).toEqual(pieces3x3.bottomRight );
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

			expect(puzzle.getPieceByDirection('up'   )).toEqual({ number: 3, position: positions3x3.middleLeft   });
			expect(puzzle.getPieceByDirection('down' )).toEqual(false);
			expect(puzzle.getPieceByDirection('left' )).toEqual({ number: 1, position: positions3x3.topMiddle    });
			expect(puzzle.getPieceByDirection('right')).toEqual(false);
		});

		it("should only return the pieces for left, right and up moves if the hole is top middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.getPieceByDirection('up'   )).toEqual({ number: 4, position: positions3x3.middleMiddle });
			expect(puzzle.getPieceByDirection('down' )).toEqual(false);
			expect(puzzle.getPieceByDirection('left' )).toEqual({ number: 2, position: positions3x3.topRight     });
			expect(puzzle.getPieceByDirection('right')).toEqual({ number: 1, position: positions3x3.topLeft      });
		});

		it("should only return the pieces for right and up moves if the hole is top right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.getPieceByDirection('up'   )).toEqual({ number: 5, position: positions3x3.middleRight  });
			expect(puzzle.getPieceByDirection('down' )).toEqual(false);
			expect(puzzle.getPieceByDirection('left' )).toEqual(false);
			expect(puzzle.getPieceByDirection('right')).toEqual({ number: 2, position: positions3x3.topMiddle    });
		});

		it("should only return the pieces for left, up and down moves if the hole is middle left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
			});

			expect(puzzle.getPieceByDirection('up'   )).toEqual({ number: 6, position: positions3x3.bottomLeft   });
			expect(puzzle.getPieceByDirection('down' )).toEqual({ number: 1, position: positions3x3.topLeft      });
			expect(puzzle.getPieceByDirection('left' )).toEqual({ number: 4, position: positions3x3.middleMiddle });
			expect(puzzle.getPieceByDirection('right')).toEqual(false);
		});

		it("should return the pieces for left, right, up and down moves if the hole is middle middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
			});

			expect(puzzle.getPieceByDirection('up'   )).toEqual({ number: 7, position: positions3x3.bottomMiddle });
			expect(puzzle.getPieceByDirection('down' )).toEqual({ number: 2, position: positions3x3.topMiddle    });
			expect(puzzle.getPieceByDirection('left' )).toEqual({ number: 5, position: positions3x3.middleRight  });
			expect(puzzle.getPieceByDirection('right')).toEqual({ number: 4, position: positions3x3.middleLeft   });
		});

		it("should only return the pieces for right, up and down moves if the hole is middle right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
			});

			expect(puzzle.getPieceByDirection('up'   )).toEqual({ number: 8, position: positions3x3.bottomRight  });
			expect(puzzle.getPieceByDirection('down' )).toEqual({ number: 3, position: positions3x3.topRight     });
			expect(puzzle.getPieceByDirection('left' )).toEqual(false);
			expect(puzzle.getPieceByDirection('right')).toEqual({ number: 5, position: positions3x3.middleMiddle });
		});

		it("should only return the pieces for left and down moves if the hole is bottom left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
			});

			expect(puzzle.getPieceByDirection('up'   )).toEqual(false);
			expect(puzzle.getPieceByDirection('down' )).toEqual({ number: 4, position: positions3x3.middleLeft   });
			expect(puzzle.getPieceByDirection('left' )).toEqual({ number: 7, position: positions3x3.bottomMiddle });
			expect(puzzle.getPieceByDirection('right')).toEqual(false);
		});

		it("should only return the pieces for left, right and down moves if the hole is bottom middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
			});

			expect(puzzle.getPieceByDirection('up'   )).toEqual(false);
			expect(puzzle.getPieceByDirection('down' )).toEqual({ number: 5, position: positions3x3.middleMiddle });
			expect(puzzle.getPieceByDirection('left' )).toEqual({ number: 8, position: positions3x3.bottomRight  });
			expect(puzzle.getPieceByDirection('right')).toEqual({ number: 7, position: positions3x3.bottomLeft   });
		});

		it("should only return the pieces for left and down moves if the hole is bottom right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
			});

			expect(puzzle.getPieceByDirection('up'   )).toEqual(false);
			expect(puzzle.getPieceByDirection('down' )).toEqual({ number: 6, position: positions3x3.middleRight  });
			expect(puzzle.getPieceByDirection('left' )).toEqual(false);
			expect(puzzle.getPieceByDirection('right')).toEqual({ number: 8, position: positions3x3.bottomMiddle });
		});

		it("should throw an exception if the direction is invalid", function() {
			expect(function() { puzzle.getPieceByDirection('uup'); }).toThrow(DIRECTION_INVALID);
			expect(function() { puzzle.getPieceByDirection(''   ); }).toThrow(DIRECTION_INVALID);
			expect(function() { puzzle.getPieceByDirection(null ); }).toThrow(DIRECTION_INVALID);
			expect(function() { puzzle.getPieceByDirection(     ); }).toThrow(DIRECTION_INVALID);
		});
	});
});
