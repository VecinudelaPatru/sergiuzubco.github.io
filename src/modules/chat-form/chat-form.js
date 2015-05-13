/**
 * Chat form module
 */

Core.register('chat-form', function(sandbox) {
  var input, button, chat;

  /**
   * Update the message box / get user entered message
   * @type {{getInputValue: Function, setInputValue: Function}}
   * @private
   */
  var _private = {
    getInputValue: function() {
      return input.value;
    },

    setInputValue: function(value) {
      input.value = value;
    }
  };

  return {
    /**
     * Constructor
     */
    construct: function() {
      chat = sandbox.query('#chat-form');
      input = sandbox.find('input')[0];
      button = sandbox.find('button')[0];

      sandbox.addEvent(button, 'click', this.sendMessage);
    },

    /**
     * Destructor
     */
    destruct: function() {
      input = button = chat = null;

      sandbox.removeEvent(button, 'click', this.sendMessage);
    },

    /**
     * Show module
     */
    show: function() {
      sandbox.removeClass(chat, 'hidden');
    },

    /**
     * Hide module
     */
    hide: function() {
      sandbox.addClass(chat, 'hidden');
    },

    /**
     * Publish the message
     */
    sendMessage: function() {
      var message = _private.getInputValue();

      if (message) {
        sandbox.publish('new-message', message);
        _private.setInputValue('');
      }
    }
  };
});