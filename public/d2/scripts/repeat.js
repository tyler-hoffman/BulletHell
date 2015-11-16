"use strict"

/**
 * A Script Step to execute a subscript a given number of times
 */
define([
    'd2/scripts/script'

  ], function(Script) {

    /**
     * Create a new Repeat Step.
     * @param {Number} repetitions The number of repetitions of the subscript
     */
    var Repeat = function(repetitions) {
      if (repetitions === 'undefined') {
        repetitions = -1;
      }
      Script.call(this);
      this.maxRepetitions = repetitions;
      this.reset();
    };

    Repeat.prototype = new Script();

    /**
     * Update the current subscript step.
     *
     * @param {Number} deltaTime The amount of time to update for
     * @param {?} subject The thing to be updated
     * @return {Number} Returns the amount of time that was not used by the script.
     *    This should be zero, unless all steps are completed.
     */
    Repeat.prototype.update = function(deltaTime, subject) {

      // as long as there's time and repetitions left, do the substeps
      while (deltaTime > 0 && this.repetitionsLeft != 0) {
        deltaTime = Script.prototype.update.call(this, deltaTime, subject);

        // if time left over from substep, move to next step
        if (deltaTime > 0) {
          this.currentStepIndex = 0;
          this.repetitionsLeft--;
        }
      }

      // if time left over, this is done; reset it
      if (deltaTime > 0) {
        this.reset();
      }

      return deltaTime;
    };

    /**
     * Reset the current data
     * This must be done in case the Repeat is reused
     * i.e. nested loops
     */
    Repeat.prototype.reset = function() {
      this.repetitionsLeft = this.maxRepetitions;
    };

    return Repeat;
});
