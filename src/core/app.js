(function($, core, router) {
  var backdrop = core.dom.query('#backdrop', 'body')[0],
    currentRoute = null;

  core.dom.removeClass(backdrop, 'hidden');

  // Start all modules
  core.startAll();

  // Start router
  router.route.start();

  var showModules = function(route) {
    core.hideModule('chat');
    core.hideModule('chat-form');
    core.hideModule('gallery');
    core.hideModule('settings');

    if (route == 'chat' || route == '') {
      core.showModule('chat-form');
      route = 'chat';
    }

    core.showModule(route);
    currentRoute = route;
  };

  // Study the current route
  router.route.study(function(route) {
    showModules(route);
  });

  // Listen to hash changes
  router.route(function(target, action, params) {
    if (currentRoute == target) {
      return;
    }

    showModules(target);
  });

  core.dom.addClass(backdrop, 'hidden');

})(jQuery, Core, Router);