Notes
=====

Setup a board
-------------

A solved board is a board where
- all numbers from 1 to (rows*cols) are in sequential order and
- any one number is replaced with the special number 0 representing the hole

By default, the number (rows*cols) is used for the hole and equals the bottom right position.

An initial board contains all the numbers of a solved board in random order. Keep in mind that not every random board is solvable!

That way, one can define both the initial and solved hole positions where
- the solved hole position is the position of the number that is replaced with 0 in the solved board and
  (the number that is replaced with 0)
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
