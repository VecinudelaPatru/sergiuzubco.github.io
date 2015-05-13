describe('Router Observer', function() {

  var obs = Router.observer(),
    counter = 0;

  beforeEach(function() {
    counter = 0;
  });

  afterEach(function() {
    obs.off('*');
  });

  it('registers a single listener', function() {
    obs.on('a', function(arg) {
      expect(arg).toBe(true);
    });

    obs.trigger('a', true);
  });

  it('removes listeners', function() {
    function fn() {
      expect(++counter).toBe(1);
    }

    obs
      .on('r', fn)
      .on('s', fn)
      .off('s', fn)
      .trigger('r')
      .trigger('s');
  });

  it('removes multiple listeners', function() {
    function fn() {
      counter++;
    }

    obs
      .on('a b', fn)
      .on('c', fn)
      .off('a b', fn)
      .off('c', fn)
      .trigger('a')
      .trigger('b')
      .trigger('c');

    expect(counter).toBe(0);
  });

  it('listens all the events', function() {
    function fn() {
      if (!counter) {
        expect(arguments[0]).toBe('a');
        expect(arguments[1]).toBe('b');
        expect(arguments[2]).toBe('c');
      } else {
        expect(['d', 'e']).toContain(arguments[0]);
      }
      counter++;
    }

    obs
      .on('all', fn)
      .trigger('a', 'b', 'c')
      .trigger('d')
      .trigger('e');

    expect(counter).toBe(3);
  });

});

describe('Router', function() {

  var counter = 0;

  afterAll(function() {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  });

  afterEach(function() {
    counter = 0;
    Router.route.stop();
  });

  it('detects the hash parameters', function() {
    Router.route(function(first, second) {
      counter++;
      expect(first).toBe('test');
      expect(second).toBe('url');
    });

    Router.route('test/url');

    expect(counter).toBe(1);
  });

});