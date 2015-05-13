/**
 * Chat module
 */
Core.register('chat', function(sandbox) {
  var chat, socket, chatBody, user;

  var _private = {
    createBubble: function(data) {
      return sandbox.createElement('p', {
        'children': [ sandbox.createElement('h6', { text: data['user'] }) ],
        'class': data['className'],
        'text': data['message']
      });
    }
  };

  return {

    construct: function() {
      //socket = io.connect('http://185.13.90.140:8081');
      chat = sandbox.query('#chat')[0];
      chatBody = sandbox.find('.chat-messages')[0];
      user = 'Me';

      sandbox.subscribe('new-message', this.addNewMessage);
      sandbox.subscribe('new-name', this.changeName);

      //this.connect();
    },

    destruct: function() {
      chat = socket = chatBody = null;
    },

    show: function() {
      sandbox.addClass(chat, 'active');
      sandbox.publish('module-shown', 'chat');
    },

    hide: function() {
      sandbox.removeClass(chat, 'active');
      sandbox.publish('module-hidden', 'chat');
    },

    addNewMessage: function(message) {
      var data = {};

      data.className = 'bubble pull-right';
      data.user = user;
      data.message = message;

      chatBody.appendChild(_private.createBubble(data));

      socket.emit('message', { user: user, message: message });
    },

    connect: function() {
      socket.on('message', function(data) {
        data.className = 'bubble pull-left';
        chatBody.appendChild(_private.createBubble(data));
      });
    },

    changeName: function(name) {
      user = name;
    }
  };
});