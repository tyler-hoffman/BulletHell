"use strict"

define([
    'd2/actors/controllers/paths/path'

  ], function(Path) {

    var Repeat = function(repetitions) {
      Path.call(this);
      this.maxRepetitions = repetitions;
      this.reset();
    };

    Repeat.prototype = new Path();

    Repeat.prototype.setSettings = function(actor, maxVelocity) {
      Path.prototype.setSettings.call(this, actor, maxVelocity);

      for (var step in this.steps) {
        this.steps[step].setSettings(actor, maxVelocity);
      }
    };

    Repeat.prototype.update = function(deltaTime, position, velocity) {
      while (deltaTime > 0 && this.repetitionsLeft > 0) {
        deltaTime = this.updateModel(deltaTime);

        if (deltaTime > 0) {
          this.currentStepIndex = 0;
          this.repetitionsLeft--;
        }
      }

      if (deltaTime > 0) {
        this.reset();
      }

      return deltaTime;
    };

    Repeat.prototype.reset = function() {
      this.repetitionsLeft = this.maxRepetitions;
    };

    return Repeat;
});
