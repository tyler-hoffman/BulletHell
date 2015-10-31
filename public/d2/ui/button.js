"use strict"

define([
    'd2/actors/actor',
    'd2/utils/vector'
  ], function(Actor, Vector) {

  var Button = function(defaultImage, hoverImage, downImage, action) {
    this.center = new Vector();
    Actor.call(this, this);

    this.defaultImage = defaultImage;
    this.hoverImage = hoverImage;
    this.downImage = downImage;
    this.action = action;

    this.setState(this.DEFAULT);
  };

  Button.prototype = new Actor();

  Button.prototype.DEFAULT = 'DEFAULT';
  Button.prototype.HOVER = 'HOVER';
  Button.prototype.DOWN = 'DOWN';

  Button.prototype.setState = function(state) {
    if (this.state != state) {
      this.state = state;

      switch(state) {
        case this.DEFAULT:
          this.setTextureRegion(this.defaultImage);
          break;
        case this.HOVER:
          this.setTextureRegion(this.hoverImage);
          break;
        case this.DOWN:
          this.setTextureRegion(this.downImage);
          break;
      }
    }
  };

  Button.prototype.setTextureRegion = function(textureRegion) {
    this.textureRegion = textureRegion;
    this.width = textureRegion.width;
    this.height = textureRegion.height;
    this.updateBounds();
  };

  Button.prototype.getTextureRegion = function() {
    return this.textureRegion;
  };

  Button.prototype.doAction = function() {
    this.action();
  };

  return Button;
});
