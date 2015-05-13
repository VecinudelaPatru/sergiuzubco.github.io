/**
 * Segmented control module
 */
Core.register('segmented-control', function(sandbox) {
  var controls,
    modulesMap = {
      chat: 0,
      gallery: 1,
      settings: 2
    };

  return {
    construct: function() {
      controls = sandbox.find('a');

      sandbox.subscribe('module-shown', this.activateControl);
      sandbox.subscribe('module-hidden', this.deactivateControl);
    },

    destruct: function() {
      controls = null;
    },

    activateControl: function(module) {
      sandbox.addClass(controls[modulesMap[module]], 'active');
    },

    deactivateControl: function(module) {
      sandbox.removeClass(controls[modulesMap[module]], 'active');
    }
  };
});