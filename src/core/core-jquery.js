/**
 * Application core
 * Start / stop / publish / subscribe / utils / DOM / events
 */
var Core = (function($) {

  var modules = {},
    messages = {};

  return {

    /**
     *
     * Register a module
     * @param {string} mId - module ID
     * @param {function} creator
     */
    register: function(mId, creator) {
      if (typeof mId === 'string' && typeof creator === 'function') {
        modules[mId] = { create: creator, instance: null };
      }
    },

    /**
     * Start a module
     * @param {string} mId - module ID
     */
    start: function(mId) {
      var module = modules[mId];

      if (module) {
        module.instance = module.create(Sandbox.create(this, mId));
        module.instance.construct();
      }
    },

    /**
     * Stop a module
     * @param {string} mId
     */
    stop: function(mId) {
      var module = modules[mId];

      if (module && module.instance) {
        module.instance.destruct();
        module.instance = null;
      }
    },

    /**
     * Start all modules
     */
    startAll: function() {
      for (var mId in modules) {
        if (modules.hasOwnProperty(mId)) {
          this.start(mId);
        }
      }
    },

    /**
     * Display module
     * @param mId
     */
    showModule: function(mId) {
      var module = modules[mId];

      if (module) {
        module.instance.show();
      }
    },

    /**
     * Hide a module
     * @param mId
     */
    hideModule: function(mId) {
      var module = modules[mId];

      if (module) {
        module.instance.hide();
      }
    },

    /**
     * Stop all modules
     */
    stopAll: function() {
      for (var mId in modules) {
        if (modules.hasOwnProperty(mId)) {
          this.stop(mId);
        }
      }
    },

    /**
     * Publish
     * @param message
     * @param args
     */
    publish: function(message, args) {
      try {
        for (var i = 0; i < messages[message].length; i++) {
          if (typeof args === 'undefined') {
            args = [];
          }

          if (!(args instanceof Array)) {
            args = [args];
          }

          messages[message][i].apply(this, args);
        }
      } catch (error) {}
    },

    /**
     * Subscribe
     * @param message
     * @param callback
     * @returns {*[]}
     */
    subscribe: function(message, callback) {
      if (!messages[message]) {
        messages[message] = [];
      }

      messages[message].push(callback);

      return [message, callback];
    },

    /**
     * Unsubscribe
     * @param handle
     */
    //todo @sergiuzubco finish the implementation
    unsubscribe: function(handle) {
      var temp = handle[0];

      base.each(messages[temp], function(idx) {
        if (handle[1] == this) {
          messages[temp].splice(idx, 1);
        }
      });
    },

    dom: {
      /**
       * Query DOM
       * @param {string} selector
       * @param {string} context
       */
      query: function(selector, context) {
        var ret = {},
          that = this,
          elements;

        if (context && context.find) {
          elements = context.find(selector);
        } else {
          elements = $(selector);
        }

        ret = elements.get();
        ret.length = elements.length;
        ret.query = function(sel) {
          return that.query(sel, elements);
        };

        return ret;
      },

      /**
       * Attaches an event handler to an element
       * @param element
       * @param event
       * @param fn
       */
      on: function(element, event, fn) {
        if (element && event) {
          if (typeof event === 'function') {
            fn = event;
            event = 'click';
          }
          $(element).on(event, fn);
        }
      },

      /**
       * Removes an event handler from an element
       * @param element
       * @param event
       * @param fn
       */
      off: function(element, event, fn) {
        if (element && event) {
          if (typeof event === 'function') {
            fn = event;
            event = 'click';
          }
          $(element).off(event, fn);
        }
      },

      /**
       * Create new DOM element
       * @param element
       * @returns {Element}
       */
      createElement: function(element) {
        return document.createElement(element);
      },

      /**
       * Apply attributes to a DOM element
       * @param el
       * @param attributes
       */
      attrs: function(el, attributes) {
        $(el).attr(attributes);
      },

      /**
       * Add new CSS class to an element
       * @param el
       * @param className
       */
      addClass: function(el, className) {
        $(el).addClass(className);
      },

      /**
       * Remove the given CSS class from an element
       * @param el
       * @param className
       */
      removeClass: function(el, className) {
        $(el).removeClass(className);
      },

      /**
       * Set inner HTML
       * @param el
       * @param text
       */
      setText: function(el, text) {
        $(el).html(text);
      }
    }
  };
})(jQuery);