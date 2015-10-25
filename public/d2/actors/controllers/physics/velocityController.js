"use strict"

define(['d2/utils/vector'], function(Vector) {

  var temp = new Vector();

  var VelocityController = function(velocity, actor) {
    this.actor = actor || null;
    this.velocity = new Vector();

    if (velocity) {
      this.velocity.set(velocity);
    }

  };

  VelocityController.prototype.updateModel = function(deltaTime) {

    temp.set(this.velocity)
        .scale(deltaTime)
        .add(this.actor.position);

    this.actor.setPosition(temp);

    //this.actor.update(deltaTime, gameState);
  };

  VelocityController.prototype.setVelocity = function(x, y) {
    return this.velocity.set(x, y);
  };

  VelocityController.prototype.setSettings = function(actor) {
    this.actor = actor;
  };

  return VelocityController;
});
