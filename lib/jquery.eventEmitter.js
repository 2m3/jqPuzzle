(function($) {
	function makeProxy(name) {
		return function() {
			(this._JQ || (this._JQ = $(this)))[name].apply(this._JQ, arguments);
		};
	}

	$.eventEmitter = {
		trigger: makeProxy("triggerHandler"),
		on: makeProxy("on"),
		off: makeProxy("off")
	};
}(jQuery));
