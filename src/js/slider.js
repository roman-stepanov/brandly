(function() {
  'use strict';

  var defaultOptions = {
    slider: '',
    slidesContainer: '',
    slide: '',
    activeSlide: '',
    pagination: '',
    paginationItem: '',
    activePaginationItem: ''
  };

  var Slider = function(options) {
    this._options = {};
    this._indexActiveSlide = 0;

    this.setOptions(options);
    this.init();
  };

  Slider.prototype.setOptions = function(options) {
    for (var option in defaultOptions) {
      this._options[option] = (options && options[option] !== undefined) ? options[option] : defaultOptions[option];
    }
  };

  Slider.prototype.get = function() {
    return document.querySelector(this._options.slider);
  };

  Slider.prototype.getSlidesContainer = function() {
    return this.get().querySelector(this._options.slidesContainer);
  };

  Slider.prototype.getSlides = function() {
    return this.getSlidesContainer().querySelectorAll(this._options.slide);
  };

  Slider.prototype.getActiveSlide = function() {
    return this.getSlidesContainer().querySelector(this._options.activeSlide)
  };

  Slider.prototype.getCountSlides = function() {
    return this.getSlides() ? this.getSlides().length : 0;
  };

  Slider.prototype.getPagination = function() {
    return this.get().querySelector(this._options.pagination);
  };

  Slider.prototype.getPaginationItems = function() {
    return this.getPagination().querySelectorAll(this._options.paginationItem);
  };

  Slider.prototype.activateSlide = function(index) {
    var slides = this.getSlides();
    var paginationItems = this.getPaginationItems();

    if ((index >= 0) && (index < this.getCountSlides()) && (index !== this._indexActiveSlide)) {
      slides[this._indexActiveSlide].classList.remove(this._options.activeSlide.replace(/\./g, ''));
      paginationItems[this._indexActiveSlide].classList.remove(this._options.activePaginationItem.replace(/\./g, ''));
      this._indexActiveSlide = index;
      slides[this._indexActiveSlide].classList.add(this._options.activeSlide.replace(/\./g, ''));
      paginationItems[this._indexActiveSlide].classList.add(this._options.activePaginationItem.replace(/\./g, ''));
    }
  };

  Slider.prototype.init = function() {
    var slides = this.getSlides();
    var activeSlide = this.getActiveSlide();
    var pagination = this.getPagination();
    var paginationItems = this.getPaginationItems();
    var paginationItemClass = this._options.paginationItem.replace(/\./g, '');

    if (slides) {
      this._indexActiveSlide = [].indexOf.call(slides, activeSlide);
    }

    pagination.addEventListener('click', function(evt) {
      var target = evt.target;

      while (target !== pagination) {
        if (target.classList.contains(paginationItemClass)) {
          this.activateSlide([].indexOf.call(paginationItems, target));
          break;
        }
        target = target.parentNode;
      }
    }.bind(this));
  };

  var mainSlider = new Slider({
    slider: '.slider',
    slidesContainer: '.slider__slides',
    slide: '.slide',
    activeSlide: '.slide--active',
    pagination: '.slider__pagination',
    paginationItem: '.slider__dot',
    activePaginationItem: '.slider__dot--active'
  });

  var trendingSlider = new Slider({
    slider: '.trending',
    slidesContainer: '.trending__items',
    slide: '.trending-item',
    activeSlide: '.trending-item--active',
    pagination: '.trending__pagination',
    paginationItem: '.trending__dot',
    activePaginationItem: '.trending__dot--active'
  });
})();
