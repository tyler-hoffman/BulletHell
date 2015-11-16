"use strict"

define(['d2/utils/vector'], function(Vector) {

  var IfElse = function(condition, consequent, alternative) {
    this.condition = condition;
    this.consequent = consequent;
    this.alternative = alternative;

    this.reset();
  };

  IfElse.prototype.update = function(deltaTime, subject) {

    if (!this.evaluatedCondition) {
      this.evaluateCondition(subject);
    }

    var action = (this.evaluation)? this.consequent: this.alternative;

    if (typeof action === 'function') {
      deltaTime = action(deltaTime, subject);
    } else {
      deltaTime = action.update(deltaTime, subject);
    }

    // if leftover deltaTime, then the callback finished, so reset this
    if (deltaTime > 0) {
      this.reset();
    }

    return deltaTime;
  };

  IfElse.prototype.evaluateCondition = function(subject) {
    this.evaluation = this.condition(subject);
    this.evaluatedCondition = true;
  };

  IfElse.prototype.reset = function() {
    this.evaluatedCondition = false;
  };

  return IfElse;
});
