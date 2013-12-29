describe("Events: ", function() {
	var callbacks;

	beforeEach(function() {
		callbacks = {
			move: function(event, move) {},
			solved: function(event) {}
		};
	});

	describe("move", function() {
		it("should fire when a move was successfully performed", function() {
			spyOn(callbacks, "move");

			puzzle = new SliderPuzzle({
				initialHole: 1
			});
			puzzle.on("move", callbacks.move);

			// move piece
			puzzle.move(2);
			expect(callbacks.move).toHaveBeenCalled();
			expect(callbacks.move.calls.length).toEqual(1);
			expect(callbacks.move.mostRecentCall.args[0]).toBeDefined();
			expect(callbacks.move.mostRecentCall.args[1]).toBeDefined();
		});

		it("should fire when a random move was performed", function() {
			spyOn(callbacks, "move");

			puzzle = new SliderPuzzle();
			puzzle.on("move", callbacks.move);

			// move piece
			puzzle.moveRandomly();
			expect(callbacks.move).toHaveBeenCalled();
			expect(callbacks.move.calls.length).toEqual(1);
			expect(callbacks.move.mostRecentCall.args[0]).toBeDefined();
			expect(callbacks.move.mostRecentCall.args[1]).toBeDefined();
		});

		it("should not fire when a move could not be performed", function() {
			spyOn(callbacks, "move");

			puzzle = new SliderPuzzle({
				initialHole: 1
			});
			puzzle.on("move", callbacks.move);

			// try to move hole
			puzzle.move(1);
			expect(callbacks.move).not.toHaveBeenCalled();

			// try to move piece
			puzzle.move(3);
			expect(callbacks.move).not.toHaveBeenCalled();
		});

		it("should pass the move object as the event's data", function() {
			var move;

			spyOn(callbacks, "move");

			puzzle = new SliderPuzzle({
				rows: 3,
				cols: 3,
				initialHole: 1
			});
			puzzle.on("move", callbacks.move);

			// move piece
			puzzle.move(2);
			move = callbacks.move.mostRecentCall.args[1];

			expect(move).toEqual({ number: jasmine.any(Number), from: positions3x3.topMiddle, to: positions3x3.topLeft, direction: 'left', index: 1, timestamp: jasmine.any(Date) });
		});
	});

	describe("solved", function() {
		it("should fire when the puzzle was solved", function() {
			spyOn(callbacks, "solved");

			puzzle = new SliderPuzzle({
				shuffle: false
			});
			puzzle.on("solved", callbacks.solved);

			// move piece back
			puzzle.move(15);
			expect(callbacks.solved).not.toHaveBeenCalled();

			// and forth
			puzzle.move(16);
			expect(callbacks.solved).toHaveBeenCalled();
			expect(callbacks.solved.calls.length).toEqual(1);
			expect(callbacks.solved.mostRecentCall.args[0]).toBeDefined();
			expect(callbacks.solved.mostRecentCall.args[1]).not.toBeDefined();
			expect(puzzle.isSolved()).toEqual(true);
		});

		it("should not fire when the puzzle was not solved", function() {
			spyOn(callbacks, "solved");

			puzzle = new SliderPuzzle({
				shuffle: false
			});
			puzzle.on("solved", callbacks.solved);

			// move pieces
			puzzle.move(15);
			puzzle.move(14);
			puzzle.move(13);
			puzzle.move( 9);
			puzzle.move(10);
			puzzle.move(11);
			puzzle.move(12);
			puzzle.move( 8);
			puzzle.move( 7);
			puzzle.move( 6);
			puzzle.move( 5);
			puzzle.move( 1);
			puzzle.move( 2);
			puzzle.move( 3);
			puzzle.move( 4);
			expect(callbacks.solved).not.toHaveBeenCalled();
			expect(puzzle.isSolved()).toEqual(false);
		});
	});
});
