define([
    'd2/scripts/script',
    'd2/actors/controllers/paths/linearMove',
    'd2/scripts/repeat'
  ], function(Script, LinearMove, Repeat) {

    var MoveLoop = function(ship, velocity, positions, waitTime) {
      Script.call(this, ship);

      if (positions.constructor !== Array) {
        positions = [positions];
      }

      if (positions.length == 1) {
        this.moveTo(ship, velocity, positions[0], waitTime);
      } else {
        this.loop(ship, velocity, positions, waitTime);
      }

    };

    MoveLoop.prototype = Object.create(Script.prototype);

    MoveLoop.prototype.moveTo = function(ship, velocity, position, waitTime) {
      return this.addStep(new LinearMove(position, velocity))
        .wait(waitTime);
    };

    MoveLoop.prototype.loop = function(ship, velocity, positions, waitTime) {
      var moveTo = this.moveTo,
          repeat = new Repeat();

      positions.forEach(function(position) {
        moveTo.call(repeat, ship, velocity, position, waitTime);
      });

      return this.addStep(repeat);
    };

    return MoveLoop;
});
