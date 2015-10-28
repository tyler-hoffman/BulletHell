"use strict"

/**
 * Scripts hold a sequence of steps to be executed on a given subject.
 * For instance:
 *    MoveTo 100, 100
 *    MoveTo 200, 100
 * Steps may be arbitrarily complex,
 *  but must implement update(deltaTime, subject).
 * The role of the script is primarily to determine which
 *  step control should be passed to.
 */
define(function() {

  /**
   * Create a new Script
   * @param {Object} subject The thing this is a script for
   */
  var Script = function(subject) {
    this.steps = [];
    this.currentStepIndex = 0;
    this.subject = subject;
  };

  /**
   * Add a step to the script.
   * The step should implement update(deltaTime, subject).
   * @param {?} step Step to add
   * @return Returns reference to this for chaining
   */
  Script.prototype.addStep = function(step) {
    this.steps.push(step);
    return this;
  };

  /**
   * Update the script. This will pass control to the current
   *  step(if there is one).
   * @param {Number} deltaTime The amount of time to update for
   * @param {?} subject The thing to be updated
   * @return Returns the amount of time that was not used by the script.
   *    This should be zero, unless all steps are completed.
   */
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
