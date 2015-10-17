"use strict"

define(function() {

  var Rotator = function(rotationsPerSecond, angle) {
    this.radiansPerSecond = rotationsPerSecond * Math.PI * 2;
    this.angle = angle || 0;
  };

  Rotator.prototype.update = function(deltaTime) {
    this.angle += deltaTime * this.radiansPerSecond;
  };

  Rotator.prototype.decorate = function(emission) {
    emission.angle += this.angle;
  };

  return Rotator;
});
