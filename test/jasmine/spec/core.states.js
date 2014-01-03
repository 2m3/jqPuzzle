describe("States:", function() {

	var state = {
		INITIALIZED: 'INITIALIZED',
		STARTED: 'STARTED',
		PAUSED: 'PAUSED',
		STOPPED: 'STOPPED'
	};

	describe("INITIALIZED", function() {
		it("should be the active state after initializing the puzzle", function() {
			puzzle = new SliderPuzzle();
			expect(puzzle._currentState).toEqual(state.INITIALIZED);
		});

		it("should be the active state after initializing the puzzle with the shuffle option set to false", function() {
			puzzle = new SliderPuzzle({
				shuffle: false
			});
			expect(puzzle._currentState).toEqual(state.INITIALIZED);
		});

		it("should be the active state after initializing the puzzle with the shuffle option set to an integer", function() {
			puzzle = new SliderPuzzle({
				shuffle: 2
			});
			expect(puzzle._currentState).toEqual(state.INITIALIZED);
		});

		it("should be the active state after calling reset()", function() {
			puzzle = new SliderPuzzle();
			puzzle.moveRandomly();
			puzzle.reset();
			expect(puzzle._currentState).toEqual(state.INITIALIZED);
		});

		it("should be the active state after calling shuffle()", function() {
			puzzle = new SliderPuzzle();
			puzzle.moveRandomly();
			puzzle.shuffle();
			expect(puzzle._currentState).toEqual(state.INITIALIZED);
		});
	});

	describe("STARTED", function() {
		it("should be the active state after performing a move", function() {
			puzzle = new SliderPuzzle();
			puzzle.moveRandomly();
			expect(puzzle._currentState).toEqual(state.STARTED);
		});

		it("should be the active state after calling start()", function() {
			puzzle = new SliderPuzzle();
			puzzle.start();
			expect(puzzle._currentState).toEqual(state.STARTED);
		});

		it("should be the active state after calling resume() from the PAUSED state", function() {
			puzzle = new SliderPuzzle();
			puzzle.start();
			puzzle.pause();
			puzzle.resume();
			expect(puzzle._currentState).toEqual(state.STARTED);
		});
	});

	describe("PAUSED", function() {
		it("should be the active state after calling pause()", function() {
			puzzle = new SliderPuzzle();
			puzzle.start();
			puzzle.pause();
			expect(puzzle._currentState).toEqual(state.PAUSED);
		});

		it("should throw an exception when trying to perform a move", function() {
			puzzle = new SliderPuzzle();
			puzzle.start();
			puzzle.pause();
			expect(function() { puzzle.canMove(1); }).toThrow("invalid state: PAUSED");
			expect(function() { puzzle.moveRandomly(); }).toThrow("invalid state: PAUSED");
		});
	});

	describe("STOPPED", function() {
		it("should be the active state after calling stop()", function() {
			puzzle = new SliderPuzzle();
			puzzle.start();
			puzzle.stop();
			expect(puzzle._currentState).toEqual(state.STOPPED);
		});

		it("should be the active state after solving the puzzle", function() {
			puzzle = new SliderPuzzle({
				rows: 3,
				cols: 3,
				shuffle: false
			});
			puzzle.move(8);
			puzzle.move(9);
			expect(puzzle._currentState).toEqual(state.STOPPED);
		});

		it("should throw an exception when trying to perform a move", function() {
			puzzle = new SliderPuzzle();
			puzzle.start();
			puzzle.stop();
			expect(function() { puzzle.canMove(1); }).toThrow("invalid state: STOPPED");
			expect(function() { puzzle.moveRandomly(); }).toThrow("invalid state: STOPPED");
		});
	});
});
