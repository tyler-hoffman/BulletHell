"use strict"

define([
    'd2/scenes/scene',
    'd2/rendering/defaultRenderer',
    'shaders/defaultShader'
  ], function(Scene, DefaultRenderer, DefaultShader) {

    var Slide = function(image, position, scale, duration) {
      this.image = image;
      this.position = position;
      this.scale = scale;
      this.duration = duration;
    };

    var SlideShowScene = function(canvas, animator) {
      Scene.call(this, canvas, animator);
      if (canvas) {
        var shaderProgram = new DefaultShader(this.gl).getProgram();

        this.renderer = new DefaultRenderer(this.gl, shaderProgram);
        this.renderer.setResolution(this.width, this.height);

        this.renderer
        this.slides = [];
        this.currentSlideTime = 0;
        this.currentSlideIndex = -1;
      }
    };

    SlideShowScene.prototype = new Scene();

    SlideShowScene.prototype.onFrame = function(deltaTime) {
      if (this.currentSlideIndex === -1) {
          this.nextSlide();
      }

      this.currentSlideTime += deltaTime;
      var currentSlide = this.currentSlide();
      currentSlide && currentSlide.onFrame && currentSlide.onFrame(deltaTime);

      while (currentSlide && this.currentSlideTime > currentSlide.duration) {
        this.currentSlideTime -= currentSlide.duration;
        this.nextSlide(this.currentSlideTime);
        currentSlide = this.currentSlide();
      }

      if (!currentSlide) {
        this.triggerNextScene()
      }
    };

    SlideShowScene.prototype.addSlide = function(
        image,
        position,
        scale,
        duration) {

      this.slides.push(new Slide(image, position, scale, duration));
    };

    SlideShowScene.prototype.nextSlide = function(currentSlideTime) {
      this.currentSlideTime = currentSlideTime || 0;
      this.currentSlideIndex++;

      var currentSlide = this.currentSlide();
      if (currentSlide) {
        this.renderImage(
          currentSlide.image,
          currentSlide.position,
          currentSlide.scale
        );
      }
  };

  SlideShowScene.prototype.renderImage = function(
      textureRegion,
      position,
      scale) {

    this.renderer.erase();
    this.renderer.clear(1);
    this.renderer.defaultImageRenderer.render(textureRegion, position, scale);
    this.renderer.draw(1);

  };

  SlideShowScene.prototype.currentSlide = function() {
    return this.slides[this.currentSlideIndex];
  };

  return SlideShowScene;
});
