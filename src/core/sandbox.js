/**
 * Application Sandbox
 */
var Sandbox = {

  /**
   * Sandbox creator
   * @param core
   * @param module_selector
   */
  create: function(core, module_selector) {

    var container = core.dom.query('#' + module_selector);

    return {
      /**
       * Query DOM
       * @param selector
       */
      query: function(selector) {
        return core.dom.query(selector);
      },

      /**
       * Find a DOM element
       * @param selector
       * @returns {*}
       */
      find: function(selector) {
        return container.query(selector);
      },

      /**
       * Attaches an event handler to an element
       * @param element
       * @param type
       * @param fn
       */
      addEvent: function(element, type, fn) {
        core.dom.on(element, type, fn);
      },

      /**
       * Removes an event handler for an element
       * @param element
       * @param type
       * @param fn
       */
      removeEvent: function(element, type, fn) {
        core.dom.off(element, type, fn);
      },

      /**
       * Publish
       * @param message
       * @param data
       */
      publish: function(message, data) {
        core.publish(message, data);
      },

      /**
       * Subscribe
       * @param message
       * @param callback
       */
      subscribe: function(message, callback) {
        core.subscribe(message, callback);
      },

      /**
       * Unsubscribe
       * @param handle
       */
      unsubscribe: function(handle) {
        core.unsubscribe(handle);
      },

      /**
       * Creates a new DOM element
       * @param el
       * @param config
       */
      createElement: function(el, config) {
        var i, child;

        el = core.dom.createElement(el);

        if (config) {
          if (config.children) {
            i = 0;
            while (child = config.children[i]) {
              el.appendChild(child);
              i++;
            }
            delete config.children;
          }

          if (config.text) {
            el.appendChild(document.createTextNode(config.text));
            delete config.text;
          }

          core.dom.attrs(el, config);
        }

        return el;
      },

      /**
       * Set attributes
       * @param el
       * @param config
       */
      attrs: function(el, config) {
        core.dom.attrs(el, config);
      },

      /**
       * Add new CSS class to an element
       * @param el
       * @param className
       */
      addClass: function(el, className) {
        core.dom.addClass(el, className);
      },

      /**
       * Remove the given CSS class from an element
       * @param el
       * @param className
       */
      removeClass: function(el, className) {
        core.dom.removeClass(el, className);
      },

      /**
       * Set inner HTML
       * @param el
       * @param text
       */
      setText: function(el, text) {
        core.dom.setText(el, text);
      }
    };
  }
};