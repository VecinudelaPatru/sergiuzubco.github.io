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
    /**
     * Constructor
     */
    construct: function() {
      controls = sandbox.find('a');

      sandbox.subscribe('module-shown', this.activateControl);
      sandbox.subscribe('module-hidden', this.deactivateControl);
    },

    /**
     * Destructor
     */
    destruct: function() {
      controls = null;
    },

    /**
     * Activate a control
     * @param module
     */
    activateControl: function(module) {
      sandbox.addClass(controls[modulesMap[module]], 'active');
    },

    /**
     * Deactivate a control
     * @param module
     */
    deactivateControl: function(module) {
      sandbox.removeClass(controls[modulesMap[module]], 'active');
    }
  };
});