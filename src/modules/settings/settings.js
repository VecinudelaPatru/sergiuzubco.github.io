/**
 * Settings module
 */
Core.register('settings', function(sandbox) {
  var settings, wSlider, hSlider, username, button, wSliderText, hSliderText;

  return {

    construct: function() {
      settings = sandbox.query('#settings');
      wSlider = sandbox.find('#wslider')[0];
      hSlider = sandbox.find('#hslider')[0];
      wSliderText = sandbox.find('#wslidertext')[0];
      hSliderText = sandbox.find('#hslidertext')[0];
      username = sandbox.find('#chatname')[0];
      button = sandbox.find('#chatnamebtn')[0];

      sandbox.addEvent(wSlider, 'change', this.changeWidth);
      sandbox.addEvent(hSlider, 'change', this.changeHeight);
      sandbox.addEvent(button, 'click', this.setChatName);
    },

    destruct: function() {
      settings = wSlider = hSlider = wSliderText = hSliderText = null;

      sandbox.removeEvent(wSlider, 'click', this.changeWidth);
      sandbox.removeEvent(hSlider, 'click', this.changeHeight);
    },

    show: function() {
      sandbox.addClass(settings, 'active');
      sandbox.publish('module-shown', 'settings');
    },

    hide: function() {
      sandbox.removeClass(settings, 'active');
      sandbox.publish('module-hidden', 'settings');
    },

    changeWidth: function(event) {
      var value = event.currentTarget.value;

      sandbox.setText(wSliderText, '&nbsp;' + value + '%');
      sandbox.publish('new-width', value);
    },

    changeHeight: function(event) {
      var value = event.currentTarget.value;

      sandbox.setText(hSliderText, '&nbsp;' + value + 'px');
      sandbox.publish('new-height', value);
    },

    setChatName: function() {
      var name = username.value;

      if (name) {
        sandbox.publish('new-name', name);
        username.value = '';
      }
    }
  };
});