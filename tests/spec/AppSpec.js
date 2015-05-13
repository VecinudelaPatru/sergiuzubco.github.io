describe('Application Core', function() {

  beforeEach(function() {});

  it('should be able to register a module', function() {
    spyOn(Core, 'register');
    Core.register('module', function(sandbox) {});
    expect(Core.register).toHaveBeenCalled();
  });

  it('should be able to start a module', function() {
    spyOn(Core, 'start');
    Core.register('module', function(sandbox) {});
    Core.start('module');
    expect(Core.start).toHaveBeenCalled();
  });

  it('should be able to stop a module', function() {
    spyOn(Core, 'stop');
    Core.register('module', function(sandbox) {});
    Core.stop('module');
    expect(Core.stop).toHaveBeenCalled();
  });

  it('should be able to start all modules', function() {
    spyOn(Core, 'startAll');
    Core.register('module1', function(sandbox) {});
    Core.register('module2', function(sandbox) {});
    Core.startAll();
    expect(Core.startAll).toHaveBeenCalled();
  });

  it('should be able to stop all modules', function() {
    spyOn(Core, 'stopAll');
    Core.register('module1', function(sandbox) {});
    Core.register('module2', function(sandbox) {});
    Core.stopAll();
    expect(Core.stopAll).toHaveBeenCalled();
  });

});