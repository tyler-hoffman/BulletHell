define([
    'd2/scripts/script',
    'd2/actors/controllers/paths/linearMove',
    'd2/scripts/repeat'
  ], function(Script, LinearMove, Repeat) {

    var SpinAndMove = function(spinner, velocity, positions, waitTime) {
      Script.call(this, spinner);

      this.velocity = velocity;
      this.positions = positions;
      this.waitTime = waitTime;
      
      if (positions.constructor !== Array) {
        return this.moveToAndSpin(spinner, velocity, positions);
      }
      else if (positions.length === 1) {
        return this.moveToAndSpin(spinner, velocity, positions[0]);
      } else {
        return this.repeatedlyMoveAndSpin(velocity, positions, waitTime);
      }

    };

    SpinAndMove.prototype = Object.create(Script.prototype);

    SpinAndMove.prototype.moveToAndSpin = function(
        spinner, velocity, position, time) {

      this.action(function() {
          spinner.passiveMode();
        })
        .addStep(new LinearMove(position, velocity))
        .action(function() {
          spinner.chaosMode();
        })
        .wait(time);

      return this;
    };

    SpinAndMove.prototype.repeatedlyMoveAndSpin = function() {

      var spinner = this.subject,
          velocity = this.velocity,
          positions = this.positions,
          waitTime = this.waitTime,
          repeat = new Repeat();

      var addPosition = this.moveToAndSpin;
      positions.forEach(function(position) {
        addPosition.call(repeat, spinner, velocity, position, waitTime);
      });

      this.addStep(repeat);
      return this;
    };

    return SpinAndMove;
});
