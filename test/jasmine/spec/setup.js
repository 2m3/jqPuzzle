var puzzle;

// 0 replaced for 4, unsolvable
var board2x2 = [3,	2,
				1,	0];

// 0 replaced for 9, solved
var board3x3 = [1,	2,	3,
				4,	5,	6,
				7,	8,	0];

// 0 replaced for 16, different initial and solved hole positions
var board4x4 = [2,	4,	6,	8,
				10,	12,	14,	0,
				1,	3,	5,	7,
				9,	11,	13,	15];

// 0 replaced for 10, different initial and solved hole positions
var board2x5 = [0,	9,
				8,	7,
				6,	5,
				4,	3,
				2,	1];

var ROW_INVALID       = 'invalid row';
var COL_INVALID       = 'invalid col';
var INDEX_INVALID     = 'invalid index';
var NUMBER_INVALID    = 'invalid number';
var DIRECTION_INVALID = 'invalid direction';


// positions on a 3x3 board
var positions3x3 = {
	topLeft:      { index: 1, row: 1, col: 1 },
	topMiddle:    { index: 2, row: 1, col: 2 },
	topRight:     { index: 3, row: 1, col: 3 },
	middleLeft:   { index: 4, row: 2, col: 1 },
	middleMiddle: { index: 5, row: 2, col: 2 },
	middleRight:  { index: 6, row: 2, col: 3 },
	bottomLeft:   { index: 7, row: 3, col: 1 },
	bottomMiddle: { index: 8, row: 3, col: 2 },
	bottomRight:  { index: 9, row: 3, col: 3 }
};

// positions on a 3x3 board
var pieces3x3 = {
	topLeft:      { number: 1, position: positions3x3.topLeft      },
	topMiddle:    { number: 2, position: positions3x3.topMiddle    },
	topRight:     { number: 3, position: positions3x3.topRight     },
	middleLeft:   { number: 4, position: positions3x3.middleLeft   },
	middleMiddle: { number: 5, position: positions3x3.middleMiddle },
	middleRight:  { number: 6, position: positions3x3.middleRight  },
	bottomLeft:   { number: 7, position: positions3x3.bottomLeft   },
	bottomMiddle: { number: 8, position: positions3x3.bottomMiddle },
	bottomRight:  { number: 0, position: positions3x3.bottomRight  }
};
