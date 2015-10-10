"use strict";

define(['d2/utils/vector'], function(Vector) {

  var CircleEmitter = function(
      factory,
      position,
      bulletCount,
      emitRate,
      rotationsPerSecond) {

    this.factory = factory;
    this.position = position;
    this.bulletCount = bulletCount || 1;
    this.emitRate = emitRate || 0;
    this.rotationsPerSecond = rotationsPerSecond || 0;

    this.theta = 0;
    this.time = 0;
  };

  CircleEmitter.prototype.update = function(deltaTime) {
    this.time += deltaTime;

    while (this.time >= this.emitRate) {
      this.time -= this.emitRate;

      this.emit(this.time);
      this.theta += this.rotationsPerSecond;
    }
  };

  CircleEmitter.prototype.emit = function(fromTime) {
    var deltaAngle = Math.PI * 2 / this.bulletCount;
    for (var angle = 0; angle < Math.PI * 2; angle += deltaAngle) {
      var offsetAngle = angle + this.theta;
      this.factory(
        this.position,
        new Vector(Math.cos(offsetAngle), Math.sin(offsetAngle)),
        fromTime || 0
      );
    }
  };

  return CircleEmitter;
});
