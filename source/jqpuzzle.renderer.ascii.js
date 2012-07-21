AsciiRenderer = {
	render: function(board, rows, columns) {
		var SYMBOL = {
			HORIZONTAL: '-',
			VERTICAL: '|',
			CROSS: '+',
			NEWLINE: "\n"
		};

		// simple left-padding function
		var pad = function(value, length, character) {
			// make sure we have a string
			value = '' + value;

			// add missing characters
			while (value.length < length) {
				value = character + value;
			}

			return value;
		};

		var i, j;
		var string = '';
		var columnCount = 0;
		var longestLabelLength = ('' + ((rows * columns) - 1)).length;

		// build seperator row

		// start with a cross
		var seperatorRow = SYMBOL.CROSS;

		for (i = 0; i < columns; i++) {
			// add a space left and right of the label
			var columnWidth = longestLabelLength + 2;

			// add symbol for a single column
			while (columnWidth > 0) {
				seperatorRow += SYMBOL.HORIZONTAL;
				columnWidth--;
			}
			seperatorRow += SYMBOL.CROSS;
		}
		seperatorRow += SYMBOL.NEWLINE;

		// build full board

		// start with a seperator row
		string = SYMBOL.NEWLINE + seperatorRow;

		for (i = 0; i < rows; i++) {
			// start item row with a vertical seperator
			string += SYMBOL.VERTICAL;

			for (j = 0; j < columns; j++) {
				// add single item and translate 0 into empty string
				var item =  board[i * columns + j] || '';
				string += ' ' + pad(item, longestLabelLength, ' ') + ' ' + SYMBOL.VERTICAL;
			}

			// break and add seperator row
			string += SYMBOL.NEWLINE + seperatorRow;
		}

		return string;
	}
};
