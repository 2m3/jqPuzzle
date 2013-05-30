// jasmine custom matchers

// matches if the actual equals at least one item from the provided array
jasmine.Matchers.prototype.toEqualAny = function(expected) {
	for (var i = 0; i < expected.length; i++) {
		if (this.env.equals_(this.actual, expected[i])) {
			return true;
		}
	}
	return false;
};
