define([
  'd2/rendering/TextureRegion',
  'd2/actors/observable'
], function(TextureRegion, Observable) {

    var Animation = function(textureRegions, size, center, timePerFrame, repeat) {
      Observable.call(this);

      this.width = size.x;
      this.height = size.y;

      this.textureRegions = textureRegions;
      this.center = center;
      this.timePerFrame = timePerFrame;
      this.repeat = repeat || false;

      this.reset();
    };

    Animation.prototype = Object.create(Observable.prototype);

    Animation.prototype.reset = function() {
      this.time = 0;
      this.currentFrame = this.textureRegions[0];
    };

    Animation.prototype.getTextureRegion = function() {
      return this.currentFrame;
    };

    Animation.prototype.update = function(deltaTime) {
      this.time += deltaTime;

      var frame = Math.floor(this.time / this.timePerFrame);
      if (this.repeat) {
        frame = frame % this.textureRegions.length;
      } else {
        if (frame >= this.textureRegions.length) {
          frame = this.textureRegions.length - 1;
          this.notifyObservers();
        }
      }
      this.currentFrame = this.textureRegions[frame];
    };

    return Animation;
});
