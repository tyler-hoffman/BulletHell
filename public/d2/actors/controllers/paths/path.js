"use strict"

define(['d2/utils/vector'], function(Vector) {

  var Path = function(startPosition, maxVelocity) {
    this.steps = [];
    this.currentStepIndex = 0;
    this.velocity = new Vector();
    this.maxVelocity = maxVelocity;

  };

  Path.prototype.addStep = function(pathStep) {
    pathStep.setSettings(this.actor, this.maxVelocity);
    this.steps.push(pathStep);
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
    return deltaTime;
  };

  Path.prototype.setActor = function(actor) {
    this.setSettings(actor, 800);
  };

  Path.prototype.setSettings = function(actor, maxVelocity) {
    this.actor = actor;
    this.maxVelocity = maxVelocity;
    if (actor) {
      this.position = actor.position;
    }
    for (var step in this.steps) {
      this.steps[step].setSettings(actor, maxVelocity);
    }
  };

  return Path;
});
