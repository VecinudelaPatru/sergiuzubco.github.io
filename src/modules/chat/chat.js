/**
 * Chat module
 */
Core.register('chat', function(sandbox) {
  var chat, socket, chatBody, user;

  /**
   * Create new chat bubble
   * @type {{createBubble: Function}}
   * @private
   */
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
    /**
     * Constructor
     */
    construct: function() {
      //socket = io.connect('http://185.13.90.140:8081');
      chat = sandbox.query('#chat')[0];
      chatBody = sandbox.find('.chat-messages')[0];
      user = 'Me';

      sandbox.subscribe('new-message', this.addNewMessage);
      sandbox.subscribe('new-name', this.changeName);

      //this.connect();
    },

    /**
     * Destructor
     */
    destruct: function() {
      chat = socket = chatBody = null;
    },

    /**
     * Show module
     */
    show: function() {
      sandbox.addClass(chat, 'active');
      sandbox.publish('module-shown', 'chat');
    },

    /**
     * Hide module
     */
    hide: function() {
      sandbox.removeClass(chat, 'active');
      sandbox.publish('module-hidden', 'chat');
    },

    /**
     * Emit new message and display it
     * @param message
     */
    addNewMessage: function(message) {
      var data = {};

      data.className = 'bubble pull-right';
      data.user = user;
      data.message = message;

      chatBody.appendChild(_private.createBubble(data));

      socket.emit('message', { user: user, message: message });
    },

    /**
     * Connect to socket.io server
     */
    connect: function() {
      socket.on('message', function(data) {
        data.className = 'bubble pull-left';
        chatBody.appendChild(_private.createBubble(data));
      });
    },

    /**
     * Change chat name
     * @param name
     */
    changeName: function(name) {
      user = name;
    }
  };
});