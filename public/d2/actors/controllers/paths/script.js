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

  Script.prototype.update = function(deltaTime, subject) {
    subject = subject || this.subject;
    while (deltaTime > 0 && this.currentStepIndex < this.steps.length) {
      var step = this.steps[this.currentStepIndex];

      deltaTime = step.update(subject, deltaTime);

      if (deltaTime > 0) {
        this.currentStepIndex++;
      }
    }
    return deltaTime;
  };

  return Script;
});
