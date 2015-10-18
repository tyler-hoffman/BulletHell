"use strict"

define([
    'emitters/EmitterDecorator'
  ], function(EmitterDecorator) {

    var Swinger = function(radiansPerSecond, spread, startAngle) {
      EmitterDecorator.call(this);

      this.radiansPerSecond = radiansPerSecond;
      this.spread = spread;
      this.angle = startAngle || 0;
      this.direction = 1;
    };

    Swinger.prototype = new EmitterDecorator();

    Swinger.prototype.update = function(deltaTime) {
      this.angle += deltaTime * this.direction * this.radiansPerSecond;

      var overshoot = this.angle * this.direction - this.spread / 2
      if (overshoot >= 0) {
        this.angle -= overshoot;
        this.direction *= -1;
      }
    };

    Swinger.prototype.decorateEmission = function(emission) {
      emission.angle += this.angle;
    };

    return Swinger;
});
