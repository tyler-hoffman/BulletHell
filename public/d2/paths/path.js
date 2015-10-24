"use strict"

define(function() {

  var Path = new function(actor) {
    this.actor = actor;
    this.steps = [];
    this.currentStepIndex = 0;
  };

  Path.prototype.addStep = function(pathStep) {
    this.steps.push(pathStep);
  };

  Path.prototype.update = function(deltaTime) {
    while (deltaTime > 0 && this.currentStepIndex < this.steps.length {
      deltaTime = this.steps[this.currentStepIndex].update(this.actor, deltaTime);
      if (delaTime > 0) {
        this.currentStepIndex++;
      }
    }
  };

  return Path;
});
