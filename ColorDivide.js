(function () {
	var options = {
		splitter: 'char'
	}
	//helper
	var getRandomColor = function(){
	  return 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)';
	}

	function injector(t, splitter) {
		var text = t.textContent,
			//a = text.split(splitter),
			a,
			after,
			inject = '';
		if(splitter === 'char') {
			a = text.split('');
			after = '';
		}
		else if (splitter === 'word') {
			a = text.split(' ');
			after = ' ';
		}
		else if (splitter === 'line') {
			var r = t.innerHTML;
			var e = document.createElement('div');
			r = r.replace(/<br>/ig, 'eefec303079ad17405c889e092e105b0');
			e.innerHTML = r;
			text = e.textContent;
			a = text.split('eefec303079ad17405c889e092e105b0');
			after = '';
		}


		if (a.length) {
			for(var i = 0; i < a.length; i++) {
				var font_color = getRandomColor();
				inject += '<span style="color:'+font_color+'">' + a[i] + '</span>' + after;
			}
			t.setAttribute('aria-label', text);
			t.innerHTML = inject;
		}
	}
	//API
	var api = {
		config: function (opts) {
			if(!opts) return options;
			for(var key in opts) {
				options[key] = opts[key];
			}
			return this;
		},

		listen: function listen(elem) {
			if (typeof elem === 'string') {
				var elems = document.querySelectorAll(elem),
					i = elems.length;
					while (i--) {
						listen(elems[i]);
					}
					return
			}
			injector(elem, options.splitter);

			return this;
		}
	}
	this.ColorDivide = api;
})();