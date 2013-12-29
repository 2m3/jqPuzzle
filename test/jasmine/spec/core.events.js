describe("Events: ", function() {
	var callbacks = {
		move: function(event, move) {},
		solved: function(event) {},
		undo: function(event, move) {},
		redo: function(event, move) {},
		restart: function(event) {},
		reset: function(event) {}
	};

	describe("move", function() {
		beforeEach(function() {
			spyOn(callbacks, "move");
		});

		it("should fire when a move was successfully performed", function() {
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
		beforeEach(function() {
			spyOn(callbacks, "solved");
		});

		it("should fire when the puzzle was solved", function() {
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

	describe("undo", function() {
		beforeEach(function() {
			spyOn(callbacks, "undo");
		});

		it("should fire when a previous move was undone", function() {
			puzzle = new SliderPuzzle({
				initialHole: 1
			});
			puzzle.on("undo", callbacks.undo);

			// move piece and undo
			puzzle.move(2);
			puzzle.undo();
			expect(callbacks.undo).toHaveBeenCalled();
			expect(callbacks.undo.calls.length).toEqual(1);
			expect(callbacks.undo.mostRecentCall.args[0]).toBeDefined();
			expect(callbacks.undo.mostRecentCall.args[1]).toBeDefined();
		});

		it("should fire for each previous move that was undone", function() {
			puzzle = new SliderPuzzle({
				initialHole: 1
			});
			puzzle.on("undo", callbacks.undo);

			// move piece and undo
			puzzle.move(2);
			puzzle.move(3);
			puzzle.move(4);
			puzzle.undo();
			puzzle.undo();
			puzzle.undo();
			expect(callbacks.undo).toHaveBeenCalled();
			expect(callbacks.undo.calls.length).toEqual(3);
		});

		it("should not fire when there is no move to undo", function() {
			puzzle = new SliderPuzzle({
				initialHole: 1
			});
			puzzle.on("undo", callbacks.undo);

			// no move
			puzzle.undo();
			expect(callbacks.undo).not.toHaveBeenCalled();

			// unsuccessful move
			puzzle.move(3);
			puzzle.undo();
			expect(callbacks.undo).not.toHaveBeenCalled();

			// only one move to undo
			puzzle.move(2);
			puzzle.undo();
			puzzle.undo();
			expect(callbacks.undo).toHaveBeenCalled();
			expect(callbacks.undo.calls.length).toEqual(1);
		});

		it("should pass the move object as the event's data", function() {
			var move;

			puzzle = new SliderPuzzle({
				rows: 3,
				cols: 3,
				initialHole: 1
			});
			puzzle.on("undo", callbacks.undo);

			// move piece and undo
			puzzle.move(2);
			puzzle.undo();
			move = callbacks.undo.mostRecentCall.args[1];

			expect(move).toEqual({ number: jasmine.any(Number), from: positions3x3.topMiddle, to: positions3x3.topLeft, direction: 'left', index: 1, timestamp: jasmine.any(Date) });
		});
	});

	describe("redo", function() {
		beforeEach(function() {
			spyOn(callbacks, "redo");
		});

		it("should fire when a previously undone move was redone", function() {
			puzzle = new SliderPuzzle({
				initialHole: 1
			});
			puzzle.on("redo", callbacks.redo);

			// move piece, undo and redo
			puzzle.move(2);
			puzzle.undo();
			puzzle.redo();
			expect(callbacks.redo).toHaveBeenCalled();
			expect(callbacks.redo.calls.length).toEqual(1);
			expect(callbacks.redo.mostRecentCall.args[0]).toBeDefined();
			expect(callbacks.redo.mostRecentCall.args[1]).toBeDefined();
		});

		it("should fire for each previously undone move that was redone", function() {
			puzzle = new SliderPuzzle({
				initialHole: 1
			});
			puzzle.on("redo", callbacks.redo);

			// move piece, undo and redo
			puzzle.move(2);
			puzzle.move(3);
			puzzle.move(4);
			puzzle.undo();
			puzzle.undo();
			puzzle.undo();
			puzzle.redo();
			puzzle.redo();
			puzzle.redo();
			expect(callbacks.redo).toHaveBeenCalled();
			expect(callbacks.redo.calls.length).toEqual(3);
		});

		it("should not fire when there is no move to redo", function() {
			puzzle = new SliderPuzzle({
				initialHole: 1
			});
			puzzle.on("redo", callbacks.redo);

			// no move
			puzzle.redo();
			expect(callbacks.redo).not.toHaveBeenCalled();

			// no undo
			puzzle.move(2);
			puzzle.redo();
			expect(callbacks.redo).not.toHaveBeenCalled();

			// only one move to redo
			puzzle.undo();
			puzzle.redo();
			puzzle.redo();
			expect(callbacks.redo).toHaveBeenCalled();
			expect(callbacks.redo.calls.length).toEqual(1);
		});

		it("should pass the move object as the event's data", function() {
			var move;

			puzzle = new SliderPuzzle({
				rows: 3,
				cols: 3,
				initialHole: 1
			});
			puzzle.on("redo", callbacks.redo);

			// move piece, undo and redo
			puzzle.move(2);
			puzzle.undo();
			puzzle.redo();
			move = callbacks.redo.mostRecentCall.args[1];

			expect(move).toEqual({ number: jasmine.any(Number), from: positions3x3.topMiddle, to: positions3x3.topLeft, direction: 'left', index: 1, timestamp: jasmine.any(Date) });
		});
	});

	describe("restart", function() {
		beforeEach(function() {
			spyOn(callbacks, "restart");
		});

		it("should fire when the puzzle was restarted with the restart() method", function() {
			puzzle = new SliderPuzzle();
			puzzle.on("restart", callbacks.restart);

			puzzle.restart();
			expect(callbacks.restart).toHaveBeenCalled();
			expect(callbacks.restart.calls.length).toEqual(1);
			expect(callbacks.restart.mostRecentCall.args[0]).toBeDefined();
			expect(callbacks.restart.mostRecentCall.args[1]).not.toBeDefined();
		});

		it("should fire when the puzzle was restarted with the shuffle() method", function() {
			puzzle = new SliderPuzzle();
			puzzle.on("restart", callbacks.restart);

			puzzle.shuffle();
			expect(callbacks.restart).toHaveBeenCalled();
			expect(callbacks.restart.calls.length).toEqual(1);
			expect(callbacks.restart.mostRecentCall.args[0]).toBeDefined();
			expect(callbacks.restart.mostRecentCall.args[1]).not.toBeDefined();
		});

		it("should not fire when the puzzle was initialized", function() {
			puzzle = new SliderPuzzle();
			puzzle.on("restart", callbacks.restart);

			expect(callbacks.restart).not.toHaveBeenCalled();
		});
	});

	describe("reset", function() {
		beforeEach(function() {
			spyOn(callbacks, "reset");
		});

		it("should fire when the puzzle was reset with the reset() method", function() {
			puzzle = new SliderPuzzle();
			puzzle.on("reset", callbacks.reset);

			puzzle.reset();
			expect(callbacks.reset).toHaveBeenCalled();
			expect(callbacks.reset.calls.length).toEqual(1);
			expect(callbacks.reset.mostRecentCall.args[0]).toBeDefined();
			expect(callbacks.reset.mostRecentCall.args[1]).not.toBeDefined();
		});

		it("should fire when the puzzle was reset with the restart() method", function() {
			puzzle = new SliderPuzzle();
			puzzle.on("reset", callbacks.reset);

			puzzle.restart();
			expect(callbacks.reset).toHaveBeenCalled();
			expect(callbacks.reset.calls.length).toEqual(1);
			expect(callbacks.reset.mostRecentCall.args[0]).toBeDefined();
			expect(callbacks.reset.mostRecentCall.args[1]).not.toBeDefined();
		});

		it("should fire when the puzzle was reset with the shuffle() method", function() {
			puzzle = new SliderPuzzle();
			puzzle.on("reset", callbacks.reset);

			puzzle.shuffle();
			expect(callbacks.reset).toHaveBeenCalled();
			expect(callbacks.reset.calls.length).toEqual(1);
			expect(callbacks.reset.mostRecentCall.args[0]).toBeDefined();
			expect(callbacks.reset.mostRecentCall.args[1]).not.toBeDefined();
		});

		it("should not fire when the puzzle was initialized", function() {
			puzzle = new SliderPuzzle();
			puzzle.on("reset", callbacks.reset);

			expect(callbacks.reset).not.toHaveBeenCalled();
		});
	});
});
