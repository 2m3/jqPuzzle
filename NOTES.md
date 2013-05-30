Options
=======

`rows`
------

Specifies the number of rows of the puzzle.

Expects any integer value greater than or equal to 2.

Defaults to `4`.


`cols`
------

Specifies the number of columns of the puzzle.

Expects any integer value greater than or equal to 2.

Defaults to `4`.


`hole`
------

Specifies the number of the puzzle piece that is replaced with the hole.

Expects any integer value between 1 and `rows*cols`.

Defaults to `rows*cols`, that is, the bottom right position.

The `hole` option is ignored when a `board` is specified.


`initialHole`
-------------

Specifies the initial position of the hole in a shuffled puzzle.

Expects any integer value between 1 and `rows*cols`.

Defaults to a random position.

The `intiialHole` option is ignored when a `board` is specified.


`board`
-------

Specifies the initial board layout. Implicitly defines the solved board and the hole positions also.

Expects an array of integers denoting each puzzle piece from top left to bottom right (see below).

Defaults to a shuffled board.

When `board` is specified, the following options are ignored:

* `hole`
* `initialHole`
* `solvable`
* `shuffle`

### Setup a board

A solved board is a board where
* all numbers from 1 to `rows*cols` are in sequential order and
* any one number is replaced with the special value `0` representing the hole

An initial board contains all the numbers of a solved board in random order. Keep in mind that not every random board is solvable!

That way, one can define both the initial and solved hole positions where
- the solved hole position is (the position of) the number that is replaced with 0 and
- the initial hole position is the position of the 0 in the initial board

A board that is not yet solved (0 replaced for 4, numbers not in sequential order):

	1 2
	0 3

A board that is already solved (0 replaced for 4, numbers in sequential order):

	1 2
	3 0

A board that is already solved (0 replaced for 3, numbers in sequential order):

	1 2
	0 4

A board that is not yet solved (0 replaced for 3, numbers not in sequential order):

	1 2
	4 0


`solvable`
----------

Specifies whether a shuffled board must be solvable or not (as not any random order is solvable).

Expects either `true` or `false`. Any other value is interpreted as 'random' meaning that a shuffled board might or might not be solvable.

Defaults to `true`.

The `solvable` option is ignored when a `board` is specified.


`shuffle`
---------

Specifies whether the board should be immediately shuffled during initialization. When an integer is provided, the initial board will be the specified number of moves away from the solved board (meaning that the puzzle can be solved within the specified number of moves max).

Expects either `true` or `false`. Any integer value is interpreted as the a.

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
