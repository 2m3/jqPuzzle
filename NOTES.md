Options
=======

`rows`
------

Specifies the number of rows of the puzzle.

Expects any integer value greater than or equal to 2.

Defaults to 4.


`cols`
------

Specifies the number of columns of the puzzle.

Expects any integer value greater than or equal to 2.

Defaults to 4.


`hole`
------

Specifies the number of the puzzle piece that is replaced with the hole.

Expects any integer value between 1 (top left) and `rows*cols` (bottom right).

Defaults to `rows*cols`.

The `hole` option is ignored when a `board` is specified.


`initialHole`
-------------

Specifies the initial position of the hole in a shuffled puzzle.

Expects any integer value between 1 (top left) and `rows*cols` (bottom right).

Defaults to a random position.

The `intiialHole` option is ignored when a `board` is specified.


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

Expects either `true` or `false`. Any integer value is interpreted as the number of random moves away from the solved board (meaning that the puzzle can be solved with at most the specified number of moves).

Defaults to `true`.

The `shuffle` option is ignored when a `board` is specified.



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

Methods
-------

* `shuffle()`
* `restart()`
* `isSolvable()`
* `isSolved()`

Internal Properties
-------------------

These properties are pseudo-private and start with an underscore. They may change during the game and represent the current game state.

* `this._boardSize`  
Number of pieces of the board.
* `this._initialBoard`  
Copy of a specified or shuffled board to be able to reset.
* `this._sortedBoard`  
  A board that contains all numbers form `0` (hole) to `rows*cols-1` in sequential order.
* `this._solvedBoard`  
  The board in its solved state.
* `this._initialHole`  
  The initial position of the hole in a shuffled board. Either taken from the options or set during shuffle.
* `this._board`  
  The current board. Changes with each move.
* `this._hole`  
  The current hole position. Changes with each move.
