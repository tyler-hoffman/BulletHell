"use strict"

define([
    'emitters/EmitterDecorator'
  ], function(EmitterDecorator) {

    var SoftSwinger = function(radiansPerSecond, spread) {
      EmitterDecorator.call(this);

      this.radiansPerSecond = radiansPerSecond;
      this.spread = spread;
      this.angle = 0;
      this.time = 0;
    };

    SoftSwinger.prototype = new EmitterDecorator();

    SoftSwinger.prototype.update = function(deltaTime) {
      this.time += deltaTime * this.radiansPerSecond / this.spread;
      this.angle = Math.sin(this.time);
    };

    SoftSwinger.prototype.decorateEmission = function(emission) {
      emission.angle += this.angle * this.spread / 2;
    };

    return SoftSwinger;
});
