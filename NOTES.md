Options
=======

`rows`
------

Specifies the number of rows of the puzzle.

Expects any integer value greater than or equal to 2.

Defaults to 4.

There is no upper boundary for the number of rows. However, the calculation whether a board is solvable fails for big boards. It is safe for boards with a maximum of approx. 86 pieces (rows*cols).


`cols`
------

Specifies the number of columns of the puzzle.

Expects any integer value greater than or equal to 2.

Defaults to 4.

There is no upper boundary for the number of columns. However, the calculation whether a board is solvable fails for big boards. It is safe for boards with a maximum of approx. 86 pieces (rows*cols).


`hole`
------

Specifies the number of the puzzle piece that is replaced with the hole.

Expects any integer value between 1 (top left) and `rows*cols` (bottom right).

Defaults to `rows*cols`.

The `hole` option is ignored when a `board` is specified.


`initialHole`
-------------

Specifies the initial position of the hole on a shuffled board.

Expects any integer value between 1 (top left) and `rows*cols` (bottom right).

Defaults to a random position.

The `intiialHole` option is ignored when a `board` is specified or the `shuffle` option is specified with a different value than `true`.


`board`
-------

Specifies the initial, shuffled board layout. Implicitly defines the `hole` and the `initialHole` position also.

Expects an array of integers denoting each puzzle piece from top left to bottom right (see below).

Defaults to a shuffled board.

There's no need to specify `rows` or `cols` when the board is square.

When `board` is specified, the following options are ignored:

* `hole`
* `initialHole`
* `solvable`
* `shuffle`

### Setup a board

Board setup is best described based on the solved board. A solved board is a board where
* all numbers from 1 to `rows*cols` are in sequential order and
* any one number is replaced with the special value `0` representing the hole

A shuffled board contains all the numbers of a solved board in random order. Keep in mind that only every other random board layout is solvable!

That way, one can define both the `hole` and the `initialHole` position where

* `hole` is the number that is replaced with `0`
* `initialHole` is the position of that `0` on the shuffled board

#### Examples

* A 2x2 board that is not yet solved (0 replaced for 4, numbers not in sequential order):

		board: [1,2,0,3]
<!-- separate code blocks -->
		+---+---+
		| 1 | 2 |
		+---+---+
		|   | 3 |
		+---+---+

* A 2x2 board that is already solved (0 replaced for 4, numbers in sequential order):

		board: [1,2,3,0]
<!-- separate code blocks -->
		+---+---+
		| 1 | 2 |
		+---+---+
		| 3 |   |
		+---+---+

* A 2x2 board that is already solved (0 replaced for 3, numbers in sequential order):

		board: [1,2,0,4]
<!-- separate code blocks -->
		+---+---+
		| 1 | 2 |
		+---+---+
		|   | 4 |
		+---+---+

* A 2x2 board that is not yet solved (0 replaced for 3, numbers not in sequential order):

		board: [1,2,4,0]
<!-- separate code blocks -->
		+---+---+
		| 1 | 2 |
		+---+---+
		| 4 |   |
		+---+---+


`solvable`
----------

Specifies whether a shuffled board must be solvable or not (as only every other random board layout is solvable).

Expects either `true` or `false`. Any other value is interpreted as 'random' meaning that a shuffled board might or might not be solvable.

Defaults to `true`.

The `solvable` option is ignored when a `board` is specified.


`shuffle`
---------

Specifies whether the board is immediately shuffled or not. If set to `false`, the game must be explicitly started by calling `shuffle()`.

Expects either `true`, `false` or any positive integer value. Integer values are interpreted as the number of random moves away from the solved board (meaning that the puzzle can be solved with at most the specified number of moves). 

Note that there is a difference between the values `0` and `false`. While `shuffle: 0` starts a game that is immediately solved, `shuffle: false` does not start the game before explicitly calling `shuffle()`.

Defaults to `true`.

When the `shuffle` option is specified with a different value than `true` the `initialHole` option is ignored.

The `shuffle` option is ignored when a `board` is specified.



Methods
=======

`shuffle(<movesAway>)`
----------------------

Starts or restarts the game with a freshly shuffled board.

If the puzzle was initialized with the `shuffle` option set to `false`, the game must be explicitly started by calling this method.

