/**
 * Application Router
 */
var Router = {
	settings: {}
};

/**
 * Adds Observer support
 * Observer pattern.
 * @returns {object} - new observable instance
 */
Router.observer = function() {
	var obs = {},
		callbacks = {},
		id = 0;

  /**
   * Listen to the given space separated events, execute the callback
   * @param events
   * @param fn
   * @returns {{}}
   */
	obs.on = function(events, fn) {
		if (typeof fn == 'function') {
			fn.id = typeof fn.id == 'undefined' ? id++ : fn.id;

			events.replace(/\S+/g, function(name, pos) {
				(callbacks[name] = callbacks[name] || []).push(fn);
				fn.typed = pos > 0;
			});
		}

		return obs;
	};

  /**
   * Removes the given callback from the list of events
   * @param events
   * @param fn
   * @returns {{}}
   */
	obs.off = function(events, fn) {
		if (events == '*') {
			callbacks = {};
		} else {
			events.replace(/\S+/g, function(name) {
				if (fn) {
					var arr = callbacks[name];
					for (var i = 0, cb; (cb = arr && arr[i]); ++i) {
						if (cb.id == fn.id) {
							arr.splice(i, 1);
							i--;
						}
					}
				} else {
					callbacks[name] = [];
				}
			});
		}

		return obs;
	};

  /**
   * Execute all callback functions that listen to the given event
   * @param name
   * @returns {{}}
   */
	obs.trigger = function(name) {
    var args = [].slice.call(arguments, 1),
      fns = callbacks[name] || [];

    for (var i = 0, fn; (fn = fns[i]); ++i) {
      if (!fn.busy) {
        fn.busy = 1;
        fn.apply(obs, fn.typed ? [name].concat(args) : args);

        if (fns[i] !== fn) {
          i--;
        }

        fn.busy = 0;
      }
    }

    if (callbacks.all && name != 'all') {
      obs.trigger.apply(obs, ['all', name].concat(args));
    }

    return obs;
  };

  return obs;
};

/**
 *  Router utils
 */
(function(router, event, window) {

  // browser only
  if (!window) {
    return;
  }

  var loc = window.location,
    fns = router.observer(),
    win = window,
    started = false,
    current;

  function hash() {
    return loc.href.split('#')[1] || '';
  }

  function parser(path) {
    return path.split('/');
  }

  function emit(path) {
    if (path.type) {
      path = hash();
    }

    if (path != current) {
      fns.trigger.apply(null, ['H'].concat(parser(path)));
      current = path;
    }
  }

  /**
   * Changes the browser URL and notifies all the listeners
   * Usage: Router.route(to);
   * @type {Function}
   */
  var r = router.route = function(arg) {
    if (arg[0]) {
      loc.hash = arg;
      emit(arg);
    } else {
      fns.on('H', arg);
    }
  };

  /**
   * Study the current hash
   * @param fn
   */
  r.study = function(fn) {
    fn.apply(null, parser(hash()));
  };

  /**
   * Start listening the window hash changes
   * Usage: Router.route.start();
   */
  r.start = function() {
    if (started) {
      return;
    }

    if (win.addEventListener) {
      win.addEventListener(event, emit, false);
    } else {
      win.attachEvent('on' + event, emit);
    }

    started = true;
  };

  /**
   * Remove the hash changes listeners
   * Usage: Router.route.stop();
   */
  r.stop = function() {
    if (!started) {
      return;
    }

    if (win.removeEventListener) {
      win.removeEventListener(event, emit, false);
    } else {
      win.detachEvent('on' + event, emit);
    }

    fns.off('*');
    started = false;
  };

})(Router, 'hashchange', window);
