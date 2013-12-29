describe("Events: ", function() {
	var callbacks;

	beforeEach(function() {
		callbacks = {
			move: function(event, move) {}
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
});