When called without an argument, a random board layout is shuffled. When called with a positive integer value, this value is interpreted as the number of random moves away from the solved board (meaning that the puzzle can be solved with at most the specified number of moves). Calling `shuffle(0)` starts a game that is immediately solved.

`shuffle()` can be called at any time during a game. When called, the current game state is lost.

		puzzle.shuffle()
		puzzle.shuffle(4)

Fires a `shuffle` and also a `reset` event.


`reset()`
---------

Resets all game variables to their initial state. While `shuffle()` always starts with freshly shuffled board, `reset()` restores the initial board layout before the first move was performed.

`reset()` can be called at any time during a game once the board was shuffled. When called, the current game state is lost.

		puzzle.reset()

Fires a `reset` event.


`isSolvable()`
--------------

Checks if the board is solvable. Note that only every other random board layout can be solved. `isSolvable()` can be used to check if a specified board is solvable.

Returns `true` if the board can be solved.
Returns `false` if the board cannot be solved.

		puzzle.isSolvable()


`isSolved()`
------------

Checks if the current board is solved.

Returns `true` if the board is solved.
Returns `false` if the board is solved.

		puzzle.isSolved()


`getPosition(<arguments>)`
--------------------------

Returns the `position` object for any kind of position value.

A `position` object defines a single position on the board. A position is a slot that that can hold a piece.

The `position` object contains the following properties:

* `index`: 
The one-dimensional index of the position as an integer value between 1 (top left) and `rows*cols` (bottom right).
* `row`: 
The row of the position as an integer value between 1 and `rows`.
* `column`:
The row of the position as an integer value between 1 and `columns`.

`getPosition()` accepts the following arguments:

* `getPosition(<index>)` - one-dimensional index

		puzzle.getPosition(4)

* `getPosition(<row>, <col>)` - row and col as separate arguments

		puzzle.getPosition(2, 1)

* `getPosition([<row>, <col>])` - row and col as array

		puzzle.getPosition([2, 1])

* `getPosition({row: <row>, col: <col>})` - row and col as object

		puzzle.getPosition({row: 2, col: 1})

All examples would return the following `position` object on a 3x3 board:

		{ index: 4, row: 2, col: 1 }


`getPiece(<arguments>)`
-----------------------

Returns the `piece` object of the piece that is currently located at the position specified by any kind of position value.

A `piece` object defines a single piece on the board. A piece is a numbered element that has a position.

The `piece` object contains the following properties:

* `number`: 
The number of the piece as an integer value between 1 and `rows*cols`.
* `position`: 
The position of the piece as a `position` object (see `getPosition()`).

`getPiece()` accepts the same arguments as `getPosition()`:

		puzzle.getPiece(4)
		puzzle.getPiece(2, 1)
		puzzle.getPiece([2, 1])
		puzzle.getPiece({row: 2, col: 1})

All examples would e.g. return the following `piece` object on a 3x3 board:

		{
			number: 8,
			position: { index: 4, row: 2, col: 1 }
		}


`getPieceByNumber(<number>)`
----------------------------

Returns the `piece` object of the piece with the specified number.

See `getPiece()` for a description of the `piece` object.

`getPieceByNumber()` accepts an integer value between 1 and `rows*cols`.

		puzzle.getPieceByNumber(8)

This would e.g. return the following `piece` object on a 3x3 board:

		{
			number: 8,
			position: { index: 4, row: 2, col: 1 }
		}


`getPieceByDirection(<direction>)`
----------------------------------

Returns the `piece` object of the piece that can be moved in the specified direction.
Returns `false` if no piece can be moved in this direction.

See `getPiece()` for a description of the `piece` object.

`getPieceByDirection()` accepts the following direction keywords: `left`, `right`, `up`, `down`

		puzzle.getPieceByDirection('up')

This would e.g. return the following `piece` object on a 3x3 board:

		{
			number: 8,
			position: { index: 4, row: 2, col: 1 }
		}


`canMove(<arguments>)`
----------------------

Checks if the piece can be moved that is currently located at the position specified by any kind of position value.

Returns a `move` object if the piece can be moved.
Returns `false` if the piece cannot be moved.

A `move` object defines a single (potential) move on the board. A move changes the position of a piece by swapping it with the hole.

The `move` object contains the following properties:

