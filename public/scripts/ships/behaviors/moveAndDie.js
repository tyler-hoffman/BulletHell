define([
    'd2/scripts/script',
    'd2/actors/controllers/paths/linearMove'
  ], function(Script, LinearMove) {

    var MoveToAndDie = function(ship, velocity, positions, waitTime) {
      Script.call(this, ship);

      if (positions.constructor !== Array) {
        positions = [positions];
      }

      var that = this;
      positions.forEach(function(position) {
        that.addStep(new LinearMove(position, velocity));
        if (waitTime) {
          that.wait(waitTime);
        }
      });
      this.action(function() {
        ship.die();
      });
    };

    MoveToAndDie.prototype = Object.create(Script.prototype);

    return MoveToAndDie;
});
