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
define([
    'd2/actors/observable',
    'd2/scripts/action',
    'd2/scripts/ifElse',
    'd2/scripts/wait'
  ], function(Observable, Action, IfElse, Wait) {

    var Repeat = null;

    require(['d2/scripts/repeat'], function(RepeatModule) {
      Repeat = RepeatModule;
    });

    /**
     * Create a new Script
     * @param {Object} subject The thing this is a script for
     */
    var Script = function(subject) {
      Observable.call(this);
      this.steps = [];
      this.currentStepIndex = 0;
      this.subject = subject;
    };

    Script.prototype = Object.create(Observable.prototype);

    /**
     * Add a step to the script.
     * The step should implement update(deltaTime, subject).
     * @param {?} step Step to add
     * @return Returns reference to this for chaining
     */
    Script.prototype.addStep = function(step) {
      if (step.addObserver) {
        step.addObserver(this);
      }
      this.steps.push(step);
      return this;
    };

    Script.prototype.notify = function(event) {
      return this.notifyObservers(event);
    };

    Script.prototype.action = function(callback) {
      return this.addStep(new Action(callback));
    };

    Script.prototype.ifElse = function(condition, consequent, alternative) {
      return this.addStep(new IfElse(condition, consequent, alternative));
    };

    Script.prototype.repeat = function(repetitions, action) {

      if (typeof repetitions === 'function') {
        action = repetitions;
        repetitions = -1;
      }

      var repeatObject = new Repeat(repetitions);
      action(repeatObject);
      return this.addStep(repeatObject);
    };

    Script.prototype.wait = function(time) {
      return this.addStep(new Wait(time));
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
      if (typeof deltaTime != 'number') {
        throw new Error('non-number passed as deltaTime');
      }
      while (deltaTime > 0 && this.currentStepIndex < this.steps.length) {
        var step = this.steps[this.currentStepIndex];

        deltaTime = step.update(deltaTime, subject);

        if (deltaTime > 0) {
          this.currentStepIndex++;
        }
      }
      return deltaTime;
    };

    Script.prototype.isOver = function() {
      return this.currentStepIndex === this.steps.length;
    };

    Script.prototype.getCurrentStep = function() {
      return this.steps[this.currentStepIndex];
    };

    return Script;
});