* `number`: 
The number of the piece to be moved as an integer value between 1 and `rows*cols`.
* `from`: 
The position of the piece to be moved as a `position` object (see `getPosition()`).
* `to`: 
The position to which the piece is to be moved as a `position` object (see `getPosition()`).
* `direction`:
The direction in which the piece is to be moved. One of `left`, `right`, `up`, `down`.

`canMove()` accepts the same arguments as `getPosition()`:

		puzzle.canMove(4)
		puzzle.canMove(2, 1)
		puzzle.canMove([2, 1])
		puzzle.canMove({row: 2, col: 1})

All examples would e.g. return the following `move` object on a 3x3 board:

		{
			number: 8,
			from: { index: 4, row: 2, col: 1 },
			to: { index: 1, row: 1, col: 1 },
			direction: 'up'
		}



`canMoveByNumber(<number>)`
---------------------------

Checks if the piece with the specified number can be moved.

Returns a `move` object if the piece can be moved.
Returns `false` if the piece cannot be moved.

See `canMove()` for a description of the `move` object.

`canMoveByNumber()` accepts an integer value between 1 and `rows*cols`.

		puzzle.canMoveByNumber(8)

This would e.g. return the following `move` object on a 3x3 board:

		{
			number: 8,
			from: { index: 4, row: 2, col: 1 },
			to: { index: 1, row: 1, col: 1 },
			direction: 'up'
		}



`canMoveByDirection(<direction>)`
---------------------------------

Checks if a piece can be moved in the specified direction.

Returns a `move` object if a piece can be moved in this direction.
Returns `false` if no piece can be moved in this direction.

See `canMove()` for a description of the `move` object.

`canMoveByDirection()` accepts the following direction keywords: `left`, `right`, `up`, `down`

		puzzle.canMoveByDirection('up')

This would e.g. return the following `move` object on a 3x3 board:

		{
			number: 8,
			from: { index: 4, row: 2, col: 1 },
			to: { index: 1, row: 1, col: 1 },
			direction: 'up'
		}


`move(<arguments>)`
-------------------

Moves the piece that is currently located at the position specified by any kind of position value.

Returns a `move` object if the piece can be moved.
Returns `false` if the piece cannot be moved.

A `move` object defines a single move on the board. A move changes the position of a piece by swapping it with the hole.

See `canMove()` for a description of the `move` object. In addition, the `move` object returned by this method contains the following property:

* `index`
The consecutive number of the move in the current game as an integer value.
* `timestamp`: 
The point in time when the move was performed as a JavaScript `Date` object.

`move()` accepts the same arguments as `getPosition()`:

		puzzle.move(4)
		puzzle.move(2, 1)
		puzzle.move([2, 1])
		puzzle.move({row: 2, col: 1})

All examples would e.g. return the following `move` object on a 3x3 board:

		{
			number: 8,
			from: { index: 4, row: 2, col: 1 },
			to: { index: 1, row: 1, col: 1 },
			direction: 'up',
			index: 1,
			timestamp: <date>
		}

Fires a `move` event if the move was successful.


`moveByNumber(<number>)`
------------------------

Moves the piece with the specified number.

Returns a `move` object if the piece can be moved.
Returns `false` if the piece cannot be moved.

See `move()` for a description of the `move` object.

`moveByNumber()` accepts an integer value between 1 and `rows*cols`.

		puzzle.moveByNumber(8)

This would e.g. return the following `move` object on a 3x3 board:

		{
			number: 8,
			from: { index: 4, row: 2, col: 1 },
			to: { index: 1, row: 1, col: 1 },
			direction: 'up',
			index: 1,
			timestamp: <date>
		}

Fires a `move` event if the move was successful.


`moveByDirection(<direction>)`
------------------------------

Moves a piece in the specified direction.

Returns a `move` object if a piece can be moved in this direction.
Returns `false` if no piece can be moved in this direction.

See `move()` for a description of the `move` object.

`moveByDirection()` accepts the following direction keywords: `left`, `right`, `up`, `down`

		puzzle.moveByDirection('up')

This would e.g. return the following `move` object on a 3x3 board:

		{
			number: 8,
			from: { index: 4, row: 2, col: 1 },
			to: { index: 1, row: 1, col: 1 },
			direction: 'up',
			index: 1,
			timestamp: <date>
		}

