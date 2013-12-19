describe("Moves: ", function() {

	describe("canMove()", function() {
		it("should only allow left and up moves if the hole is top left", function() {
			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMove(1)).toEqual(false);
			expect(puzzle.canMove(2)).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
			expect(puzzle.canMove(3)).toEqual(false);
			expect(puzzle.canMove(4)).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
			expect(puzzle.canMove(5)).toEqual(false);
			expect(puzzle.canMove(6)).toEqual(false);
			expect(puzzle.canMove(7)).toEqual(false);
			expect(puzzle.canMove(8)).toEqual(false);
			expect(puzzle.canMove(9)).toEqual(false);

			expect(puzzle.canMove(1, 1)).toEqual(false);
			expect(puzzle.canMove(1, 2)).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
			expect(puzzle.canMove(1, 3)).toEqual(false);
			expect(puzzle.canMove(2, 1)).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
			expect(puzzle.canMove(2, 2)).toEqual(false);
			expect(puzzle.canMove(2, 3)).toEqual(false);
			expect(puzzle.canMove(3, 1)).toEqual(false);
			expect(puzzle.canMove(3, 2)).toEqual(false);
			expect(puzzle.canMove(3, 3)).toEqual(false);

			expect(puzzle.canMove([1, 1])).toEqual(false);
			expect(puzzle.canMove([1, 2])).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
			expect(puzzle.canMove([1, 3])).toEqual(false);
			expect(puzzle.canMove([2, 1])).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
			expect(puzzle.canMove([2, 2])).toEqual(false);
			expect(puzzle.canMove([2, 3])).toEqual(false);
			expect(puzzle.canMove([3, 1])).toEqual(false);
			expect(puzzle.canMove([3, 2])).toEqual(false);
			expect(puzzle.canMove([3, 3])).toEqual(false);

			expect(puzzle.canMove({ row: 1, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 1, col: 2 })).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
			expect(puzzle.canMove({ row: 1, col: 3 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 1 })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
			expect(puzzle.canMove({ row: 2, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 3 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 3 })).toEqual(false);
		});

		it("should allow left, right and up moves if the hole is top middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMove(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
			expect(puzzle.canMove(2)).toEqual(false);
			expect(puzzle.canMove(3)).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
			expect(puzzle.canMove(4)).toEqual(false);
			expect(puzzle.canMove(5)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
			expect(puzzle.canMove(6)).toEqual(false);
			expect(puzzle.canMove(7)).toEqual(false);
			expect(puzzle.canMove(8)).toEqual(false);
			expect(puzzle.canMove(9)).toEqual(false);

			expect(puzzle.canMove(1, 1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
			expect(puzzle.canMove(1, 2)).toEqual(false);
			expect(puzzle.canMove(1, 3)).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
			expect(puzzle.canMove(2, 1)).toEqual(false);
			expect(puzzle.canMove(2, 2)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
			expect(puzzle.canMove(2, 3)).toEqual(false);
			expect(puzzle.canMove(3, 1)).toEqual(false);
			expect(puzzle.canMove(3, 2)).toEqual(false);
			expect(puzzle.canMove(3, 3)).toEqual(false);

			expect(puzzle.canMove([1, 1])).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
			expect(puzzle.canMove([1, 2])).toEqual(false);
			expect(puzzle.canMove([1, 3])).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
			expect(puzzle.canMove([2, 1])).toEqual(false);
			expect(puzzle.canMove([2, 2])).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
			expect(puzzle.canMove([2, 3])).toEqual(false);
			expect(puzzle.canMove([3, 1])).toEqual(false);
			expect(puzzle.canMove([3, 2])).toEqual(false);
			expect(puzzle.canMove([3, 3])).toEqual(false);

			expect(puzzle.canMove({ row: 1, col: 1 })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
			expect(puzzle.canMove({ row: 1, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 1, col: 3 })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
			expect(puzzle.canMove({ row: 2, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 2 })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
			expect(puzzle.canMove({ row: 2, col: 3 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 3 })).toEqual(false);
		});

		it("should only allow right and up moves if the hole is top right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMove(1)).toEqual(false);
			expect(puzzle.canMove(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
			expect(puzzle.canMove(3)).toEqual(false);
			expect(puzzle.canMove(4)).toEqual(false);
			expect(puzzle.canMove(5)).toEqual(false);
			expect(puzzle.canMove(6)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
			expect(puzzle.canMove(7)).toEqual(false);
			expect(puzzle.canMove(8)).toEqual(false);
			expect(puzzle.canMove(9)).toEqual(false);

			expect(puzzle.canMove(1, 1)).toEqual(false);
			expect(puzzle.canMove(1, 2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
			expect(puzzle.canMove(1, 3)).toEqual(false);
			expect(puzzle.canMove(2, 1)).toEqual(false);
			expect(puzzle.canMove(2, 2)).toEqual(false);
			expect(puzzle.canMove(2, 3)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
			expect(puzzle.canMove(3, 1)).toEqual(false);
			expect(puzzle.canMove(3, 2)).toEqual(false);
			expect(puzzle.canMove(3, 3)).toEqual(false);

			expect(puzzle.canMove([1, 1])).toEqual(false);
			expect(puzzle.canMove([1, 2])).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
			expect(puzzle.canMove([1, 3])).toEqual(false);
			expect(puzzle.canMove([2, 1])).toEqual(false);
			expect(puzzle.canMove([2, 2])).toEqual(false);
			expect(puzzle.canMove([2, 3])).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
			expect(puzzle.canMove([3, 1])).toEqual(false);
			expect(puzzle.canMove([3, 2])).toEqual(false);
			expect(puzzle.canMove([3, 3])).toEqual(false);

			expect(puzzle.canMove({ row: 1, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 1, col: 2 })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
			expect(puzzle.canMove({ row: 1, col: 3 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 3 })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
			expect(puzzle.canMove({ row: 3, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 3 })).toEqual(false);
		});

		it("should only allow left, up and down moves if the hole is middle left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMove(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
			expect(puzzle.canMove(2)).toEqual(false);
			expect(puzzle.canMove(3)).toEqual(false);
			expect(puzzle.canMove(4)).toEqual(false);
			expect(puzzle.canMove(5)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
			expect(puzzle.canMove(6)).toEqual(false);
			expect(puzzle.canMove(7)).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
			expect(puzzle.canMove(8)).toEqual(false);
			expect(puzzle.canMove(9)).toEqual(false);

			expect(puzzle.canMove(1, 1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
			expect(puzzle.canMove(1, 2)).toEqual(false);
			expect(puzzle.canMove(1, 3)).toEqual(false);
			expect(puzzle.canMove(2, 1)).toEqual(false);
			expect(puzzle.canMove(2, 2)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
			expect(puzzle.canMove(2, 3)).toEqual(false);
			expect(puzzle.canMove(3, 1)).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
			expect(puzzle.canMove(3, 2)).toEqual(false);
			expect(puzzle.canMove(3, 3)).toEqual(false);

			expect(puzzle.canMove([1, 1])).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
			expect(puzzle.canMove([1, 2])).toEqual(false);
			expect(puzzle.canMove([1, 3])).toEqual(false);
			expect(puzzle.canMove([2, 1])).toEqual(false);
			expect(puzzle.canMove([2, 2])).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
			expect(puzzle.canMove([2, 3])).toEqual(false);
			expect(puzzle.canMove([3, 1])).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
			expect(puzzle.canMove([3, 2])).toEqual(false);
			expect(puzzle.canMove([3, 3])).toEqual(false);

			expect(puzzle.canMove({ row: 1, col: 1 })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
			expect(puzzle.canMove({ row: 1, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 1, col: 3 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 2 })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
			expect(puzzle.canMove({ row: 2, col: 3 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 1 })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
			expect(puzzle.canMove({ row: 3, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 3 })).toEqual(false);
		});

		it("should allow left, right, up and down moves if the hole is middle middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
			});

			expect(puzzle.canMove(1)).toEqual(false);
			expect(puzzle.canMove(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
			expect(puzzle.canMove(3)).toEqual(false);
			expect(puzzle.canMove(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
			expect(puzzle.canMove(5)).toEqual(false);
			expect(puzzle.canMove(6)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
			expect(puzzle.canMove(7)).toEqual(false);
			expect(puzzle.canMove(8)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
			expect(puzzle.canMove(9)).toEqual(false);

			expect(puzzle.canMove(1, 1)).toEqual(false);
			expect(puzzle.canMove(1, 2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
			expect(puzzle.canMove(1, 3)).toEqual(false);
			expect(puzzle.canMove(2, 1)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
			expect(puzzle.canMove(2, 2)).toEqual(false);
			expect(puzzle.canMove(2, 3)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
			expect(puzzle.canMove(3, 1)).toEqual(false);
			expect(puzzle.canMove(3, 2)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
			expect(puzzle.canMove(3, 3)).toEqual(false);

			expect(puzzle.canMove([1, 1])).toEqual(false);
			expect(puzzle.canMove([1, 2])).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
			expect(puzzle.canMove([1, 3])).toEqual(false);
			expect(puzzle.canMove([2, 1])).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
			expect(puzzle.canMove([2, 2])).toEqual(false);
			expect(puzzle.canMove([2, 3])).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
			expect(puzzle.canMove([3, 1])).toEqual(false);
			expect(puzzle.canMove([3, 2])).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
			expect(puzzle.canMove([3, 3])).toEqual(false);

			expect(puzzle.canMove({ row: 1, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 1, col: 2 })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
			expect(puzzle.canMove({ row: 1, col: 3 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 1 })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
			expect(puzzle.canMove({ row: 2, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 3 })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
			expect(puzzle.canMove({ row: 3, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 2 })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
			expect(puzzle.canMove({ row: 3, col: 3 })).toEqual(false);
		});

		it("should only allow right, up and down moves if the hole is middle right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
			});

			expect(puzzle.canMove(1)).toEqual(false);
			expect(puzzle.canMove(2)).toEqual(false);
			expect(puzzle.canMove(3)).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
			expect(puzzle.canMove(4)).toEqual(false);
			expect(puzzle.canMove(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
			expect(puzzle.canMove(6)).toEqual(false);
			expect(puzzle.canMove(7)).toEqual(false);
			expect(puzzle.canMove(8)).toEqual(false);
			expect(puzzle.canMove(9)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });

			expect(puzzle.canMove(1, 1)).toEqual(false);
			expect(puzzle.canMove(1, 2)).toEqual(false);
			expect(puzzle.canMove(1, 3)).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
			expect(puzzle.canMove(2, 1)).toEqual(false);
			expect(puzzle.canMove(2, 2)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
			expect(puzzle.canMove(2, 3)).toEqual(false);
			expect(puzzle.canMove(3, 1)).toEqual(false);
			expect(puzzle.canMove(3, 2)).toEqual(false);
			expect(puzzle.canMove(3, 3)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });

			expect(puzzle.canMove([1, 1])).toEqual(false);
			expect(puzzle.canMove([1, 2])).toEqual(false);
			expect(puzzle.canMove([1, 3])).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
			expect(puzzle.canMove([2, 1])).toEqual(false);
			expect(puzzle.canMove([2, 2])).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
			expect(puzzle.canMove([2, 3])).toEqual(false);
			expect(puzzle.canMove([3, 1])).toEqual(false);
			expect(puzzle.canMove([3, 2])).toEqual(false);
			expect(puzzle.canMove([3, 3])).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });

			expect(puzzle.canMove({ row: 1, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 1, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 1, col: 3 })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
			expect(puzzle.canMove({ row: 2, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 2 })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
			expect(puzzle.canMove({ row: 2, col: 3 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 3 })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });
		});

		it("should only allow left and down moves if the hole is bottom left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
			});

			expect(puzzle.canMove(1)).toEqual(false);
			expect(puzzle.canMove(2)).toEqual(false);
			expect(puzzle.canMove(3)).toEqual(false);
			expect(puzzle.canMove(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
			expect(puzzle.canMove(5)).toEqual(false);
			expect(puzzle.canMove(6)).toEqual(false);
			expect(puzzle.canMove(7)).toEqual(false);
			expect(puzzle.canMove(8)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
			expect(puzzle.canMove(9)).toEqual(false);

			expect(puzzle.canMove(1, 1)).toEqual(false);
			expect(puzzle.canMove(1, 2)).toEqual(false);
			expect(puzzle.canMove(1, 3)).toEqual(false);
			expect(puzzle.canMove(2, 1)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
			expect(puzzle.canMove(2, 2)).toEqual(false);
			expect(puzzle.canMove(2, 3)).toEqual(false);
			expect(puzzle.canMove(3, 1)).toEqual(false);
			expect(puzzle.canMove(3, 2)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
			expect(puzzle.canMove(3, 3)).toEqual(false);

			expect(puzzle.canMove([1, 1])).toEqual(false);
			expect(puzzle.canMove([1, 2])).toEqual(false);
			expect(puzzle.canMove([1, 3])).toEqual(false);
			expect(puzzle.canMove([2, 1])).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
			expect(puzzle.canMove([2, 2])).toEqual(false);
			expect(puzzle.canMove([2, 3])).toEqual(false);
			expect(puzzle.canMove([3, 1])).toEqual(false);
			expect(puzzle.canMove([3, 2])).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
			expect(puzzle.canMove([3, 3])).toEqual(false);

			expect(puzzle.canMove({ row: 1, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 1, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 1, col: 3 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 1 })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
			expect(puzzle.canMove({ row: 2, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 3 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 2 })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
			expect(puzzle.canMove({ row: 3, col: 3 })).toEqual(false);
		});

		it("should only allow left, right and down moves if the hole is bottom middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
			});

			expect(puzzle.canMove(1)).toEqual(false);
			expect(puzzle.canMove(2)).toEqual(false);
			expect(puzzle.canMove(3)).toEqual(false);
			expect(puzzle.canMove(4)).toEqual(false);
			expect(puzzle.canMove(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
			expect(puzzle.canMove(6)).toEqual(false);
			expect(puzzle.canMove(7)).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
			expect(puzzle.canMove(8)).toEqual(false);
			expect(puzzle.canMove(9)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });

			expect(puzzle.canMove(1, 1)).toEqual(false);
			expect(puzzle.canMove(1, 2)).toEqual(false);
			expect(puzzle.canMove(1, 3)).toEqual(false);
			expect(puzzle.canMove(2, 1)).toEqual(false);
			expect(puzzle.canMove(2, 2)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
			expect(puzzle.canMove(2, 3)).toEqual(false);
			expect(puzzle.canMove(3, 1)).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
			expect(puzzle.canMove(3, 2)).toEqual(false);
			expect(puzzle.canMove(3, 3)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });

			expect(puzzle.canMove([1, 1])).toEqual(false);
			expect(puzzle.canMove([1, 2])).toEqual(false);
			expect(puzzle.canMove([1, 3])).toEqual(false);
			expect(puzzle.canMove([2, 1])).toEqual(false);
			expect(puzzle.canMove([2, 2])).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
			expect(puzzle.canMove([2, 3])).toEqual(false);
			expect(puzzle.canMove([3, 1])).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
			expect(puzzle.canMove([3, 2])).toEqual(false);
			expect(puzzle.canMove([3, 3])).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });

			expect(puzzle.canMove({ row: 1, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 1, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 1, col: 3 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 2 })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
			expect(puzzle.canMove({ row: 2, col: 3 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 1 })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
			expect(puzzle.canMove({ row: 3, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 3 })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });
		});

		it("should only allow right and down moves if the hole is bottom right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
			});

			expect(puzzle.canMove(1)).toEqual(false);
			expect(puzzle.canMove(2)).toEqual(false);
			expect(puzzle.canMove(3)).toEqual(false);
			expect(puzzle.canMove(4)).toEqual(false);
			expect(puzzle.canMove(5)).toEqual(false);
			expect(puzzle.canMove(6)).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
			expect(puzzle.canMove(7)).toEqual(false);
			expect(puzzle.canMove(8)).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
			expect(puzzle.canMove(9)).toEqual(false);

			expect(puzzle.canMove(1, 1)).toEqual(false);
			expect(puzzle.canMove(1, 2)).toEqual(false);
			expect(puzzle.canMove(1, 3)).toEqual(false);
			expect(puzzle.canMove(2, 1)).toEqual(false);
			expect(puzzle.canMove(2, 2)).toEqual(false);
			expect(puzzle.canMove(2, 3)).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
			expect(puzzle.canMove(3, 1)).toEqual(false);
			expect(puzzle.canMove(3, 2)).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
			expect(puzzle.canMove(3, 3)).toEqual(false);

			expect(puzzle.canMove([1, 1])).toEqual(false);
			expect(puzzle.canMove([1, 2])).toEqual(false);
			expect(puzzle.canMove([1, 3])).toEqual(false);
			expect(puzzle.canMove([2, 1])).toEqual(false);
			expect(puzzle.canMove([2, 2])).toEqual(false);
			expect(puzzle.canMove([2, 3])).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
			expect(puzzle.canMove([3, 1])).toEqual(false);
			expect(puzzle.canMove([3, 2])).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
			expect(puzzle.canMove([3, 3])).toEqual(false);

			expect(puzzle.canMove({ row: 1, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 1, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 1, col: 3 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 2 })).toEqual(false);
			expect(puzzle.canMove({ row: 2, col: 3 })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
			expect(puzzle.canMove({ row: 3, col: 1 })).toEqual(false);
			expect(puzzle.canMove({ row: 3, col: 2 })).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
			expect(puzzle.canMove({ row: 3, col: 3 })).toEqual(false);
		});

		it("should throw an exception if the arguments are invalid", function() {
			expect(function() { puzzle.canMove(-1); }).toThrow(INDEX_INVALID);
			expect(function() { puzzle.canMove( 0); }).toThrow(INDEX_INVALID);
			expect(function() { puzzle.canMove(10); }).toThrow(INDEX_INVALID);
			expect(function() { puzzle.canMove(-1, 1); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.canMove( 0, 1); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.canMove(10, 1); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.canMove(1, -1); }).toThrow(COL_INVALID);
			expect(function() { puzzle.canMove(1,  0); }).toThrow(COL_INVALID);
			expect(function() { puzzle.canMove(1, 10); }).toThrow(COL_INVALID);
			expect(function() { puzzle.canMove([-1, 1]); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.canMove([ 0, 1]); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.canMove([10, 1]); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.canMove([1, -1]); }).toThrow(COL_INVALID);
			expect(function() { puzzle.canMove([1,  0]); }).toThrow(COL_INVALID);
			expect(function() { puzzle.canMove([1, 10]); }).toThrow(COL_INVALID);
			expect(function() { puzzle.canMove({ row: -1, col:  1 }); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.canMove({ row:  0, col:  1 }); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.canMove({ row: 10, col:  1 }); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.canMove({ row:  1, col: -1 }); }).toThrow(COL_INVALID);
			expect(function() { puzzle.canMove({ row:  1, col:  0 }); }).toThrow(COL_INVALID);
			expect(function() { puzzle.canMove({ row:  1, col: 10 }); }).toThrow(COL_INVALID);
			expect(function() { puzzle.canMove(null); }).toThrow(INDEX_INVALID);
			expect(function() { puzzle.canMove(    ); }).toThrow(INDEX_INVALID);
		});
	});

	describe("canMoveByNumber()", function() {
		it("should only allow left and up moves if the hole is top left", function() {
			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMoveByNumber(0)).toEqual(false);
			expect(puzzle.canMoveByNumber(1)).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
			expect(puzzle.canMoveByNumber(2)).toEqual(false);
			expect(puzzle.canMoveByNumber(3)).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
			expect(puzzle.canMoveByNumber(4)).toEqual(false);
			expect(puzzle.canMoveByNumber(5)).toEqual(false);
			expect(puzzle.canMoveByNumber(6)).toEqual(false);
			expect(puzzle.canMoveByNumber(7)).toEqual(false);
			expect(puzzle.canMoveByNumber(8)).toEqual(false);
		});

		it("should allow left, right and up moves if the hole is top middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMoveByNumber(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
			expect(puzzle.canMoveByNumber(0)).toEqual(false);
			expect(puzzle.canMoveByNumber(2)).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
			expect(puzzle.canMoveByNumber(3)).toEqual(false);
			expect(puzzle.canMoveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
			expect(puzzle.canMoveByNumber(5)).toEqual(false);
			expect(puzzle.canMoveByNumber(6)).toEqual(false);
			expect(puzzle.canMoveByNumber(7)).toEqual(false);
			expect(puzzle.canMoveByNumber(8)).toEqual(false);
		});

		it("should only allow right and up moves if the hole is top right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMoveByNumber(1)).toEqual(false);
			expect(puzzle.canMoveByNumber(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
			expect(puzzle.canMoveByNumber(0)).toEqual(false);
			expect(puzzle.canMoveByNumber(3)).toEqual(false);
			expect(puzzle.canMoveByNumber(4)).toEqual(false);
			expect(puzzle.canMoveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
			expect(puzzle.canMoveByNumber(6)).toEqual(false);
			expect(puzzle.canMoveByNumber(7)).toEqual(false);
			expect(puzzle.canMoveByNumber(8)).toEqual(false);
		});

		it("should only allow left, up and down moves if the hole is middle left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMoveByNumber(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
			expect(puzzle.canMoveByNumber(2)).toEqual(false);
			expect(puzzle.canMoveByNumber(3)).toEqual(false);
			expect(puzzle.canMoveByNumber(0)).toEqual(false);
			expect(puzzle.canMoveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
			expect(puzzle.canMoveByNumber(5)).toEqual(false);
			expect(puzzle.canMoveByNumber(6)).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
			expect(puzzle.canMoveByNumber(7)).toEqual(false);
			expect(puzzle.canMoveByNumber(8)).toEqual(false);
		});

		it("should allow left, right, up and down moves if the hole is middle middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
			});

			expect(puzzle.canMoveByNumber(1)).toEqual(false);
			expect(puzzle.canMoveByNumber(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
			expect(puzzle.canMoveByNumber(3)).toEqual(false);
			expect(puzzle.canMoveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
			expect(puzzle.canMoveByNumber(0)).toEqual(false);
			expect(puzzle.canMoveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
			expect(puzzle.canMoveByNumber(6)).toEqual(false);
			expect(puzzle.canMoveByNumber(7)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
			expect(puzzle.canMoveByNumber(8)).toEqual(false);
		});

		it("should only allow right, up and down moves if the hole is middle right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
			});

			expect(puzzle.canMoveByNumber(1)).toEqual(false);
			expect(puzzle.canMoveByNumber(2)).toEqual(false);
			expect(puzzle.canMoveByNumber(3)).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
			expect(puzzle.canMoveByNumber(4)).toEqual(false);
			expect(puzzle.canMoveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
			expect(puzzle.canMoveByNumber(0)).toEqual(false);
			expect(puzzle.canMoveByNumber(6)).toEqual(false);
			expect(puzzle.canMoveByNumber(7)).toEqual(false);
			expect(puzzle.canMoveByNumber(8)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });
		});

		it("should only allow left and down moves if the hole is bottom left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
			});

			expect(puzzle.canMoveByNumber(1)).toEqual(false);
			expect(puzzle.canMoveByNumber(2)).toEqual(false);
			expect(puzzle.canMoveByNumber(3)).toEqual(false);
			expect(puzzle.canMoveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
			expect(puzzle.canMoveByNumber(5)).toEqual(false);
			expect(puzzle.canMoveByNumber(6)).toEqual(false);
			expect(puzzle.canMoveByNumber(0)).toEqual(false);
			expect(puzzle.canMoveByNumber(7)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
			expect(puzzle.canMoveByNumber(8)).toEqual(false);
		});

		it("should only allow left, right and down moves if the hole is bottom middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
			});

			expect(puzzle.canMoveByNumber(1)).toEqual(false);
			expect(puzzle.canMoveByNumber(2)).toEqual(false);
			expect(puzzle.canMoveByNumber(3)).toEqual(false);
			expect(puzzle.canMoveByNumber(4)).toEqual(false);
			expect(puzzle.canMoveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
			expect(puzzle.canMoveByNumber(6)).toEqual(false);
			expect(puzzle.canMoveByNumber(7)).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
			expect(puzzle.canMoveByNumber(0)).toEqual(false);
			expect(puzzle.canMoveByNumber(8)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });
		});

		it("should only allow right and down moves if the hole is bottom right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
			});

			expect(puzzle.canMoveByNumber(1)).toEqual(false);
			expect(puzzle.canMoveByNumber(2)).toEqual(false);
			expect(puzzle.canMoveByNumber(3)).toEqual(false);
			expect(puzzle.canMoveByNumber(4)).toEqual(false);
			expect(puzzle.canMoveByNumber(5)).toEqual(false);
			expect(puzzle.canMoveByNumber(6)).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
			expect(puzzle.canMoveByNumber(7)).toEqual(false);
			expect(puzzle.canMoveByNumber(8)).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
			expect(puzzle.canMoveByNumber(0)).toEqual(false);
		});

		it("should throw an exception if the number is invalid", function() {
			expect(function() { puzzle.canMoveByNumber(-1  ); }).toThrow(NUMBER_INVALID);
			expect(function() { puzzle.canMoveByNumber( 9  ); }).toThrow(NUMBER_INVALID);
			expect(function() { puzzle.canMoveByNumber(10  ); }).toThrow(NUMBER_INVALID);
			expect(function() { puzzle.canMoveByNumber(null); }).toThrow(NUMBER_INVALID);
			expect(function() { puzzle.canMoveByNumber(    ); }).toThrow(NUMBER_INVALID);
		});
	});

	describe("canMoveByDirection()", function() {
		it("should only allow left and up moves if the hole is top left", function() {
			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMoveByDirection('up'   )).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
			expect(puzzle.canMoveByDirection('down' )).toEqual(false);
			expect(puzzle.canMoveByDirection('left' )).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
			expect(puzzle.canMoveByDirection('right')).toEqual(false);
		});

		it("should only allow left, right and up moves if the hole is top middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMoveByDirection('up'   )).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
			expect(puzzle.canMoveByDirection('down' )).toEqual(false);
			expect(puzzle.canMoveByDirection('left' )).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
			expect(puzzle.canMoveByDirection('right')).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
		});

		it("should only allow right and up moves if the hole is top right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMoveByDirection('up'   )).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
			expect(puzzle.canMoveByDirection('down' )).toEqual(false);
			expect(puzzle.canMoveByDirection('left' )).toEqual(false);
			expect(puzzle.canMoveByDirection('right')).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
		});

		it("should only allow left, up and down moves if the hole is middle left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
			});

			expect(puzzle.canMoveByDirection('up'   )).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
			expect(puzzle.canMoveByDirection('down' )).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
			expect(puzzle.canMoveByDirection('left' )).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
			expect(puzzle.canMoveByDirection('right')).toEqual(false);
		});

		it("should allow left, right, up and down moves if the hole is middle middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
			});

			expect(puzzle.canMoveByDirection('up'   )).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
			expect(puzzle.canMoveByDirection('down' )).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
			expect(puzzle.canMoveByDirection('left' )).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
			expect(puzzle.canMoveByDirection('right')).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
		});

		it("should only allow right, up and down moves if the hole is middle right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
			});

			expect(puzzle.canMoveByDirection('up'   )).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });
			expect(puzzle.canMoveByDirection('down' )).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
			expect(puzzle.canMoveByDirection('left' )).toEqual(false);
			expect(puzzle.canMoveByDirection('right')).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
		});

		it("should only allow left and down moves if the hole is bottom left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
			});

			expect(puzzle.canMoveByDirection('up'   )).toEqual(false);
			expect(puzzle.canMoveByDirection('down' )).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
			expect(puzzle.canMoveByDirection('left' )).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
			expect(puzzle.canMoveByDirection('right')).toEqual(false);
		});

		it("should only allow left, right and down moves if the hole is bottom middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
			});

			expect(puzzle.canMoveByDirection('up'   )).toEqual(false);
			expect(puzzle.canMoveByDirection('down' )).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
			expect(puzzle.canMoveByDirection('left' )).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });
			expect(puzzle.canMoveByDirection('right')).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
		});

		it("should only allow left and down moves if the hole is bottom right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
			});

			expect(puzzle.canMoveByDirection('up'   )).toEqual(false);
			expect(puzzle.canMoveByDirection('down' )).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
			expect(puzzle.canMoveByDirection('left' )).toEqual(false);
			expect(puzzle.canMoveByDirection('right')).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
		});

		it("should throw an exception if the direction value is invalid", function() {
			puzzle = new SliderPuzzle({
				board: board3x3
			});

			expect(function() { puzzle.canMoveByDirection('uup'); }).toThrow(DIRECTION_INVALID);
			expect(function() { puzzle.canMoveByDirection(''   ); }).toThrow(DIRECTION_INVALID);
			expect(function() { puzzle.canMoveByDirection(null ); }).toThrow(DIRECTION_INVALID);
			expect(function() { puzzle.canMoveByDirection(     ); }).toThrow(DIRECTION_INVALID);
		});
	});

	describe("_canMoveByPiece()", function() {
		it("should only allow left and up moves if the hole is top left", function() {
			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.topLeft      })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topMiddle    })).toEqual({ number: 1, from: positions3x3.topMiddle,  to: positions3x3.topLeft, direction: 'left'  });
			expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topRight     })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual({ number: 3, from: positions3x3.middleLeft, to: positions3x3.topLeft, direction: 'up'    });
			expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
		});

		it("should allow left, right and up moves if the hole is top middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
			expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.topMiddle    })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topRight     })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
			expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
			expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
		});

		it("should only allow right and up moves if the hole is top right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,   to: positions3x3.topRight, direction: 'right' });
			expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.topRight     })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight, to: positions3x3.topRight, direction: 'up'    });
			expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
		});

		it("should only allow left, up and down moves if the hole is middle left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
			});

			expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
			expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.middleLeft   })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
			expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
			expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
		});

		it("should allow left, right, up and down moves if the hole is middle middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
			});

			expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
			expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
			expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
			expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
			expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
		});

		it("should only allow right, up and down moves if the hole is middle right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
			});

			expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
			expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
			expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.middleRight  })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });
		});

		it("should only allow left and down moves if the hole is bottom left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
			});

			expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
			expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.bottomLeft   })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
			expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
		});

		it("should only allow left, right and down moves if the hole is bottom middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
			});

			expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
			expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomLeft   })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
			expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });
		});

		it("should only allow right and down moves if the hole is bottom right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
			});

			expect(puzzle._canMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
			expect(puzzle._canMoveByPiece({ number: 7, position: positions3x3.bottomLeft   })).toEqual(false);
			expect(puzzle._canMoveByPiece({ number: 8, position: positions3x3.bottomMiddle })).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
			expect(puzzle._canMoveByPiece({ number: 0, position: positions3x3.bottomRight  })).toEqual(false);
		});
	});

	describe("_canMoveByMove()", function() {
		it("should only allow left and up moves if the hole is top left", function() {
			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.topLeft,      to: positions3x3.topLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  })).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
			expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topRight,     to: positions3x3.topLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
			expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topLeft })).toEqual(false);
		});

		it("should allow left, right and up moves if the hole is top middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
			expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.topMiddle,    to: positions3x3.topMiddle })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
			expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topMiddle })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
			expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topMiddle })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topMiddle })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topMiddle })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topMiddle })).toEqual(false);
		});

		it("should only allow right and up moves if the hole is top right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
			expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.topRight,     to: positions3x3.topRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
			expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topRight })).toEqual(false);
		});

		it("should only allow left, up and down moves if the hole is middle left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
			});

			expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
			expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.middleLeft,   to: positions3x3.middleLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
			expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
			expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleLeft })).toEqual(false);
		});

		it("should allow left, right, up and down moves if the hole is middle middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
			});

			expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
			expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
			expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.middleMiddle, to: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
			expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
			expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleMiddle })).toEqual(false);
		});

		it("should only allow right, up and down moves if the hole is middle right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
			});

			expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
			expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
			expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.middleRight,  to: positions3x3.middleRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });
		});

		it("should only allow left and down moves if the hole is bottom left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
			});

			expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
			expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.bottomLeft,   to: positions3x3.bottomLeft })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
			expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomLeft })).toEqual(false);
		});

		it("should only allow left, right and down moves if the hole is bottom middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
			});

			expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
			expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
			expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.bottomMiddle, to: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });
		});

		it("should only allow right and down moves if the hole is bottom right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
			});

			expect(puzzle._canMoveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
			expect(puzzle._canMoveByMove({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomRight })).toEqual(false);
			expect(puzzle._canMoveByMove({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' })).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
			expect(puzzle._canMoveByMove({ number: 0, from: positions3x3.bottomRight,  to: positions3x3.bottomRight })).toEqual(false);
		});
	});

	describe("move()", function() {
		it("should only allow left and up moves if the hole is top left", function() {
			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.move(1)).toEqual(false);
			expect(puzzle.move(2)).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle.move(3)).toEqual(false);
			expect(puzzle.move(4)).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle.move(5)).toEqual(false);
			expect(puzzle.move(6)).toEqual(false);
			expect(puzzle.move(7)).toEqual(false);
			expect(puzzle.move(8)).toEqual(false);
			expect(puzzle.move(9)).toEqual(false);

			expect(puzzle.move(1, 1)).toEqual(false);
			expect(puzzle.move(1, 2)).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle.move(1, 3)).toEqual(false);
			expect(puzzle.move(2, 1)).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle.move(2, 2)).toEqual(false);
			expect(puzzle.move(2, 3)).toEqual(false);
			expect(puzzle.move(3, 1)).toEqual(false);
			expect(puzzle.move(3, 2)).toEqual(false);
			expect(puzzle.move(3, 3)).toEqual(false);

			expect(puzzle.move([1, 1])).toEqual(false);
			expect(puzzle.move([1, 2])).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle.move([1, 3])).toEqual(false);
			expect(puzzle.move([2, 1])).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle.move([2, 2])).toEqual(false);
			expect(puzzle.move([2, 3])).toEqual(false);
			expect(puzzle.move([3, 1])).toEqual(false);
			expect(puzzle.move([3, 2])).toEqual(false);
			expect(puzzle.move([3, 3])).toEqual(false);

			expect(puzzle.move({ row: 1, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 1, col: 2 })).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle.move({ row: 1, col: 3 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 1 })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle.move({ row: 2, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 3 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 3 })).toEqual(false);
		});

		it("should allow left, right and up moves if the hole is top middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.move(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.move(2)).toEqual(false);
			expect(puzzle.move(3)).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.move(4)).toEqual(false);
			expect(puzzle.move(5)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.move(6)).toEqual(false);
			expect(puzzle.move(7)).toEqual(false);
			expect(puzzle.move(8)).toEqual(false);
			expect(puzzle.move(9)).toEqual(false);

			expect(puzzle.move(1, 1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.move(1, 2)).toEqual(false);
			expect(puzzle.move(1, 3)).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.move(2, 1)).toEqual(false);
			expect(puzzle.move(2, 2)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.move(2, 3)).toEqual(false);
			expect(puzzle.move(3, 1)).toEqual(false);
			expect(puzzle.move(3, 2)).toEqual(false);
			expect(puzzle.move(3, 3)).toEqual(false);

			expect(puzzle.move([1, 1])).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.move([1, 2])).toEqual(false);
			expect(puzzle.move([1, 3])).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.move([2, 1])).toEqual(false);
			expect(puzzle.move([2, 2])).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.move([2, 3])).toEqual(false);
			expect(puzzle.move([3, 1])).toEqual(false);
			expect(puzzle.move([3, 2])).toEqual(false);
			expect(puzzle.move([3, 3])).toEqual(false);

			expect(puzzle.move({ row: 1, col: 1 })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.move({ row: 1, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 1, col: 3 })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.move({ row: 2, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 2 })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.move({ row: 2, col: 3 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 3 })).toEqual(false);
		});

		it("should only allow right and up moves if the hole is top right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.move(1)).toEqual(false);
			expect(puzzle.move(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle.move(3)).toEqual(false);
			expect(puzzle.move(4)).toEqual(false);
			expect(puzzle.move(5)).toEqual(false);
			expect(puzzle.move(6)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle.move(7)).toEqual(false);
			expect(puzzle.move(8)).toEqual(false);
			expect(puzzle.move(9)).toEqual(false);

			expect(puzzle.move(1, 1)).toEqual(false);
			expect(puzzle.move(1, 2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle.move(1, 3)).toEqual(false);
			expect(puzzle.move(2, 1)).toEqual(false);
			expect(puzzle.move(2, 2)).toEqual(false);
			expect(puzzle.move(2, 3)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle.move(3, 1)).toEqual(false);
			expect(puzzle.move(3, 2)).toEqual(false);
			expect(puzzle.move(3, 3)).toEqual(false);

			expect(puzzle.move([1, 1])).toEqual(false);
			expect(puzzle.move([1, 2])).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle.move([1, 3])).toEqual(false);
			expect(puzzle.move([2, 1])).toEqual(false);
			expect(puzzle.move([2, 2])).toEqual(false);
			expect(puzzle.move([2, 3])).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle.move([3, 1])).toEqual(false);
			expect(puzzle.move([3, 2])).toEqual(false);
			expect(puzzle.move([3, 3])).toEqual(false);

			expect(puzzle.move({ row: 1, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 1, col: 2 })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle.move({ row: 1, col: 3 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 3 })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle.move({ row: 3, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 3 })).toEqual(false);
		});

		it("should only allow left, up and down moves if the hole is middle left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
			});

			expect(puzzle.move(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.move(2)).toEqual(false);
			expect(puzzle.move(3)).toEqual(false);
			expect(puzzle.move(4)).toEqual(false);
			expect(puzzle.move(5)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.move(6)).toEqual(false);
			expect(puzzle.move(7)).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.move(8)).toEqual(false);
			expect(puzzle.move(9)).toEqual(false);

			expect(puzzle.move(1, 1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.move(1, 2)).toEqual(false);
			expect(puzzle.move(1, 3)).toEqual(false);
			expect(puzzle.move(2, 1)).toEqual(false);
			expect(puzzle.move(2, 2)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.move(2, 3)).toEqual(false);
			expect(puzzle.move(3, 1)).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.move(3, 2)).toEqual(false);
			expect(puzzle.move(3, 3)).toEqual(false);

			expect(puzzle.move([1, 1])).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.move([1, 2])).toEqual(false);
			expect(puzzle.move([1, 3])).toEqual(false);
			expect(puzzle.move([2, 1])).toEqual(false);
			expect(puzzle.move([2, 2])).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.move([2, 3])).toEqual(false);
			expect(puzzle.move([3, 1])).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.move([3, 2])).toEqual(false);
			expect(puzzle.move([3, 3])).toEqual(false);

			expect(puzzle.move({ row: 1, col: 1 })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.move({ row: 1, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 1, col: 3 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 2 })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.move({ row: 2, col: 3 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 1 })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.move({ row: 3, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 3 })).toEqual(false);
		});

		it("should allow left, right, up and down moves if the hole is middle middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
			});

			expect(puzzle.move(1)).toEqual(false);
			expect(puzzle.move(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move(3)).toEqual(false);
			expect(puzzle.move(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move(5)).toEqual(false);
			expect(puzzle.move(6)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move(7)).toEqual(false);
			expect(puzzle.move(8)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move(9)).toEqual(false);

			expect(puzzle.move(1, 1)).toEqual(false);
			expect(puzzle.move(1, 2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move(1, 3)).toEqual(false);
			expect(puzzle.move(2, 1)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move(2, 2)).toEqual(false);
			expect(puzzle.move(2, 3)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move(3, 1)).toEqual(false);
			expect(puzzle.move(3, 2)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move(3, 3)).toEqual(false);

			expect(puzzle.move([1, 1])).toEqual(false);
			expect(puzzle.move([1, 2])).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move([1, 3])).toEqual(false);
			expect(puzzle.move([2, 1])).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move([2, 2])).toEqual(false);
			expect(puzzle.move([2, 3])).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move([3, 1])).toEqual(false);
			expect(puzzle.move([3, 2])).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move([3, 3])).toEqual(false);

			expect(puzzle.move({ row: 1, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 1, col: 2 })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move({ row: 1, col: 3 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 1 })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move({ row: 2, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 3 })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move({ row: 3, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 2 })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move({ row: 3, col: 3 })).toEqual(false);
		});

		it("should only allow right, up and down moves if the hole is middle right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
			});

			expect(puzzle.move(1)).toEqual(false);
			expect(puzzle.move(2)).toEqual(false);
			expect(puzzle.move(3)).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle.move(4)).toEqual(false);
			expect(puzzle.move(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();expect(puzzle.move(6)).toEqual(false);
			expect(puzzle.move(7)).toEqual(false);
			expect(puzzle.move(8)).toEqual(false);
			expect(puzzle.move(9)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();

			expect(puzzle.move(1, 1)).toEqual(false);
			expect(puzzle.move(1, 2)).toEqual(false);
			expect(puzzle.move(1, 3)).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle.move(2, 1)).toEqual(false);
			expect(puzzle.move(2, 2)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle.move(2, 3)).toEqual(false);
			expect(puzzle.move(3, 1)).toEqual(false);
			expect(puzzle.move(3, 2)).toEqual(false);
			expect(puzzle.move(3, 3)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();

			expect(puzzle.move([1, 1])).toEqual(false);
			expect(puzzle.move([1, 2])).toEqual(false);
			expect(puzzle.move([1, 3])).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle.move([2, 1])).toEqual(false);
			expect(puzzle.move([2, 2])).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle.move([2, 3])).toEqual(false);
			expect(puzzle.move([3, 1])).toEqual(false);
			expect(puzzle.move([3, 2])).toEqual(false);
			expect(puzzle.move([3, 3])).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();

			expect(puzzle.move({ row: 1, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 1, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 1, col: 3 })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle.move({ row: 2, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 2 })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle.move({ row: 2, col: 3 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 3 })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
		});

		it("should only allow left and down moves if the hole is bottom left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
			});

			expect(puzzle.move(1)).toEqual(false);
			expect(puzzle.move(2)).toEqual(false);
			expect(puzzle.move(3)).toEqual(false);
			expect(puzzle.move(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle.move(5)).toEqual(false);
			expect(puzzle.move(6)).toEqual(false);
			expect(puzzle.move(7)).toEqual(false);
			expect(puzzle.move(8)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle.move(9)).toEqual(false);

			expect(puzzle.move(1, 1)).toEqual(false);
			expect(puzzle.move(1, 2)).toEqual(false);
			expect(puzzle.move(1, 3)).toEqual(false);
			expect(puzzle.move(2, 1)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle.move(2, 2)).toEqual(false);
			expect(puzzle.move(2, 3)).toEqual(false);
			expect(puzzle.move(3, 1)).toEqual(false);
			expect(puzzle.move(3, 2)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle.move(3, 3)).toEqual(false);

			expect(puzzle.move([1, 1])).toEqual(false);
			expect(puzzle.move([1, 2])).toEqual(false);
			expect(puzzle.move([1, 3])).toEqual(false);
			expect(puzzle.move([2, 1])).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle.move([2, 2])).toEqual(false);
			expect(puzzle.move([2, 3])).toEqual(false);
			expect(puzzle.move([3, 1])).toEqual(false);
			expect(puzzle.move([3, 2])).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle.move([3, 3])).toEqual(false);

			expect(puzzle.move({ row: 1, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 1, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 1, col: 3 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 1 })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle.move({ row: 2, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 3 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 2 })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle.move({ row: 3, col: 3 })).toEqual(false);
		});

		it("should only allow left, right and down moves if the hole is bottom middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
			});

			expect(puzzle.move(1)).toEqual(false);
			expect(puzzle.move(2)).toEqual(false);
			expect(puzzle.move(3)).toEqual(false);
			expect(puzzle.move(4)).toEqual(false);
			expect(puzzle.move(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle.move(6)).toEqual(false);
			expect(puzzle.move(7)).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle.move(8)).toEqual(false);
			expect(puzzle.move(9)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();

			expect(puzzle.move(1, 1)).toEqual(false);
			expect(puzzle.move(1, 2)).toEqual(false);
			expect(puzzle.move(1, 3)).toEqual(false);
			expect(puzzle.move(2, 1)).toEqual(false);
			expect(puzzle.move(2, 2)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle.move(2, 3)).toEqual(false);
			expect(puzzle.move(3, 1)).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle.move(3, 2)).toEqual(false);
			expect(puzzle.move(3, 3)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();

			expect(puzzle.move([1, 1])).toEqual(false);
			expect(puzzle.move([1, 2])).toEqual(false);
			expect(puzzle.move([1, 3])).toEqual(false);
			expect(puzzle.move([2, 1])).toEqual(false);
			expect(puzzle.move([2, 2])).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle.move([2, 3])).toEqual(false);
			expect(puzzle.move([3, 1])).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle.move([3, 2])).toEqual(false);
			expect(puzzle.move([3, 3])).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();

			expect(puzzle.move({ row: 1, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 1, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 1, col: 3 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 2 })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle.move({ row: 2, col: 3 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 1 })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle.move({ row: 3, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 3 })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
		});

		it("should only allow right and down moves if the hole is bottom right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
			});

			expect(puzzle.move(1)).toEqual(false);
			expect(puzzle.move(2)).toEqual(false);
			expect(puzzle.move(3)).toEqual(false);
			expect(puzzle.move(4)).toEqual(false);
			expect(puzzle.move(5)).toEqual(false);
			expect(puzzle.move(6)).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle.move(7)).toEqual(false);
			expect(puzzle.move(8)).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle.move(9)).toEqual(false);

			expect(puzzle.move(1, 1)).toEqual(false);
			expect(puzzle.move(1, 2)).toEqual(false);
			expect(puzzle.move(1, 3)).toEqual(false);
			expect(puzzle.move(2, 1)).toEqual(false);
			expect(puzzle.move(2, 2)).toEqual(false);
			expect(puzzle.move(2, 3)).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle.move(3, 1)).toEqual(false);
			expect(puzzle.move(3, 2)).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle.move(3, 3)).toEqual(false);

			expect(puzzle.move([1, 1])).toEqual(false);
			expect(puzzle.move([1, 2])).toEqual(false);
			expect(puzzle.move([1, 3])).toEqual(false);
			expect(puzzle.move([2, 1])).toEqual(false);
			expect(puzzle.move([2, 2])).toEqual(false);
			expect(puzzle.move([2, 3])).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle.move([3, 1])).toEqual(false);
			expect(puzzle.move([3, 2])).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle.move([3, 3])).toEqual(false);

			expect(puzzle.move({ row: 1, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 1, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 1, col: 3 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 2 })).toEqual(false);
			expect(puzzle.move({ row: 2, col: 3 })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle.move({ row: 3, col: 1 })).toEqual(false);
			expect(puzzle.move({ row: 3, col: 2 })).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle.move({ row: 3, col: 3 })).toEqual(false);
		});

		it("should throw an exception if the arguments are invalid", function() {
			expect(function() { puzzle.move(-1); }).toThrow(INDEX_INVALID);
			expect(function() { puzzle.move( 0); }).toThrow(INDEX_INVALID);
			expect(function() { puzzle.move(10); }).toThrow(INDEX_INVALID);
			expect(function() { puzzle.move(-1, 1); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.move( 0, 1); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.move(10, 1); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.move(1, -1); }).toThrow(COL_INVALID);
			expect(function() { puzzle.move(1,  0); }).toThrow(COL_INVALID);
			expect(function() { puzzle.move(1, 10); }).toThrow(COL_INVALID);
			expect(function() { puzzle.move([-1, 1]); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.move([ 0, 1]); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.move([10, 1]); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.move([1, -1]); }).toThrow(COL_INVALID);
			expect(function() { puzzle.move([1,  0]); }).toThrow(COL_INVALID);
			expect(function() { puzzle.move([1, 10]); }).toThrow(COL_INVALID);
			expect(function() { puzzle.move({ row: -1, col:  1 }); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.move({ row:  0, col:  1 }); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.move({ row: 10, col:  1 }); }).toThrow(ROW_INVALID);
			expect(function() { puzzle.move({ row:  1, col: -1 }); }).toThrow(COL_INVALID);
			expect(function() { puzzle.move({ row:  1, col:  0 }); }).toThrow(COL_INVALID);
			expect(function() { puzzle.move({ row:  1, col: 10 }); }).toThrow(COL_INVALID);
			expect(function() { puzzle.move(null); }).toThrow(INDEX_INVALID);
			expect(function() { puzzle.move(    ); }).toThrow(INDEX_INVALID);
		});

		it("should allow a piece next to the hole to be moved exactly once", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle.move(1)).toEqual(false);
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.move(2)).toEqual(false);
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle.move(3)).toEqual(false);
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle.move(6)).toEqual(false);
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.move(5)).toEqual(false);
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.move(4)).toEqual(false);
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle.move(7)).toEqual(false);
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle.move(8)).toEqual(false);
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle.move(9)).toEqual(false);
		});

		it("should update the hole after a successful move", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			puzzle.move(1);
			expect(puzzle._hole).toEqual(1);
			puzzle.move(2);
			expect(puzzle._hole).toEqual(2);
			puzzle.move(3);
			expect(puzzle._hole).toEqual(3);
			puzzle.move(6);
			expect(puzzle._hole).toEqual(6);
			puzzle.move(5);
			expect(puzzle._hole).toEqual(5);
			puzzle.move(4);
			expect(puzzle._hole).toEqual(4);
			puzzle.move(7);
			expect(puzzle._hole).toEqual(7);
			puzzle.move(8);
			expect(puzzle._hole).toEqual(8);
			puzzle.move(9);
			expect(puzzle._hole).toEqual(9);
		});

		it("should not update the hole after an unsuccessful move", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
			});

			puzzle.move(1);
			expect(puzzle._hole).toEqual(9);
			puzzle.move(2);
			expect(puzzle._hole).toEqual(9);
			puzzle.move(3);
			expect(puzzle._hole).toEqual(9);
			puzzle.move(4);
			expect(puzzle._hole).toEqual(9);
			puzzle.move(5);
			expect(puzzle._hole).toEqual(9);

			puzzle.move(6); // successful
			puzzle.move(3); // successful
			puzzle.move(2); // successful

			puzzle.move(6);
			expect(puzzle._hole).toEqual(2);
			puzzle.move(7);
			expect(puzzle._hole).toEqual(2);
			puzzle.move(8);
			expect(puzzle._hole).toEqual(2);
			puzzle.move(9);
			expect(puzzle._hole).toEqual(2);
		});

		it("should update the board after a successful move", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			puzzle.move(1);
			expect(puzzle._board).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
			puzzle.move(2);
			expect(puzzle._board).toEqual([1, 0, 2, 3, 4, 5, 6, 7, 8]);
			puzzle.move(3);
			expect(puzzle._board).toEqual([1, 2, 0, 3, 4, 5, 6, 7, 8]);
			puzzle.move(6);
			expect(puzzle._board).toEqual([1, 2, 5, 3, 4, 0, 6, 7, 8]);
			puzzle.move(5);
			expect(puzzle._board).toEqual([1, 2, 5, 3, 0, 4, 6, 7, 8]);
			puzzle.move(4);
			expect(puzzle._board).toEqual([1, 2, 5, 0, 3, 4, 6, 7, 8]);
			puzzle.move(7);
			expect(puzzle._board).toEqual([1, 2, 5, 6, 3, 4, 0, 7, 8]);
			puzzle.move(8);
			expect(puzzle._board).toEqual([1, 2, 5, 6, 3, 4, 7, 0, 8]);
			puzzle.move(9);
			expect(puzzle._board).toEqual([1, 2, 5, 6, 3, 4, 7, 8, 0]);
		});

		it("should not update the board after an unsuccessful move", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
			});

			puzzle.move(1);
			expect(puzzle._board).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);
			puzzle.move(2);
			expect(puzzle._board).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);
			puzzle.move(3);
			expect(puzzle._board).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);
			puzzle.move(4);
			expect(puzzle._board).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);
			puzzle.move(5);
			expect(puzzle._board).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);

			puzzle.move(6); // successful
			puzzle.move(3); // successful
			puzzle.move(2); // successful

			puzzle.move(6);
			expect(puzzle._board).toEqual([1, 0, 2, 4, 5, 3, 7, 8, 6]);
			puzzle.move(7);
			expect(puzzle._board).toEqual([1, 0, 2, 4, 5, 3, 7, 8, 6]);
			puzzle.move(8);
			expect(puzzle._board).toEqual([1, 0, 2, 4, 5, 3, 7, 8, 6]);
			puzzle.move(9);
			expect(puzzle._board).toEqual([1, 0, 2, 4, 5, 3, 7, 8, 6]);
		});

		it("should add a consecutive move index to a successful move", function() {
			var move;

			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			});

			move = puzzle.move(2);
			expect(move).toBeTruthy();
			expect(move.index).toEqual(1);

			move = puzzle.move(1);
			expect(move).toBeTruthy();
			expect(move.index).toEqual(2);
		});

		it("should add a timestamp to a successful move", function() {
			var move;

			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			});

			move = puzzle.move(2);
			expect(move).toBeTruthy();
			expect(move.timestamp).toEqual(jasmine.any(Date));

			move = puzzle.move(1);
			expect(move).toBeTruthy();
			expect(move.timestamp).toEqual(jasmine.any(Date));
		});

		it("should add the moves object of a successful move to the stack", function() {
			var move1;
			var move2;

			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._moves).toEqual([]);

			move1 = puzzle.move(2);
			expect(puzzle._moves.length).toEqual(1);
			expect(puzzle._moves[0]).toEqual(move1);

			move2 = puzzle.move(1);
			expect(puzzle._moves.length).toEqual(2);
			expect(puzzle._moves[1]).toEqual(move2);
		});
	});

	describe("moveByNumber()", function() {
		it("should only allow left and up moves if the hole is top left", function() {
			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.moveByNumber(0)).toEqual(false);
			expect(puzzle.moveByNumber(1)).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle.moveByNumber(2)).toEqual(false);
			expect(puzzle.moveByNumber(3)).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle.moveByNumber(4)).toEqual(false);
			expect(puzzle.moveByNumber(5)).toEqual(false);
			expect(puzzle.moveByNumber(6)).toEqual(false);
			expect(puzzle.moveByNumber(7)).toEqual(false);
			expect(puzzle.moveByNumber(8)).toEqual(false);
		});

		it("should allow left, right and up moves if the hole is top middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.moveByNumber(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.moveByNumber(0)).toEqual(false);
			expect(puzzle.moveByNumber(2)).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.moveByNumber(3)).toEqual(false);
			expect(puzzle.moveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.moveByNumber(5)).toEqual(false);
			expect(puzzle.moveByNumber(6)).toEqual(false);
			expect(puzzle.moveByNumber(7)).toEqual(false);
			expect(puzzle.moveByNumber(8)).toEqual(false);
		});

		it("should only allow right and up moves if the hole is top right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.moveByNumber(1)).toEqual(false);
			expect(puzzle.moveByNumber(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle.moveByNumber(0)).toEqual(false);
			expect(puzzle.moveByNumber(3)).toEqual(false);
			expect(puzzle.moveByNumber(4)).toEqual(false);
			expect(puzzle.moveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle.moveByNumber(6)).toEqual(false);
			expect(puzzle.moveByNumber(7)).toEqual(false);
			expect(puzzle.moveByNumber(8)).toEqual(false);
		});

		it("should only allow left, up and down moves if the hole is middle left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
			});

			expect(puzzle.moveByNumber(1)).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.moveByNumber(2)).toEqual(false);
			expect(puzzle.moveByNumber(3)).toEqual(false);
			expect(puzzle.moveByNumber(0)).toEqual(false);
			expect(puzzle.moveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.moveByNumber(5)).toEqual(false);
			expect(puzzle.moveByNumber(6)).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.moveByNumber(7)).toEqual(false);
			expect(puzzle.moveByNumber(8)).toEqual(false);
		});

		it("should allow left, right, up and down moves if the hole is middle middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
			});

			expect(puzzle.moveByNumber(1)).toEqual(false);
			expect(puzzle.moveByNumber(2)).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.moveByNumber(3)).toEqual(false);
			expect(puzzle.moveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.moveByNumber(0)).toEqual(false);
			expect(puzzle.moveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.moveByNumber(6)).toEqual(false);
			expect(puzzle.moveByNumber(7)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.moveByNumber(8)).toEqual(false);
		});

		it("should only allow right, up and down moves if the hole is middle right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
			});

			expect(puzzle.moveByNumber(1)).toEqual(false);
			expect(puzzle.moveByNumber(2)).toEqual(false);
			expect(puzzle.moveByNumber(3)).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle.moveByNumber(4)).toEqual(false);
			expect(puzzle.moveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle.moveByNumber(0)).toEqual(false);
			expect(puzzle.moveByNumber(6)).toEqual(false);
			expect(puzzle.moveByNumber(7)).toEqual(false);
			expect(puzzle.moveByNumber(8)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
		});

		it("should only allow left and down moves if the hole is bottom left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
			});

			expect(puzzle.moveByNumber(1)).toEqual(false);
			expect(puzzle.moveByNumber(2)).toEqual(false);
			expect(puzzle.moveByNumber(3)).toEqual(false);
			expect(puzzle.moveByNumber(4)).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle.moveByNumber(5)).toEqual(false);
			expect(puzzle.moveByNumber(6)).toEqual(false);
			expect(puzzle.moveByNumber(0)).toEqual(false);
			expect(puzzle.moveByNumber(7)).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle.moveByNumber(8)).toEqual(false);
		});

		it("should only allow left, right and down moves if the hole is bottom middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
			});

			expect(puzzle.moveByNumber(1)).toEqual(false);
			expect(puzzle.moveByNumber(2)).toEqual(false);
			expect(puzzle.moveByNumber(3)).toEqual(false);
			expect(puzzle.moveByNumber(4)).toEqual(false);
			expect(puzzle.moveByNumber(5)).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle.moveByNumber(6)).toEqual(false);
			expect(puzzle.moveByNumber(7)).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle.moveByNumber(0)).toEqual(false);
			expect(puzzle.moveByNumber(8)).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
		});

		it("should only allow right and down moves if the hole is bottom right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
			});

			expect(puzzle.moveByNumber(1)).toEqual(false);
			expect(puzzle.moveByNumber(2)).toEqual(false);
			expect(puzzle.moveByNumber(3)).toEqual(false);
			expect(puzzle.moveByNumber(4)).toEqual(false);
			expect(puzzle.moveByNumber(5)).toEqual(false);
			expect(puzzle.moveByNumber(6)).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle.moveByNumber(7)).toEqual(false);
			expect(puzzle.moveByNumber(8)).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle.moveByNumber(0)).toEqual(false);
		});

		it("should throw an exception if the number is invalid", function() {
			expect(function() { puzzle.moveByNumber(-1  ); }).toThrow(NUMBER_INVALID);
			expect(function() { puzzle.moveByNumber( 9  ); }).toThrow(NUMBER_INVALID);
			expect(function() { puzzle.moveByNumber(10  ); }).toThrow(NUMBER_INVALID);
			expect(function() { puzzle.moveByNumber(null); }).toThrow(NUMBER_INVALID);
			expect(function() { puzzle.moveByNumber(    ); }).toThrow(NUMBER_INVALID);
		});
	});

	describe("moveByDirection()", function() {
		it("should only allow left and up moves if the hole is top left", function() {
			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.moveByDirection('up'   )).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle.moveByDirection('down' )).toEqual(false);
			expect(puzzle.moveByDirection('left' )).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle.moveByDirection('right')).toEqual(false);
		});

		it("should only allow left, right and up moves if the hole is top middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.moveByDirection('up'   )).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.moveByDirection('down' )).toEqual(false);
			expect(puzzle.moveByDirection('left' )).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle.moveByDirection('right')).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
		});

		it("should only allow right and up moves if the hole is top right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle.moveByDirection('up'   )).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle.moveByDirection('down' )).toEqual(false);
			expect(puzzle.moveByDirection('left' )).toEqual(false);
			expect(puzzle.moveByDirection('right')).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
		});

		it("should only allow left, up and down moves if the hole is middle left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
			});

			expect(puzzle.moveByDirection('up'   )).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.moveByDirection('down' )).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.moveByDirection('left' )).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle.moveByDirection('right')).toEqual(false);
		});

		it("should allow left, right, up and down moves if the hole is middle middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
			});

			expect(puzzle.moveByDirection('up'   )).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.moveByDirection('down' )).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.moveByDirection('left' )).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle.moveByDirection('right')).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
		});

		it("should only allow right, up and down moves if the hole is middle right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
			});

			expect(puzzle.moveByDirection('up'   )).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle.moveByDirection('down' )).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle.moveByDirection('left' )).toEqual(false);
			expect(puzzle.moveByDirection('right')).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
		});

		it("should only allow left and down moves if the hole is bottom left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
			});

			expect(puzzle.moveByDirection('up'   )).toEqual(false);
			expect(puzzle.moveByDirection('down' )).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle.moveByDirection('left' )).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle.moveByDirection('right')).toEqual(false);
		});

		it("should only allow left, right and down moves if the hole is bottom middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
			});

			expect(puzzle.moveByDirection('up'   )).toEqual(false);
			expect(puzzle.moveByDirection('down' )).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle.moveByDirection('left' )).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle.moveByDirection('right')).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
		});

		it("should only allow left and down moves if the hole is bottom right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
			});

			expect(puzzle.moveByDirection('up'   )).toEqual(false);
			expect(puzzle.moveByDirection('down' )).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle.moveByDirection('left' )).toEqual(false);
			expect(puzzle.moveByDirection('right')).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
		});

		it("should throw an exception if the direction value is invalid", function() {
			puzzle = new SliderPuzzle({
				board: board3x3
			});

			expect(function() { puzzle.moveByDirection('uup'); }).toThrow(DIRECTION_INVALID);
			expect(function() { puzzle.moveByDirection(''   ); }).toThrow(DIRECTION_INVALID);
			expect(function() { puzzle.moveByDirection(null ); }).toThrow(DIRECTION_INVALID);
			expect(function() { puzzle.moveByDirection(     ); }).toThrow(DIRECTION_INVALID);
		});
	});

	describe("moveRandomly()", function() {
		it("should always allow for a random move", function() {
			puzzle = new SliderPuzzle();

			for (var i = 0; i < 1000; i++) {
				expect(puzzle.moveRandomly()).toBeTruthy();
			}
		});

		it("should not move a piece back and forth", function() {
			var move;
			var lastDirection;

			puzzle = new SliderPuzzle();

			for (var i = 0; i < 1000; i++) {
				move = puzzle.moveRandomly();

				if (move) {
					if (move.direction === 'up'   ) expect(lastDirection).not.toEqual('down' );
					if (move.direction === 'down' ) expect(lastDirection).not.toEqual('up'   );
					if (move.direction === 'left' ) expect(lastDirection).not.toEqual('right');
					if (move.direction === 'right') expect(lastDirection).not.toEqual('left' );
				}

				lastDirection = move.direction;
			}
		});
	});

	describe("_moveByPiece()", function() {
		it("should only allow left and up moves if the hole is top left", function() {
			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._moveByPiece({ number: 0, position: positions3x3.topLeft      })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topMiddle    })).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topRight     })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
		});

		it("should allow left, right and up moves if the hole is top middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 0, position: positions3x3.topMiddle    })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topRight     })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
		});

		it("should only allow right and up moves if the hole is top right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 0, position: positions3x3.topRight     })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
		});

		it("should only allow left, up and down moves if the hole is middle left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
			});

			expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 0, position: positions3x3.middleLeft   })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
		});

		it("should allow left, right, up and down moves if the hole is middle middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
			});

			expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 0, position: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
		});

		it("should only allow right, up and down moves if the hole is middle right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
			});

			expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 0, position: positions3x3.middleRight  })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
		});

		it("should only allow left and down moves if the hole is bottom left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
			});

			expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 0, position: positions3x3.bottomLeft   })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual(false);
		});

		it("should only allow left, right and down moves if the hole is bottom middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
			});

			expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomLeft   })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 0, position: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
		});

		it("should only allow right and down moves if the hole is bottom right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
			});

			expect(puzzle._moveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 7, position: positions3x3.bottomLeft   })).toEqual(false);
			expect(puzzle._moveByPiece({ number: 8, position: positions3x3.bottomMiddle })).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle._moveByPiece({ number: 0, position: positions3x3.bottomRight  })).toEqual(false);
		});
	});

	describe("_moveByMove()", function() {
		it("should only allow left and up moves if the hole is top left", function() {
			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._moveByMove({ number: 0, from: positions3x3.topLeft,      to: positions3x3.topLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  })).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 2, from: positions3x3.topRight,     to: positions3x3.topLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(1)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topLeft })).toEqual(false);
		});

		it("should allow left, right and up moves if the hole is top middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 0, from: positions3x3.topMiddle,    to: positions3x3.topMiddle })).toEqual(false);
			expect(puzzle._moveByMove({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topMiddle })).toEqual(false);
			expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(2)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topMiddle })).toEqual(false);
			expect(puzzle._moveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topMiddle })).toEqual(false);
			expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topMiddle })).toEqual(false);
			expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topMiddle })).toEqual(false);
		});

		it("should only allow right and up moves if the hole is top right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 0, from: positions3x3.topRight,     to: positions3x3.topRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(3)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topRight })).toEqual(false);
		});

		it("should only allow left, up and down moves if the hole is middle left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
			});

			expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 0, from: positions3x3.middleLeft,   to: positions3x3.middleLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(4)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleLeft })).toEqual(false);
		});

		it("should allow left, right, up and down moves if the hole is middle middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
			});

			expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._moveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 0, from: positions3x3.middleMiddle, to: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleMiddle })).toEqual(false);
			expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(5)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleMiddle })).toEqual(false);
		});

		it("should only allow right, up and down moves if the hole is middle right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
			});

			expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 0, from: positions3x3.middleRight,  to: positions3x3.middleRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'   , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(6)).toBeTruthy();
		});

		it("should only allow left and down moves if the hole is bottom left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
			});

			expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 0, from: positions3x3.bottomLeft,   to: positions3x3.bottomLeft })).toEqual(false);
			expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(7)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomLeft })).toEqual(false);
		});

		it("should only allow left, right and down moves if the hole is bottom middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
			});

			expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._moveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._moveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 0, from: positions3x3.bottomMiddle, to: positions3x3.bottomMiddle })).toEqual(false);
			expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(8)).toBeTruthy();
		});

		it("should only allow right and down moves if the hole is bottom right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
			});

			expect(puzzle._moveByMove({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down' , index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomRight })).toEqual(false);
			expect(puzzle._moveByMove({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' })).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right', index: jasmine.any(Number), timestamp: jasmine.any(Date) });
			expect(puzzle.move(9)).toBeTruthy();
			expect(puzzle._moveByMove({ number: 0, from: positions3x3.bottomRight,  to: positions3x3.bottomRight })).toEqual(false);
		});
	});

	describe("_getMoveByPiece()", function() {
		it("should return the left and up moves if the hole is top left", function() {
			puzzle = new SliderPuzzle({
				board: [0, 1, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.topLeft      })).toEqual({ number: 0, from: positions3x3.topLeft,      to: positions3x3.topLeft });
			expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topMiddle    })).toEqual({ number: 1, from: positions3x3.topMiddle,    to: positions3x3.topLeft, direction: 'left'  });
			expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topRight     })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topLeft });
			expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topLeft, direction: 'up'    });
			expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topLeft });
			expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topLeft });
			expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topLeft });
			expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topLeft });
			expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topLeft });
		});

		it("should return the left, right and up moves if the hole is top middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 0, 2, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topMiddle, direction: 'right' });
			expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.topMiddle    })).toEqual({ number: 0, from: positions3x3.topMiddle,    to: positions3x3.topMiddle });
			expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topRight     })).toEqual({ number: 2, from: positions3x3.topRight,     to: positions3x3.topMiddle, direction: 'left'  });
			expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topMiddle });
			expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topMiddle, direction: 'up'    });
			expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topMiddle });
			expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topMiddle });
			expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topMiddle });
			expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topMiddle });
		});

		it("should return the right and up moves if the hole is top right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 0, 3, 4, 5, 6, 7, 8]
			});

			expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.topRight });
			expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.topRight, direction: 'right' });
			expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.topRight     })).toEqual({ number: 0, from: positions3x3.topRight,     to: positions3x3.topRight });
			expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.middleLeft   })).toEqual({ number: 3, from: positions3x3.middleLeft,   to: positions3x3.topRight });
			expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.topRight });
			expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.topRight, direction: 'up'    });
			expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.topRight });
			expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.topRight });
			expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.topRight });
		});

		it("should return the left, up and down moves if the hole is middle left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 0, 4, 5, 6, 7, 8]
			});

			expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleLeft, direction: 'down'  });
			expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleLeft });
			expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleLeft });
			expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.middleLeft   })).toEqual({ number: 0, from: positions3x3.middleLeft,   to: positions3x3.middleLeft });
			expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleMiddle })).toEqual({ number: 4, from: positions3x3.middleMiddle, to: positions3x3.middleLeft, direction: 'left'  });
			expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleLeft });
			expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleLeft, direction: 'up'    });
			expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleLeft });
			expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleLeft });
		});

		it("should return the left, right, up and down moves if the hole is middle middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 0, 5, 6, 7, 8]
			});

			expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleMiddle });
			expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleMiddle, direction: 'down'  });
			expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleMiddle });
			expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleMiddle, direction: 'right' });
			expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.middleMiddle })).toEqual({ number: 0, from: positions3x3.middleMiddle, to: positions3x3.middleMiddle });
			expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleRight  })).toEqual({ number: 5, from: positions3x3.middleRight,  to: positions3x3.middleMiddle, direction: 'left'  });
			expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleMiddle });
			expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleMiddle, direction: 'up'    });
			expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleMiddle });
		});

		it("should return the right, up and down moves if the hole is middle right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 0, 6, 7, 8]
			});

			expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.middleRight });
			expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.middleRight });
			expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.middleRight, direction: 'down'  });
			expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.middleRight });
			expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.middleRight, direction: 'right' });
			expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.middleRight  })).toEqual({ number: 0, from: positions3x3.middleRight,  to: positions3x3.middleRight });
			expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.bottomLeft   })).toEqual({ number: 6, from: positions3x3.bottomLeft,   to: positions3x3.middleRight });
			expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.middleRight });
			expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.middleRight, direction: 'up'    });
		});

		it("should return the left and down moves if the hole is bottom left", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 0, 7, 8]
			});

			expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomLeft });
			expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomLeft });
			expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomLeft });
			expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomLeft, direction: 'down'  });
			expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomLeft });
			expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomLeft });
			expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.bottomLeft   })).toEqual({ number: 0, from: positions3x3.bottomLeft,   to: positions3x3.bottomLeft });
			expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomMiddle })).toEqual({ number: 7, from: positions3x3.bottomMiddle, to: positions3x3.bottomLeft, direction: 'left'  });
			expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomLeft });
		});

		it("should return the left, right and down moves if the hole is bottom middle", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 0, 8]
			});

			expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomMiddle });
			expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomMiddle });
			expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomMiddle });
			expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomMiddle });
			expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle, direction: 'down'  });
			expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomMiddle });
			expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomLeft   })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomMiddle, direction: 'right' });
			expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.bottomMiddle })).toEqual({ number: 0, from: positions3x3.bottomMiddle, to: positions3x3.bottomMiddle });
			expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomRight  })).toEqual({ number: 8, from: positions3x3.bottomRight,  to: positions3x3.bottomMiddle, direction: 'left'  });
		});

		it("should return the right and down moves if the hole is bottom right", function() {
			puzzle = new SliderPuzzle({
				board: [1, 2, 3, 4, 5, 6, 7, 8, 0]
			});

			expect(puzzle._getMoveByPiece({ number: 1, position: positions3x3.topLeft      })).toEqual({ number: 1, from: positions3x3.topLeft,      to: positions3x3.bottomRight });
			expect(puzzle._getMoveByPiece({ number: 2, position: positions3x3.topMiddle    })).toEqual({ number: 2, from: positions3x3.topMiddle,    to: positions3x3.bottomRight });
			expect(puzzle._getMoveByPiece({ number: 3, position: positions3x3.topRight     })).toEqual({ number: 3, from: positions3x3.topRight,     to: positions3x3.bottomRight });
			expect(puzzle._getMoveByPiece({ number: 4, position: positions3x3.middleLeft   })).toEqual({ number: 4, from: positions3x3.middleLeft,   to: positions3x3.bottomRight });
			expect(puzzle._getMoveByPiece({ number: 5, position: positions3x3.middleMiddle })).toEqual({ number: 5, from: positions3x3.middleMiddle, to: positions3x3.bottomRight });
			expect(puzzle._getMoveByPiece({ number: 6, position: positions3x3.middleRight  })).toEqual({ number: 6, from: positions3x3.middleRight,  to: positions3x3.bottomRight, direction: 'down'  });
			expect(puzzle._getMoveByPiece({ number: 7, position: positions3x3.bottomLeft   })).toEqual({ number: 7, from: positions3x3.bottomLeft,   to: positions3x3.bottomRight });
			expect(puzzle._getMoveByPiece({ number: 8, position: positions3x3.bottomMiddle })).toEqual({ number: 8, from: positions3x3.bottomMiddle, to: positions3x3.bottomRight, direction: 'right' });
			expect(puzzle._getMoveByPiece({ number: 0, position: positions3x3.bottomRight  })).toEqual({ number: 0, from: positions3x3.bottomRight,  to: positions3x3.bottomRight });
		});
	});

	describe("_getDirection()", function() {
		it("should return the correct direction for a move ", function() {
			expect(puzzle._getDirection({ number: 1, from: positions3x3.middleMiddle, to: positions3x3.topMiddle    })).toEqual('up'   );
			expect(puzzle._getDirection({ number: 1, from: positions3x3.middleMiddle, to: positions3x3.bottomMiddle })).toEqual('down' );
			expect(puzzle._getDirection({ number: 1, from: positions3x3.middleMiddle, to: positions3x3.middleLeft   })).toEqual('left' );
			expect(puzzle._getDirection({ number: 1, from: positions3x3.middleMiddle, to: positions3x3.middleRight  })).toEqual('right');
		});
	});
});
