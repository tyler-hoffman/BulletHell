"use strict"

define([
    'd2/actors/controllers/paths/script'

  ], function(Script) {

    var Repeat = function(repetitions) {
      Script.call(this);
      this.maxRepetitions = repetitions;
      this.reset();
    };

    Repeat.prototype = new Script();

    // Repeat.prototype.setSettings = function(actor, maxVelocity) {
    //   Script.prototype.setSettings.call(this, actor, maxVelocity);
    //
    //   for (var step in this.steps) {
    //     this.steps[step].setSettings(actor, maxVelocity);
    //   }
    // };

    Repeat.prototype.update = function(subject, deltaTime) {//, position, velocity) {
      while (deltaTime > 0 && this.repetitionsLeft > 0) {
        deltaTime = Script.prototype.update.call(this, deltaTime, subject);

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
