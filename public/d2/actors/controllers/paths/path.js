"use strict"

define(['d2/utils/vector'], function(Vector) {

  var Path = function(startPosition, maxVelocity) {
    this.steps = [];
    this.currentStepIndex = 0;
    this.position = new Vector();
    this.velocity = new Vector();
    this.maxVelocity = maxVelocity;

    if (startPosition) {
      this.position.set(startPosition);
    }

  };

  Path.prototype.addStep = function(pathStep) {
    pathStep.setSettings(this.maxVelocity);
    this.steps.push(pathStep);
    console.log(this.steps);
    return this;
  };

  Path.prototype.updateModel = function(deltaTime) {
    while (deltaTime > 0 && this.currentStepIndex < this.steps.length) {
      deltaTime = this.steps[this.currentStepIndex].update(deltaTime,
          this.position, this.velocity);

      if (deltaTime > 0) {
        this.currentStepIndex++;
      }
    }

    //return this.position
    this.actor.setPosition(this.position);
  };

  Path.prototype.setActor = function(actor) {
    this.actor = actor;
  };

  return Path;
});
