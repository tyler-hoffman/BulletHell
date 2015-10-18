"use strict"

define([
    'emitters/EmitterDecorator'
  ], function(EmitterDecorator) {

    var Cycler = function(radiansPerSecond, spread, startAngle) {
      EmitterDecorator.call(this);

      this.radiansPerSecond = radiansPerSecond;
      this.spread = spread;
      this.angle = startAngle || 0;
    };

    Cycler.prototype = new EmitterDecorator();

    Cycler.prototype.update = function(deltaTime) {
      this.angle += deltaTime * this.radiansPerSecond;
      while (this.angle > this.spread / 2) {
        this.angle -= this.spread;
      }
    };

    Cycler.prototype.decorateEmission = function(emission) {
      emission.angle += this.angle;
    };

    return Cycler;
});
