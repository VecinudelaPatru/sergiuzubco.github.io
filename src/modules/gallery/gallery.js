/**
 * Gallery module
 */
Core.register('gallery', function(sandbox) {
  var gallery, slider, url, width, height, next, prev, slides, current;

  /**
   * Utils
   * @type {{createSlide: Function, getSlidesLength: Function, emptySlider: Function}}
   * @private
   */
  var _private = {
    createSlide: function() {
      return sandbox.createElement('img', {
        'src': url + new Date().getTime()
      });
    },

    getSlidesLength: function() {
      return slides.length;
    },

    emptySlider: function() {
      sandbox.setText(slider, '');
    }
  };

  return {
    /**
     * Constructor
     */
    construct: function() {
      gallery = sandbox.query('#gallery')[0];
      slider = sandbox.find('.gallery')[0];
      width = '100%';
      height = '480px';
      next = sandbox.find('.fa-chevron-right')[0];
      prev = sandbox.find('.fa-chevron-left')[0];
      url = 'http://lorempixel.com/1024/768/?';
      slides = [];
      current = 0;

      sandbox.addEvent(next, 'click', this.nextFn);
      sandbox.addEvent(prev, 'click', this.prevFn);

      sandbox.subscribe('new-width', this.changeWidth);
      sandbox.subscribe('new-height', this.changeHeight);

      this.addNewSlide();
    },

    /**
     * Destructor
     */
    destruct: function() {
      gallery = slider = width = height = next = prev = url = current = null;
      slides = [];

      sandbox.removeEvent(next, 'click', this.nextFn);
      sandbox.removeEvent(prev, 'click', this.prevFn);
    },

    /**
     * Show module
     */
    show: function() {
      sandbox.addClass(gallery, 'active');
      sandbox.publish('module-shown', 'gallery');
    },

    /**
     * Hide module
     */
    hide: function() {
      sandbox.removeClass(gallery, 'active');
      sandbox.publish('module-hidden', 'gallery');
    },

    /**
     * Change gallery width
     * @param w
     */
    changeWidth: function(w) {
      width = w + '%';
      sandbox.attrs(slider, { 'style': 'width: ' + width + '; height: ' + height });
    },

    /**
     * Change gallery height
     * @param h
     */
    changeHeight: function(h) {
      height = h + 'px';
      sandbox.attrs(slider, { 'style': 'width: ' + width + '; height: ' + height });
    },

    /**
     * Insert new slide
     */
    addNewSlide: function() {
      var s = _private.createSlide();

      slider.appendChild(s);
      slides.push(s);
    },

    /**
     * Show next slide
     */
    nextFn: function() {
      var s;

      _private.emptySlider();

      //todo @sergiuzubco optimize here
      if (current == _private.getSlidesLength() - 1) {
        s = _private.createSlide();

        slider.appendChild(s);
        slides.push(s);

        current = _private.getSlidesLength() - 1;
      } else {
        current += 1;
        slider.appendChild(slides[current]);
      }
    },

    /**
     * Show previous slide
     */
    prevFn: function() {
      if (current == 0) {
        return;
      }

      _private.emptySlider();
      current -= 1;
      slider.appendChild(slides[current]);
    }
  };
});