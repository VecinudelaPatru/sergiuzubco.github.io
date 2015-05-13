/**
 * Chat form module
 */

Core.register('chat-form', function(sandbox) {
  var input, button, chat;

  var _private = {
    getInputValue: function() {
      return input.value;
    },

    setInputValue: function(value) {
      input.value = value;
    }
  };

  return {

    construct: function() {
      chat = sandbox.query('#chat-form');
      input = sandbox.find('input')[0];
      button = sandbox.find('button')[0];

      sandbox.addEvent(button, 'click', this.sendMessage);
    },

    destruct: function() {
      input = button = chat = null;

      sandbox.removeEvent(button, 'click', this.sendMessage);
    },

    show: function() {
      sandbox.removeClass(chat, 'hidden');
    },

    hide: function() {
      sandbox.addClass(chat, 'hidden');
    },

    sendMessage: function() {
      var message = _private.getInputValue();

      if (message) {
        sandbox.publish('new-message', message);
        _private.setInputValue('');
      }
    }
  };
});