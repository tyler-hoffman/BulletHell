"use strict"

define([
    'emitters/EmitterDecorator'
  ], function(EmitterDecorator) {

    var Rotator = function(rotationsPerSecond, angle) {
      EmitterDecorator.call(this);

      this.radiansPerSecond = rotationsPerSecond * Math.PI * 2;
      this.angle = angle || 0;
    };

    Rotator.prototype = new EmitterDecorator();

    Rotator.prototype.update = function(deltaTime) {
      this.angle += deltaTime * this.radiansPerSecond;
    };

    Rotator.prototype.decorateEmission = function(emission) {
      emission.angle += this.angle;
    };

    return Rotator;
});
