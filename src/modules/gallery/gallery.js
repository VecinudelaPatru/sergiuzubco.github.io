/**
 * Gallery module
 */
Core.register('gallery', function(sandbox) {
  var gallery, slider, url, width, height, next, prev, slides;

  var _private = {
    createSlide: function() {
      return sandbox.createElement('img', {
        'src': url
      });
    }
  };

  return {

    construct: function() {
      gallery = sandbox.query('#gallery')[0];
      slider = sandbox.find('.gallery')[0];
      width = '100%';
      height = '480px';
      next = sandbox.find('.fa-chevron-right')[0];
      prev = sandbox.find('.fa-chevron-left')[0];
      url = 'http://lorempixel.com/1024/768/city/';
      slides = [];

      sandbox.addEvent(next, 'click', this.next);
      sandbox.addEvent(prev, 'click', this.prev);

      sandbox.subscribe('new-width', this.changeWidth);
      sandbox.subscribe('new-height', this.changeHeight);

      //this.addNewSlide();
    },

    destruct: function() {
      gallery = slider = width = height = next = prev = url = null;
      slides = [];

      sandbox.removeEvent(next, 'click', this.next);
      sandbox.removeEvent(prev, 'click', this.prev);
    },

    show: function() {
      sandbox.addClass(gallery, 'active');
      sandbox.publish('module-shown', 'gallery');
    },

    hide: function() {
      sandbox.removeClass(gallery, 'active');
      sandbox.publish('module-hidden', 'gallery');
    },

    changeWidth: function(w) {
      width = w + '%';
      sandbox.attrs(slider, { 'style': 'width: ' + width + '; height: ' + height });
    },

    changeHeight: function(h) {
      height = h + 'px';
      sandbox.attrs(slider, { 'style': 'width: ' + width + '; height: ' + height });
    },

    addNewSlide: function() {
      slider.appendChild(_private.createSlide());
    },

    next: function() {
      slider.appendChild(_private.createSlide());
    },

    prev: function() {}
  };
});