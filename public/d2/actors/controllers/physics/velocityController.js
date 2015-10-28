"use strict"

define([
    'd2/utils/vector'
  ], function(Vector) {

  var temp = new Vector();

  var VelocityController = function(position, velocity) {
    this.position = position;
    this.velocity = new Vector();

    if (velocity) {
      this.velocity.set(velocity);
    }

  };

  VelocityController.prototype.update = function(deltaTime) {

    temp.set(this.velocity)
        .scale(deltaTime)
        .add(this.position);

    this.position.set(temp);
  };

  VelocityController.prototype.setVelocity = function(x, y) {
    return this.velocity.set(x, y);
  };

  return VelocityController;
});
