"use strict"

define(function() {

  var Script = function(subject) {
    this.steps = [];
    this.currentStepIndex = 0;
    this.subject = subject;
  };

  Script.prototype.addStep = function(step) {
    this.steps.push(step);
    return this;
  };

  Script.prototype.update = function(deltaTime) {
    while (deltaTime > 0 && this.currentStepIndex < this.steps.length) {
      var step = this.steps[this.currentStepIndex];

      if (typeof step === 'function') {

        // step is a callback function
        deltaTime = step(this.subject, deltaTime);

      } else {
        // step is an object. It'd better have an update function
        deltaTime = step.update(this.subject, deltaTime);
      }


      if (deltaTime > 0) {
        this.currentStepIndex++;
      }
    }
    return deltaTime;
  };

  return Script;
});
