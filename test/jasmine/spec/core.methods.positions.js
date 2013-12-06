describe("Positions: ", function() {
	beforeEach(function() {
		puzzle = new SliderPuzzle({
			board: board3x3
		});
	});

	describe("getPosition()", function() {
		it("should return a position based on a one-dimensional index", function() {
			expect(puzzle.getPosition(1)).toEqual(positions3x3.topLeft     );
			expect(puzzle.getPosition(2)).toEqual(positions3x3.topMiddle   );
			expect(puzzle.getPosition(3)).toEqual(positions3x3.topRight    );
			expect(puzzle.getPosition(4)).toEqual(positions3x3.middleLeft  );
			expect(puzzle.getPosition(5)).toEqual(positions3x3.middleMiddle);
			expect(puzzle.getPosition(6)).toEqual(positions3x3.middleRight );
			expect(puzzle.getPosition(7)).toEqual(positions3x3.bottomLeft  );
			expect(puzzle.getPosition(8)).toEqual(positions3x3.bottomMiddle);
			expect(puzzle.getPosition(9)).toEqual(positions3x3.bottomRight );
		});

		it("should return a position based on row and col passed in as seperate arguments", function() {
			expect(puzzle.getPosition(1, 1)).toEqual(positions3x3.topLeft     );
			expect(puzzle.getPosition(1, 2)).toEqual(positions3x3.topMiddle   );
			expect(puzzle.getPosition(1, 3)).toEqual(positions3x3.topRight    );
			expect(puzzle.getPosition(2, 1)).toEqual(positions3x3.middleLeft  );
			expect(puzzle.getPosition(2, 2)).toEqual(positions3x3.middleMiddle);
			expect(puzzle.getPosition(2, 3)).toEqual(positions3x3.middleRight );
			expect(puzzle.getPosition(3, 1)).toEqual(positions3x3.bottomLeft  );
			expect(puzzle.getPosition(3, 2)).toEqual(positions3x3.bottomMiddle);
			expect(puzzle.getPosition(3, 3)).toEqual(positions3x3.bottomRight );
		});

		it("should return a position based on row and col passed in as an array", function() {
			expect(puzzle.getPosition([1, 1])).toEqual(positions3x3.topLeft     );
			expect(puzzle.getPosition([1, 2])).toEqual(positions3x3.topMiddle   );
			expect(puzzle.getPosition([1, 3])).toEqual(positions3x3.topRight    );
			expect(puzzle.getPosition([2, 1])).toEqual(positions3x3.middleLeft  );
			expect(puzzle.getPosition([2, 2])).toEqual(positions3x3.middleMiddle);
			expect(puzzle.getPosition([2, 3])).toEqual(positions3x3.middleRight );
			expect(puzzle.getPosition([3, 1])).toEqual(positions3x3.bottomLeft  );
			expect(puzzle.getPosition([3, 2])).toEqual(positions3x3.bottomMiddle);
			expect(puzzle.getPosition([3, 3])).toEqual(positions3x3.bottomRight );
		});

		it("should return a position based on row and col passed in as an object", function() {
			expect(puzzle.getPosition({ row: 1, col: 1 })).toEqual(positions3x3.topLeft     );
			expect(puzzle.getPosition({ row: 1, col: 2 })).toEqual(positions3x3.topMiddle   );
			expect(puzzle.getPosition({ row: 1, col: 3 })).toEqual(positions3x3.topRight    );
			expect(puzzle.getPosition({ row: 2, col: 1 })).toEqual(positions3x3.middleLeft  );
			expect(puzzle.getPosition({ row: 2, col: 2 })).toEqual(positions3x3.middleMiddle);
			expect(puzzle.getPosition({ row: 2, col: 3 })).toEqual(positions3x3.middleRight );
			expect(puzzle.getPosition({ row: 3, col: 1 })).toEqual(positions3x3.bottomLeft  );
			expect(puzzle.getPosition({ row: 3, col: 2 })).toEqual(positions3x3.bottomMiddle);
			expect(puzzle.getPosition({ row: 3, col: 3 })).toEqual(positions3x3.bottomRight );
		});

		it("should throw an exception if the arguments are invalid", function() {
			expect(function() { puzzle.getPosition(-1); }).toThrow(INDEX_INVALID);
			expect(function() { puzzle.getPosition( 0); }).toThrow(INDEX_INVALID);
			expect(function() { puzzle.getPosition(10); }).toThrow(INDEX_INVALID);
			expect(function() { puzzle.getPosition(-1, 1); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.getPosition( 0, 1); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.getPosition(10, 1); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.getPosition(1, -1); }).toThrow(COL_INVALID);
			expect(function() { puzzle.getPosition(1,  0); }).toThrow(COL_INVALID);
			expect(function() { puzzle.getPosition(1, 10); }).toThrow(COL_INVALID);
			expect(function() { puzzle.getPosition([-1, 1]); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.getPosition([ 0, 1]); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.getPosition([10, 1]); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.getPosition([1, -1]); }).toThrow(COL_INVALID);
			expect(function() { puzzle.getPosition([1,  0]); }).toThrow(COL_INVALID);
			expect(function() { puzzle.getPosition([1, 10]); }).toThrow(COL_INVALID);
			expect(function() { puzzle.getPosition({ row: -1, col:  1 }); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.getPosition({ row:  0, col:  1 }); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.getPosition({ row: 10, col:  1 }); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.getPosition({ row:  1, col: -1 }); }).toThrow(COL_INVALID);
			expect(function() { puzzle.getPosition({ row:  1, col:  0 }); }).toThrow(COL_INVALID);
			expect(function() { puzzle.getPosition({ row:  1, col: 10 }); }).toThrow(COL_INVALID);
			expect(function() { puzzle.getPosition(null); }).toThrow(INDEX_INVALID);
			expect(function() { puzzle.getPosition(    ); }).toThrow(INDEX_INVALID);
		});
	});

	describe("_getPositionByIndex()", function() {
		it("should return a position based on a one-dimensional index", function() {
			expect(puzzle._getPositionByIndex(1)).toEqual(positions3x3.topLeft     );
			expect(puzzle._getPositionByIndex(2)).toEqual(positions3x3.topMiddle   );
			expect(puzzle._getPositionByIndex(3)).toEqual(positions3x3.topRight    );
			expect(puzzle._getPositionByIndex(4)).toEqual(positions3x3.middleLeft  );
			expect(puzzle._getPositionByIndex(5)).toEqual(positions3x3.middleMiddle);
			expect(puzzle._getPositionByIndex(6)).toEqual(positions3x3.middleRight );
			expect(puzzle._getPositionByIndex(7)).toEqual(positions3x3.bottomLeft  );
			expect(puzzle._getPositionByIndex(8)).toEqual(positions3x3.bottomMiddle);
			expect(puzzle._getPositionByIndex(9)).toEqual(positions3x3.bottomRight );
		});

		it("should throw an exception if the one-dimensional index is out of bounds", function() {
			expect(function() { puzzle._getPositionByIndex(-1); }).toThrow(INDEX_INVALID);
			expect(function() { puzzle._getPositionByIndex( 0); }).toThrow(INDEX_INVALID);
			expect(function() { puzzle._getPositionByIndex(10); }).toThrow(INDEX_INVALID);
		});
	});

	describe("_getPositionByRowCol()", function() {
		it("should return a position based on row and col numbers", function() {
			expect(puzzle._getPositionByRowCol(1, 1)).toEqual(positions3x3.topLeft     );
			expect(puzzle._getPositionByRowCol(1, 2)).toEqual(positions3x3.topMiddle   );
			expect(puzzle._getPositionByRowCol(1, 3)).toEqual(positions3x3.topRight    );
			expect(puzzle._getPositionByRowCol(2, 1)).toEqual(positions3x3.middleLeft  );
			expect(puzzle._getPositionByRowCol(2, 2)).toEqual(positions3x3.middleMiddle);
			expect(puzzle._getPositionByRowCol(2, 3)).toEqual(positions3x3.middleRight );
			expect(puzzle._getPositionByRowCol(3, 1)).toEqual(positions3x3.bottomLeft  );
			expect(puzzle._getPositionByRowCol(3, 2)).toEqual(positions3x3.bottomMiddle);
			expect(puzzle._getPositionByRowCol(3, 3)).toEqual(positions3x3.bottomRight );
		});

		it("should throw an exception if the row or col value is out of bounds", function() {
			expect(function() { puzzle._getPositionByRowCol(-1, 1); }).toThrow(ROW_INVALID);
			expect(function() { puzzle._getPositionByRowCol( 0, 1); }).toThrow(ROW_INVALID);
			expect(function() { puzzle._getPositionByRowCol(10, 1); }).toThrow(ROW_INVALID);
			expect(function() { puzzle._getPositionByRowCol(1, -1); }).toThrow(COL_INVALID);
			expect(function() { puzzle._getPositionByRowCol(1,  0); }).toThrow(COL_INVALID);
			expect(function() { puzzle._getPositionByRowCol(1, 10); }).toThrow(COL_INVALID);
		});
	});

	describe("_isValidIndex()", function() {
		it("should only return false if the one-dimensional index is out of bounds", function() {
			expect(puzzle._isValidIndex( 1)).toEqual(true );
			expect(puzzle._isValidIndex( 2)).toEqual(true );
			expect(puzzle._isValidIndex( 3)).toEqual(true );
			expect(puzzle._isValidIndex( 4)).toEqual(true );
			expect(puzzle._isValidIndex( 5)).toEqual(true );
			expect(puzzle._isValidIndex( 6)).toEqual(true );
			expect(puzzle._isValidIndex( 7)).toEqual(true );
			expect(puzzle._isValidIndex( 8)).toEqual(true );
			expect(puzzle._isValidIndex( 9)).toEqual(true );
			expect(puzzle._isValidIndex(-1)).toEqual(false);
			expect(puzzle._isValidIndex( 0)).toEqual(false);
			expect(puzzle._isValidIndex(10)).toEqual(false);
		});
	});

	describe("_isValidRow()", function() {
		it("should only return false if the rows value is out of bounds", function() {
			expect(puzzle._isValidRow( 1)).toEqual(true );
			expect(puzzle._isValidRow( 2)).toEqual(true );
			expect(puzzle._isValidRow( 3)).toEqual(true );
			expect(puzzle._isValidRow(-1)).toEqual(false);
			expect(puzzle._isValidRow( 0)).toEqual(false);
			expect(puzzle._isValidRow(10)).toEqual(false);
		});
	});

	describe("_isValidCol()", function() {
		it("should only return false if the cols value is out of bounds", function() {
			expect(puzzle._isValidCol( 1)).toEqual(true );
			expect(puzzle._isValidCol( 2)).toEqual(true );
			expect(puzzle._isValidCol( 3)).toEqual(true );
			expect(puzzle._isValidCol(-1)).toEqual(false);
			expect(puzzle._isValidCol( 0)).toEqual(false);
			expect(puzzle._isValidCol(10)).toEqual(false);
		});
	});

	describe("_getPositionByTargetAndDirection()", function() {
		it("should only return the positions for left and up moves if the hole is top left", function() {
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.topLeft, 'left' )).toEqual(positions3x3.topMiddle );
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.topLeft, 'right')).toEqual(false);
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.topLeft, 'up'   )).toEqual(positions3x3.middleLeft);
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.topLeft, 'down' )).toEqual(false);
		});

		it("should only return the positions for left, right and up moves if the hole is top middle", function() {
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.topMiddle, 'up'   )).toEqual(positions3x3.middleMiddle);
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.topMiddle, 'down' )).toEqual(false);
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.topMiddle, 'left' )).toEqual(positions3x3.topRight    );
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.topMiddle, 'right')).toEqual(positions3x3.topLeft     );
		});

		it("should only return the positions for right and up moves if the hole is top right", function() {
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.topRight, 'up'   )).toEqual(positions3x3.middleRight );
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.topRight, 'down' )).toEqual(false);
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.topRight, 'left' )).toEqual(false);
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.topRight, 'right')).toEqual(positions3x3.topMiddle   );
		});

		it("should only return the positions for left, up and down moves if the hole is middle left", function() {
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleLeft, 'up'   )).toEqual(positions3x3.bottomLeft  );
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleLeft, 'down' )).toEqual(positions3x3.topLeft     );
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleLeft, 'left' )).toEqual(positions3x3.middleMiddle);
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleLeft, 'right')).toEqual(false);
		});

		it("should return the positions for left, right, up and down moves if the hole is middle middle", function() {
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleMiddle, 'up'   )).toEqual(positions3x3.bottomMiddle);
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleMiddle, 'down' )).toEqual(positions3x3.topMiddle   );
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleMiddle, 'left' )).toEqual(positions3x3.middleRight );
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleMiddle, 'right')).toEqual(positions3x3.middleLeft  );
		});

		it("should only return the positions for right, up and down moves if the hole is middle right", function() {
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleRight, 'up'   )).toEqual(positions3x3.bottomRight );
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleRight, 'down' )).toEqual(positions3x3.topRight    );
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleRight, 'left' )).toEqual(false);
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.middleRight, 'right')).toEqual(positions3x3.middleMiddle);
		});

		it("should only return the positions for left and down moves if the hole is bottom left", function() {
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomLeft, 'up'   )).toEqual(false);
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomLeft, 'down' )).toEqual(positions3x3.middleLeft  );
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomLeft, 'left' )).toEqual(positions3x3.bottomMiddle);
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomLeft, 'right')).toEqual(false);
		});

		it("should only return the positions for left, right and down moves if the hole is bottom middle", function() {
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomMiddle, 'up'   )).toEqual(false);
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomMiddle, 'down' )).toEqual(positions3x3.middleMiddle);
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomMiddle, 'left' )).toEqual(positions3x3.bottomRight );
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomMiddle, 'right')).toEqual(positions3x3.bottomLeft  );
		});

		it("should only return the positions for left and down moves if the hole is bottom right", function() {
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomRight, 'up'   )).toEqual(false);
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomRight, 'down' )).toEqual(positions3x3.middleRight );
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomRight, 'left' )).toEqual(false);
			expect(puzzle._getPositionByTargetAndDirection(positions3x3.bottomRight, 'right')).toEqual(positions3x3.bottomMiddle);
		});
	});
});