Fires a `move` event if the move was successful.


`moveRandomly()`
----------------

Moves a random piece.

Returns a `move` object.

See `move()` for a description of the `move` object.

		puzzle.moveRandomly()

This would e.g. return the following `move` object on a 3x3 board:

		{
			number: 8,
			from: { index: 4, row: 2, col: 1 },
			to: { index: 1, row: 1, col: 1 },
			direction: 'up',
			index: 1,
			timestamp: <date>
		}

Fires a `move` event if the move was successful.


`canUndo()`
-----------

Checks if there is a move that can be undone.

Returns `true` if a move can be undone.
Returns `false` if no move can be undone.

		puzzle.canUndo()


`undo()`
--------

Undoes the previous move.

Returns the `move` object of the move that was undone.
Returns `false` if no move could be undone.

See `move()` for a description of the `move` object.

		puzzle.undo()

This would e.g. return the following `move` object on a 3x3 board:

		{
			number: 8,
			from: { index: 4, row: 2, col: 1 },
			to: { index: 1, row: 1, col: 1 },
			direction: 'up',
			index: 1,
			timestamp: <date>
		}

Fires an `undo` event.


`canRedo()`
-----------

Checks if there is a move that can be redone.

Returns `true` if a move can be redone.
Returns `false` if no move can be redone.

		puzzle.canRedo()


`redo()`
--------

Redoes a previously undone move.

Returns the `move` object of the move that was redone.
Returns `false` if no move could be redone.

See `move()` for a description of the `move` object.

		puzzle.redo()

This would e.g. return the following `move` object on a 3x3 board:

		{
			number: 8,
			from: { index: 4, row: 2, col: 1 },
			to: { index: 1, row: 1, col: 1 },
			direction: 'up',
			index: 1,
			timestamp: <date>
		}

Fires a `redo` event.



Events
======

Events can be used to get notified about changes of the puzzle. All events are fired on the `SliderPuzzle` object and are passed the internal jQuery event object and optional data as parameters. Events can be bound using the `on()` method.

		var puzzle = new SliderPuzzle();
		puzzle.on(<eventName>, function(event, data) {
			console.log(event.type + ' fired with data: ' + data);
		});

To unbind events, use the `off` method:

		puzzle.off(<eventName>);


`move`
------

Fires when a move was successfully performed. The event is passed the `move` object as the second parameter.

See `move()` for a description of the `move` object.

	puzzle.on('move', function(event, move) {
		console.log('piece ' + move.number + ' was moved ' + move.direction);
	});


`undo`
------

Fires when a previous move was undone. The event is passed the `move` object as the second parameter.

See `move()` for a description of the `move` object.

	puzzle.on('undo', function(event, move) {
		console.log('move ' + move.index + ' undone');
	});


`redo`
------

Fires when a previously undone move was redone. The event is passed the `move` object as the second parameter.

See `move()` for a description of the `move` object.

	puzzle.on('redo', function(event, move) {
		console.log('move ' + move.index + ' redone');
	});


`reset`
-------

Fires when the game was reset. `reset` is also fired when the puzzle is `shuffle()`d.

		puzzle.on('reset', function() {
			console.log('puzzle was reset');
		});



Internals
=========

Options
-------

The options hash contains properties that do not change once a game is initialized:

* `this.options.rows`
* `this.options.cols`
* `this.options.board`
* `this.options.hole`
* `this.options.initialHole`

Internal Properties
-------------------

These properties are pseudo-private and start with an underscore. They may change during the game and represent the current game state.

* `this._boardSize`  
Number of pieces of the board.
* `this._initialBoard`  
Copy of a specified or shuffled board to be able to reset.
* `this._sortedBoard`  
  The board that contains all numbers form `0` (hole) to `rows*cols` in sequential order with any one number missing (the one that is replaced by the hole).
* `this._solvedBoard`  
  The board in its solved state. Contains all numbers form `1` to `rows*cols` in sequential order with any one number replaced with the special value `0` representing the hole.
* `this._initialHole`  
  The initial position of the hole in the shuffled board. Either taken from the options or set during shuffle.
* `this._board`  
  The current board. Changes with each move.
* `this._hole`  
  The current hole position. Changes with each move.
